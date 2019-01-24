//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hotMoviesT:[]
  },
  onLoad: function () {
    this.getHotT();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取影院热映电影
  getHotT:function(){
    var then = this;
    const api  = 'https://movie.douban.com';
    const path = 'j/search_subjects';
    const params = {
      type:'movie',
      tag:'热门',
      sort:'recommend',
      page_limit:'20',
      page_start:'0'
    };
    app.douban(api,path,params)
       .then(res => {
         let dataArr = res.data.subjects;
         for(let i = 0;i<dataArr.length;i++){
           dataArr[i].count = Math.round(dataArr[i].rate/2)
         }
         then.setData({hotMoviesT:dataArr})
       })
       .catch(err => {
         cosnole.log(err)
       })
  },
  //获取豆瓣热门电影
    getHotD:function(){
      var then = this;
      const api  = 'https://movie.douban.com';
      const path = 'j/search_subjects';
      const params = {
        type:'movie',
        tag:'豆瓣高分',
        page_limit:'20',
        page_start:'0'
      };
      app.douban(api,path,params)
         .then(res => {
           let dataArr = res.subjects;
           for(let i = 0;i<dataArr.length;i++){
             dataArr[i].count = Math.round(dataArr[i].rate/2)
           }
           then.setData({hotMoviesD:dataArr})
         })
         .catch(err => {
           cosnole.log(err)
         })
    },
})
