//index.js
//获取应用实例
const app = getApp()
let localdata = require('../../data/data.js')

Page({
  data: {
    itemData: [],
    hasData: false//判断是否有数据
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '搜索'
    });
  },
  //搜索
  //封装函数 获取豆瓣数据
  search: function (e) {
    const itemApi = 'https://api.douban.com';
    let then = this;
    let value = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    let params = { q: value };
    const path = 'v2/movie/search';
    if (value) {
      app.douban(itemApi, path, params)
        .then(res => {
          then.setData({ hasData: true });
          if (res.statusCode == '200') {
            console.log(res);
            //如果接口不允许访问就请求本地模拟数据 搜索默认值是1
          } else {
            console.log(1)
            res = localdata.search;
          }
          if (res) {
            //获取评分的星星个数
            let dataArr = res.subjects;
            for (let i = 0; i < dataArr.length; i++) {
              let starCount = Math.round(dataArr[i].rating.average / 2);
              dataArr[i].count = starCount;
            }
            then.setData({ itemData: res.subjects });
          }
        })
        .catch(err => {
          console.log(err)
        })
    }else{
      then.setData({ hasData: false });
      then.setData({ itemData:[]});
    }
  },
})
