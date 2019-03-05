const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//正则检验手机号码
const checkPhone = (phone) =>{
  let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (phone && !phoneReg.test(phone)) {
      wx.showToast({
        title: '请输入有效的手机号码',
        icon: 'none',
        duration: 2000
      })
      return false;
    }else{
      return true;
    }
}

//正则检验邮箱  参数email=》检验的值 value=>0(账号，提示请输入手机号和邮箱) value=>2(邮箱,提示请输入邮箱) 
const checkEmail = (email,value) =>{
  let emailReg = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/;
  let tipTxt='请输入正确的邮箱';
  if(value=='0'){
    tipTxt='请输入正确的手机号或邮箱';
  }
    if (email && !emailReg.test(email)) {
      wx.showToast({
        title: tipTxt,
        icon: 'none',
        duration: 2000
      })
      return false;
    }else{
      return true;
    }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  checkPhone:checkPhone,
  checkEmail:checkEmail
}
