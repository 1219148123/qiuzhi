// pages/usedDetail/usedDetail.js
const req=require('../../utils/requestAjax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carDetail:{},
    hDetail:{},
    cur:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.stringify(options)
    console.log(data)
    if(options.carId != undefined){
      req.requestAjax('secondeHandCar/get','GET',data,'正在加载',(res)=>{
        console.log(res)//请求成功回调
        res.carImg = res.carImg.split(',')
        console.log(res)//请求成功回调
        this.setData({
          carDetail:res,
          cur:0
        })
      },function(res){
        console.log(res)//请求失败回调
      })
    }else{
      req.requestAjax('house/get','GET',data,'正在加载',(res)=>{
        res.hImg = res.hImg.split(',')
        console.log(res)//请求成功回调

        this.setData({
          hDetail:res,
          cur:1
        })
        console.log(this.data.hDetail)
      },function(res){
        console.log(res)//请求失败回调
      })
    }
  }
})