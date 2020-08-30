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
    houseMarketList:[],
    tabTxt:['类型'],//tab文案
    tab:[true],
    typePicker:[],
  },
  
  filterTab:function(e){
    let data=[true],
    index=e.currentTarget.dataset.index;
    data[index]=!this.data.tab[index];
    this.setData({
        tab:data
    })
},
//筛选项点击操作
filter(e){
  var self=this,
  id=e.currentTarget.dataset.id,
  txt=e.currentTarget.dataset.txt,
  tabTxt=this.data.tabTxt;
  console.log(e)
  this.setData({
    tab:[true]
  })
  switch(e.currentTarget.dataset.index){
      case '0':
          tabTxt[0]=txt;
          self.setData({
              page:1,
              data:[],
              tab:[true],
              tabTxt:tabTxt,
              house_type:id
          });
      break;
  }
  //数据筛选
  this.getData(e);
},

getData(e){
  console.log(e)
  if(this.data.TabCur==1){
    let data = {houseType:e.currentTarget.dataset.id}
    data = JSON.stringify(data)
    req.requestAjax('house/list','GET',data,'正在加载',(res)=>{
      console.log(res)//请求成功回调
      res.forEach(hInfo => {
        hInfo.hImg = hInfo.hImg.split(',')
      })
      res = res.reverse()
      this.setData({
        houseMarketList:res
      })
		},function(res){
			console.log(res)//请求失败回调
    })
  }else{
    let data = {carType:e.currentTarget.dataset.id}
    data = JSON.stringify(data)
    req.requestAjax('secondeHandCar/list','GET',data,'正在加载',(res)=>{
      console.log(res)//请求成功回调
      res.forEach(carInfo => {
        carInfo.carImg = carInfo.carImg.split(',')
      })
      res = res.reverse()
      this.setData({
        carMarketList:res
      })
		},function(res){
			console.log(res)//请求失败回调
    })
  }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

  // },
  onLoad(){
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

    // cartype
    req.requestAjax('type/carType','Get','{}','正在加载',(res)=>{
      console.log(res)//请求成功回调
      this.setData({
        typePicker:res
      })
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

      // housetype
      req.requestAjax('type/houseType','Get','{}','正在加载',(res)=>{
        console.log(res)//请求成功回调
        this.setData({
          typePicker:res
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

      // cartype
    req.requestAjax('type/carType','Get','{}','正在加载',(res)=>{
      console.log(res)//请求成功回调
      this.setData({
        typePicker:res
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