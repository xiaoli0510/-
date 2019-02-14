//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:'',//id
    itemData:{},
    isUnfold:false,//是否展开简介
    photoArr:[],//剧照数据
    isChina:0,//是否是中国产的
    hasData:false//是否有数据
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:options.title
    });
    this.getDoubanData(options.id);
    this.setData({id:options.id})
  },
  //封装函数 获取豆瓣数据
  getDoubanData: function (id) {
    var itemApi = 'https://douban.uieee.com';
    var then = this;
    const path = 'v2/movie/subject/'+id;
    app.douban(itemApi, path, {})
      .then(res => {
        if(res.data){
          then.setData({hasData:true});
          //判断是否是中国产的电影
          if(res.data.countries[0]=='中国大陆'){
            then.setData({isChina:1});
          }
          //获取评分的星星个数
          let starCount = Math.round(res.data.rating.average/2);
          res.data.rating.starCount=starCount;
          //获取评分一星二星三星四星五星的数量
          let detailsArr = [];
          let details = res.data.rating.details;
          let allCount = 0;
          //计算总的评分人数
          for(let key in details){
            allCount+=details[key];
          }
          //将percent添加到detailsArr
          for(let key in details){
            let percent = Math.round((details[key]/allCount)*100);
            detailsArr.push(percent);
          }
          detailsArr.reverse();
          res.data.rating.allCount=allCount;
          res.data.rating.detailsArr=detailsArr;
          then.setData({itemData:res.data});
          //将剧照的数据保存 在photoMore页面使用
          wx.setStorage({
            key:'photoArr',
            data:res.data.photos
          });
        }else{
          then.setData({hasData:false});
          wx.showToast({
            title: '网络异常',
            image: '../../imgs/error.png',
            duration: 2000
           })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  //展开简介
  unfoldSum:function(){
    let isUnfold = !this.data.isUnfold;
    this.setData({isUnfold:isUnfold});
  }
})
