//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    title: ''
  },
  onLoad: function (options) {
    //获取url参数中的title
    wx.setNavigationBarTitle({
      title: options.title
    });
    const type = options.type;
    let params;
    if (type == '0') {
      params = {
        type: 'movie',
        tag: '热门',
        sort: 'recommend',
        page_limit: '50',
        page_start: '0'
      };
    } else if (type == '1') {
      params = {
        type: 'movie',
        tag: '豆瓣高分',
        page_limit: '50',
        page_start: '0'
      };
    } else if (type == '2') {
      params = {
        type: 'tv',
        tag: '热门',
        sor: 'recommend',
        page_limit: '50',
        page_start: '0'
      };
    } else if (type == '3') {
      params = {
        type: 'tv',
        tag: '综艺',
        page_limit: '50',
        page_start: '0'
      };
    } else if (type == '4') {
      params = {
        type: 'tv',
        tag: '综艺',
        page_limit: '50',
        page_start: '0'
      };
    }
    this.getData(params);
  },
  //封装函数 获取豆瓣数据
  getData: function (params) {
    var then = this;
    const path = 'j/search_subjects';
    app.douban(app.data.api, path, params)
      .then(res => {
        let dataArr = res.data.subjects;
        for (let i = 0; i < dataArr.length; i++) {
          dataArr[i].count = Math.round(dataArr[i].rate / 2)
        }
        then.setData({ list: dataArr });
      })
      .catch(err => {
        console.log(err)
      })

  }
})
