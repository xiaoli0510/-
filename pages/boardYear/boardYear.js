//index.js
//获取应用实例
const app = getApp()
const localData = require('../../data/data.js')

Page({
  data: {
    year:'2018',
    hasData: false,//是否有数据
    yearData: [],//年度电影榜单
  },
  onLoad: function (options) {
    //播放音乐
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioCtx.play();
    //获取数据
    this.getYearData( 1);
    this.getYearData( 2);
    this.getYearData( 11);
    this.getYearData( 12);
    this.getYearData( 23);
  },
 //封装函数 获取年度各类型电影排行榜 
  //value表示的是排行榜类型 1=》华语  2=》外语电影 11=》韩国片 12=》日本片  23=》动画片
  getYearData: function ( value) {
    let year = (new Date()).getFullYear() - 1;
    this.setData({year,year});
    let itemApi = 'https://movie.douban.com';
    let then = this;
    console.log(year)
    const path = 'ithil_j/activity/movie_annual' + year + '/widget/' + value;
    app.douban(itemApi, path, {})
      .then(res => {
        console.log(res)
        let title = res.data.res.payload.title;
        title=title.slice(9);
        if (res.data.r == 0) {
          let itemObj = {
            title: title,
            data: res.data.res,
            value:value
          }
          let yearData = then.data.yearData;
          //每次请求数据后 请数据添加到yearData中
          yearData.push(itemObj);
          then.setData({ hasData: true });
          then.setData({ yearData: yearData });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
})
