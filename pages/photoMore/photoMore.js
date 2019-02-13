//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    photoArr:[]//剧照数据
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:options.title+'的剧照'
    });
    //获取剧照数据
    let then = this;
    wx.getStorage({
      key:'photoArr',
      success:function(res){
          then.setData({photoArr:res.data});
      }
    });
  },
})
