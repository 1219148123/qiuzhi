// pages/job-content/job-content.js
const req=require('../../utils/requestAjax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobdetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      req.requestAjax('/recruit/get','GET','{"zId":"'+ options.jobid +'"}','正在加载',(res)=>{
        console.log(res)//请求成功回调
        console.log(options.jobid)
        this.setData({
          jobdetail:res
        })
      },function(res){
        console.log(res)//请求失败回调
      })
  },
  BackPage() {
    wx.navigateBack({
      delta: 1
    });
  }
})