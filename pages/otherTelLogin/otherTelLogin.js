//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    finish: false,//是否完善信息
    focusIndex: -1,//聚焦的inputs索引
    phone: '',//手机号码
    code: '',//验证码
    getCodeTex: '获取验证码',
    send: false,//是否在发送验证码
    showPhoneClose: false,//是否显示清空phone的按钮
    showCodeClose: false,//是否显示清空code的按钮
  },
  onLoad: function () {
  },
  formSubmit(e) { 
    let phone = this.data.phone;
    let checkRes = app.utils.checkPhone(phone);
    if (checkRes) {
      if (this.data.code.length != 6) {
        wx.showToast({
          title: '请输入6位数验证码',
          icon: 'none',
          duration: 2000
        })
      } else {
        //请求添加手机号码接口
        //此处模拟返回数据
        let res = { "code": 1 };
        if (res.code == '1') {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000,
            success: function () {
              //返回2级
              setTimeout(function () {
                wx.navigateBack({
                  delta: 2
                })
              }, 2000);
            }
          })
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000,
          })
        }
      }
    }
  },
  //input聚焦
  focus: function (e) {
    let index = e.currentTarget.dataset['index'];
    this.setData({ focusIndex: index });
  },
  //清空phone
  clearPhone: function () {
    this.setData({ phone: '' });
    this.setData({ showPhoneClose: false });
    this.setData({ showCodeClose: false });
    this.watchPhoneCode();
  },
  //清空code
  clearCode: function () {
    this.setData({ code: '' });
    this.setData({ showPhoneClose: false });
    this.setData({ showCodeClose: false });
    this.watchPhoneCode();
  },
  //获取验证码
  getCode: function () {
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
    if (this.data.phone == '' || !phoneReg.test(this.data.phone)) {
      wx.showToast({
        title: '您输入的不是一个有效的手机号码',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.codeBtnCount();
    }
  },
  //获取验证码按钮倒计时
  codeBtnCount: function () {
    var count = 60;
    var countTimer = null;
    var then = this;
    countTimer = setInterval(function () {
      count--;
      then.setData({ getCodeTex: count + 's' });
      then.setData({ send: true });
      if (count == 0) {
        then.setData({ getCodeTex: '重新获取' });
        then.setData({ send: false });
        clearInterval(countTimer);
      }
    }, 1000)
  },
  //获取phone 
  phone: function (e) {
    this.setData({ phone: e.detail.value })
    this.watchPhoneCode();
  },
  //获取code 
  code: function (e) {
    this.setData({ code: e.detail.value })
    this.watchPhoneCode();
  },
  //监听phone值和code值
  watchPhoneCode: function () {
    this.setData({ showPhoneClose: false });
    this.setData({ showCodeClose: false });
    var index = this.data.focusIndex;
    if (index == 0 && this.data.phone !== '') {
      this.setData({ showPhoneClose: true });
    }
    if (index == 1 && this.data.code !== '') {
      this.setData({ showCodeClose: true });
    }
    if (this.data.phone == '' || this.data.code == '') {
      this.setData({ finish: false })
    } else {
      this.setData({ finish: true })
    }
  }
})
