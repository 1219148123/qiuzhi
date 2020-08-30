const app = getApp();
const req=require('../../utils/requestAjax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    tarbarList:['二手车','二手房'],
    // imgList:[],
    carMarketList:[],
    houseMarketList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow(){
    req.requestAjax('secondeHandCar/list','GET','{}','正在加载',(res)=>{
      console.log(res)//请求成功回调
      res=res.reverse()
      res.forEach(carInfo => {
        carInfo.carImg = carInfo.carImg.split(',')
      })
      console.log(res)
      this.setData({
        carMarketList:res
      })
      // this.data.carMarketList.forEach(carInfo => {
      //   carInfo.carImg = carInfo.carImg.split(',')
      // })
      console.log(this.data.carMarketList)
		},function(res){
			console.log(res)//请求失败回调
    })
    
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    console.log(this.data.TabCur)
    if(this.data.TabCur==1){
      req.requestAjax('house/list','GET','{}','正在加载',(res)=>{
        console.log(res)//请求成功回调
        res=res.reverse()
        res.forEach(hInfo => {
          hInfo.hImg = hInfo.hImg.split(',')
        })
        this.setData({
          carMarketList:[],
          houseMarketList:res
        })
        
      },function(res){
        console.log(res)//请求失败回调
      })
    }else{

      req.requestAjax('secondeHandCar/list','GET','{}','正在加载',(res)=>{
        console.log(res)//请求成功回调
        res.forEach(carInfo => {
          carInfo.carImg = carInfo.carImg.split(',')
        })
        this.setData({
          houseMarketList:[],
          carMarketList:res
        })
      },function(res){
        console.log(res)//请求失败回调
      })
    }
  },
  goUsedDetail(e){
    console.log(e)
    if(this.data.TabCur==0){
      wx.navigateTo({
        url: '/pages/usedDetail/usedDetail?carId='+e.currentTarget.dataset.carid,
      })
    }
    if(this.data.TabCur==1){
      wx.navigateTo({
        url: '/pages/usedDetail/usedDetail?hId='+e.currentTarget.dataset.hid,
      })
    }
  }
})