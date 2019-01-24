//封装发送豆瓣请求
module.exports = function(api,path,params){
      return new Promise((resolve,reject) => {
          wx.request({
              url:`${api}/${path}`,
              data:Object.assign({},params),
              header:{'Content-Type':'json'},
              success:resolve,
              fail:reject
          })
      })

}