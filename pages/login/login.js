//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    allData:[{
      name:'观影',
      img:'/imgs/video.png'
    },{
      name:'读书',
      img:'/imgs/book.png'
    },{
      name:'音乐',
      img:'/imgs/music.png'
    }],
  },
  onLoad: function () {
  }
})
