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
    phone:'',//微信绑定手机号码
  },
  onLoad: function () {
  },
  //微信登录
  wechatLogin:function(){
     this.setData({hiddenMask:false});
  },
  getPhoneNumber:function(e){
    //获取微信绑定手机号 //需要客户端验证
    if(e.detail.encryptedData){
       this.setData({phone:e.detail.encryptedData.phoneNumber})
    }else{
      this.setData({phone:'12345678912'})
    }
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
