//index.js
//获取应用实例
const app = getApp()
const localData = require('../../data/data.js')

Page({
  data: {
    hasData: false,//是否有数据
    yearData: [],//年度电影榜单
    praiseWeek: [],//一周口碑电影榜
    topData: [],//top250电影
    year:'',
  },
  onLoad: function () {
    this.getYearData('', 1, 0);
    this.getYearData('外语电影', 2, 1);
    this.getYearData('冷门佳片', 9, 2);
    this.getYearData('科幻片', 20, 3);
    this.getWeekData();
    this.getTopData();
  },
  //获取一周口碑电影榜
  getWeekData: function () {
    var then = this;
    const path = 'j/search_subjects';
    let params = {
      type: 'movie',
      tag: '热门',
      sort: 'recommend',
      page_limit: '10',
      page_start: '0'
    };
    app.douban(app.data.api, path, params)
      .then(res => {
        console.log(res.data)
        then.setData({ praiseWeek: res.data });
      })
      .catch(err => {
        console.log(err)
      })
  },
  //获取top250
  getTopData: function () {
    var then = this;
    const itemApi = "https://api.douban.com";
    const path = 'v2/movie/top250';
    app.douban(itemApi, path, {})
      .then(res => {
        if (res.statusCode != 200) {
          res = localData.top250;
        }
        then.setData({ topData: res.subjects });
      })
      .catch(err => {
        console.log(err)
      })
  },
  //封装函数 获取年度各类型电影排行榜 
  //value表示的是排行榜类型 1=》华语 2=》外语 9=》冷门佳片 20=》科幻片
  getYearData: function (title, value, index) {
    let year = (new Date()).getFullYear() - 1;
    this.setData({year,year});
    let itemApi = 'https://movie.douban.com';
    let then = this;
    console.log(year)
    const path = 'ithil_j/activity/movie_annual' + year + '/widget/' + value;
    app.douban(itemApi, path, {})
      .then(res => {
        console.log(res)
        if (res.data.r == 0) {
          let itemObj = {
            title: title,
            data: res.data.res,
            value:value
          }
          let yearData = then.data.yearData;
          //每次请求数据后 请数据添加到yearData中
          yearData[index] = itemObj;
          then.setData({ hasData: true });
          then.setData({ yearData: yearData });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
})
