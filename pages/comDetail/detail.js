//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    itemData:{},
    isUnfold:false,//是否展开简介

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:options.title
    });
    this.getDoubanData(options.id);
  },
  //封装函数 获取豆瓣数据
  getDoubanData: function (id) {
    var itemApi = 'https://douban.uieee.com';
    var then = this;
    const path = 'v2/movie/subject/'+id;
    app.douban(itemApi, path, {})
      .then(res => {
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
        console.log(detailsArr)
        res.data.rating.allCount=allCount;
        res.data.rating.detailsArr=detailsArr;
        console.log(res.data.rating.detailsArr)
        then.setData({itemData:res.data})
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
