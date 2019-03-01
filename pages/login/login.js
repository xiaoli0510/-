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
  },
  //微信登录
  wechatLogin:function(){
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  //账号登录
  accountLogin:function(){

  }
})
