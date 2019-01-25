//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: []
  },
  onLoad: function () {
    //获取影院热映
    this.getDoubanData({
      type: 'movie',
      tag: '热门',
      sort: 'recommend',
      page_limit: '20',
      page_start: '0'
    }, '影院热映', 0);
    //获取豆瓣热门
    this.getDoubanData({
      type: 'movie',
      tag: '豆瓣高分',
      page_limit: '20',
      page_start: '0'
    }, '豆瓣热门', 1);
    //获取近期热门剧集
    this.getDoubanData({
      type: 'tv',
      tag: '热门',
      sor: 'recommend',
      page_limit: '20',
      page_start: '0'
    }, '近期热门剧集', 2);
    //获取热门综艺节目
    this.getDoubanData({
      type: 'tv',
      tag: '综艺',
      page_limit: '20',
      page_start: '0'
    }, '近期热门综艺节目', 3);
  },
  //封装函数 获取豆瓣数据
  getDoubanData: function (params, title, index) {
    var then = this;
    const path = 'j/search_subjects';
    app.douban(app.data.api, path, params)
      .then(res => {
        let dataArr = res.data.subjects;
        for (let i = 0; i < dataArr.length; i++) {
          dataArr[i].count = Math.round(dataArr[i].rate / 2);
        }
        let itemObj = {
          title: title,
          dataArr: dataArr,
        }
        let list = then.data.list;
        list[index] = itemObj;
        then.setData({ list: list });
      })
      .catch(err => {
        console.log(err)
      })
  }
})
