//app.js

const douban = require('./utils/douban.js')
const utils = require('./utils/util.js')

App({
  //初始化数据
  data:{
     cityName:'',
     api:'https://movie.douban.com'
  },
  douban:douban,
  utils:utils,
  onLaunch: function () {
    var then = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }),
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }),
    //获取用户地理位置
    wx.getLocation({
      type: 'wgs84',
      success(res){
        //根据经纬度来获取相应的城市
        const latitude = res.latitude;
        const longitude = res.longitude;
        const baiduPath = 'https://api.map.baidu.com/geocoder/v2/';
        const params = { location: `${latitude},${longitude}`, output: 'json', ak: 'mHNw4eGrLPGtfcKW5CmOhiTHe6I0ZcBx' }
       then.getCity(baiduPath,params);
      }
    })
  },
  globalData: {
    userInfo: null
  },
  getCity:function(path,params){
    var then = this;
    wx.request({
      url:path,
      data:params,
      header:{'Content-Type':'json'},
      success:function(res){
        then.cityName = res.data.result.addressComponent.city.replace('市','');
        console.log(then.cityName)
      },
      fail:function(err){
        console.log(err)
      }

    })

  }
})

