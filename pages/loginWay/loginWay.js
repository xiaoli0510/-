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
    hiddenMask:true,//是否显示模态框
  },
  onLoad: function () {
  },
  //微信登录
  wechatLogin:function(){
     this.setData({hiddenMask:false});
  },
  //账号登录
  accountLogin:function(){

  },
  //拒绝
  deny:function(){
    this.setData({hiddenMask:true});
  },
  //允许
  allow:function(){
    this.setData({hiddenMask:true});
  }
})
