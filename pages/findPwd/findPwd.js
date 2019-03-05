//获取实例
const app = getApp();

Page({
  data: {
    isPhone: true,
    phone: '',//手机号码
    email: '',//邮箱
    finish: false,//是否完善表单信息
    pwd: '',//密码
    confirmPwd: '',//确认密码
    finishPwd: false,//是否完善密码信息
    showResetPwd:false,//是否显示重置密码

  },
  onLoad: function (options) {
    console.log(options.phone, options.email)
    if (options.email == '1') {
      this.setData({ isPhone: false });
    }
  },
  //输入phone
  phone: function (e) {
    this.setData({ phone: e.detail.value });
    this.watchPhoneOrEmail();
  },
  //输入email
  email: function (e) {
    this.setData({ email: e.detail.value });
    this.watchPhoneOrEmail();
  },
  //输入密码
  pwd: function (e) {
    this.setData({ pwd: e.detail.value });
    this.setData({ confirmPwd: '' });
    this.setData({ finishPwd: false });
  },
  //输入确认密码
  confirmPwd: function (e) {
    this.setData({ confirmPwd: e.detail.value });
    if (this.data.pwd.length>0&&e.detail.value.length>0) {
      this.setData({ finishPwd: true });
    }else{
      this.setData({ finishPwd: false });
    }
  },
  //提交下一步
  formSubmit: function () {
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    var emailReg = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/;
    if (this.data.isPhone && !phoneReg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入有效的手机号码',
        icon: 'none',
        duration: 2000
      })
    } else if (!this.data.isPhone && !emailReg.test(this.data.emial)) {
      wx.showToast({
        title: '请输入有效的邮箱',
        icon: 'none',
        duration: 2000
      })
    } else {
      //请求是否有此绑定的手机号码或者邮箱号
      //此处模拟返回的数据
      let res = { "code": 1 };
      if (res.code == '1') {
         this.setData({showResetPwd:true})
      }
    }
  },
  //确认密码
  findPwd: function () {
    if (this.data.pwd.length >= 6 && this.data.pwd.length <= 16) {
      if (this.data.pwd==this.data.confirmPwd) {
        wx.showToast({
          title: '成功设置密码',
          icon: 'none',
          duration: 2000,
          success:function(){
            setTimeout(function(){
              wx.navigateTo({
                url: '/pages/login/login'
              })
            },2000);
          }
        })
      } else {
        wx.showToast({
          title: '密码和确认密码不一致',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '请输入6-16位密码',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //监视phone或者email
  watchPhoneOrEmail: function () {
    if (this.data.isPhone) {
      if (this.data.phone.length > 0) {
        this.setData({ finish: true });
      }
    }
    if (!this.data.isPhone) {
      if (this.data.email.length > 0) {
        this.setData({ finish: true });
      }
    }
  }
})