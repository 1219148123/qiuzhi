// comm.js 文件
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
//其他参数可以自定义传入
function requestAjax(url,method,data={}, message, success, fail) {
  // console.log(data)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  data=JSON.parse(data)
  wx.request({
  //可以写上请求的域名  后期改测试服正式服 改一个地方就可以 前缀写上后期上线改地址好改
    url: 'http://47.103.4.57:9797/'+url,
    // url: 'http://127.0.0.1:9797/'+url,
    data,
    method,//方法也可以改成变量 传入
    success: function (res) {
      console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {
      console.log(data)
    },
  })
}
module.exports = {
  requestAjax: requestAjax,
}
//这里必须写上  否则小程序调取不到方法 我前面文章有写到怎么调用方法
