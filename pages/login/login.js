//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    finish: false,//账号密码登录 是否完善信息
    finishMes: false,//短信登录/注册 是否完善信息
    phone: '',//手机号码
    pwd: '',//密码
    getCodeTex: '获取验证码',
    send: false,//是否在发送验证码
    phoneMes: '',//短信登录号码
    codeMes: '',//短信登录验证码
    isForeign: false,//是否是海外号码
    isAccountLogin: true,
  },
  onLoad: function () {
  },
  // 账号密码登录
  formSubmit(e) {
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (this.data.phone == '' || !phoneReg.test(this.data.phone)) {
      //如果不是国外手机登录 那么也可以是邮箱
      if (!this.data.isForeign) {
        let email = this.data.phone;
        app.utils.checkEmail(email, '0');
      } else {
        wx.showModal({
          title: '出错啦',
          content: '请输入正确的手机号或邮箱',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              //console.log('用户点击确定')
            }
          }
        })
      }
    } else if (this.data.pwd.length < 6 || this.data.pwd.length > 16) {
      wx.showModal({
        title: '出错啦',
        content: '请输入6-16位数密码',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          }
        }
      })
    } else {
      if (this.data.isForeign) {
        //请求国外手机号码 账号密码登录接口 
      } else {
        //请求国内 账号密码登录接口 
      }
      //此处模拟返回数据
      let res = { "code": 1 };
      if (res.code == '1') {
        wx.showToast({
          title: '登录成功',
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
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //切换海外手机密码登录
  switchForeign: function () {
    let isForeign = !this.data.isForeign;
    this.setData({ isForeign: isForeign });
  },
  //切换到短信验证登录
  switchMesLogin: function () {
    this.setData({ isAccountLogin: false })
  },
  //切换到账号密码登录
  switchAccountLogin: function () {
    this.setData({ isAccountLogin: true })
  },
  // 短信登录/注册 登录
  formSubmitMes(e) {
    let phone = this.data.phoneMes;
    let checkRes = app.utils.checkPhone(phone);
    if (checkRes) {
      if (this.data.codeMes.length !== 6) {
        wx.showToast({
          title: '请输入6位数验证码',
          icon: 'none',
          duration: 2000
        });
      } else {
        //请求短信登录/注册 接口 
        //此处模拟返回数据
        let res = { "code": 1 };
        if (res.code == '1') {
          wx.showToast({
            title: '登录成功',
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
            title: '登录失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    }
  },
  //获取验证码
  getCode: function () {
    let phone = this.data.phoneMes;
    let checkRes = app.utils.checkPhone(phone);
    if (checkRes) {
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
  //获取账号密码登录 phone 
  phone: function (e) {
    this.setData({ phone: e.detail.value })
    this.watchPhoneCode();
  },
  //获取账号密码登录 password
  pwd: function (e) {
    this.setData({ pwd: e.detail.value })
    this.watchPhoneCode();
  },
  //获取短信登录/注册 phoneMes 
  phoneMes: function (e) {
    this.setData({ phoneMes: e.detail.value })
    this.watchPhoneCodeMes();
  },
  //获取短信登录/注册 codeMes
  codeMes: function (e) {
    this.setData({ codeMes: e.detail.value })
    this.watchPhoneCodeMes();
  },
  //监听phone值和pwd值
  watchPhoneCode: function () {
    if (this.data.phone == '' || this.data.pwd == '') {
      this.setData({ finish: false })
    } else {
      this.setData({ finish: true })
    }
  },
  //忘记密码
  findPwd: function () {
    wx.showActionSheet({
      itemList: ['手机找回', '邮箱找回'],
      success(res) {
        if (res.tapIndex == '0') {
          wx.navigateTo({
            url: '/pages/findPwd/findPwd?phone=1'
          });
        } else if (res.tapIndex == '1') {
          wx.navigateTo({
            url: '/pages/findPwd/findPwd?email=1'
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  //监听phoneMes值和codeMes值
  watchPhoneCodeMes: function () {
    if (this.data.phoneMes == '' || this.data.codeMes == '') {
      this.setData({ finishMes: false })
    } else {
      this.setData({ finishMes: true })
    }
  }
})
