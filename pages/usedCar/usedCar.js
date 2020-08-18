const app = getApp();
const req=require('../../utils/requestAjax.js')
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: [],
    imgList: [],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
    warn: "",
    errorMessage:"",
    isSubmit: false,
  },
  click(e){
    console.log(e)
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  formSubmit: function (e) {
    wx.showToast({
      title: '提交成功',
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let {carKilometre,carImg,carNowPrice,carType,carPeople,carPhone,carOriginalPrice} = e.detail.value;
    if (!carKilometre) {
      this.setData({
       warn: "车辆描述为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"车辆描述不能为空！"
      })
      return;
    }
    if (!carNowPrice) {
      this.setData({
       warn: "预期价位为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"预期价位不能为空！"
      })
      return;
     }
    
    if (!carType) {
      this.setData({
       warn: "车辆类型为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"车辆类型不能为空！"
      })
      return;
    }
    if (!carPeople) {
      this.setData({
       warn: "联系人为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"联系人不能为空！"
      })
      return;
    }
    if (!carPhone||!(/^1[3456789]\d{9}$/.test(carPhone))) {
      this.setData({
       warn: "手机号码为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"手机号格式不对！"
      })
      return;
    }
    if (!carOriginalPrice) {
      this.setData({
       warn: "地址为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"提货地址不能为空！"
      })
      return;
    }
   
    let data = {
      carAge:"string",
      carId: 0,
      carImg,
      carKilometre,
      carNowPrice,
      carOriginalPrice,
      carPeople,
      carPhone,
      carStatus:1,
      carTime:"",
      carType,
    }
    data = JSON.stringify(data)
    req.requestAjax('secondeHandCar/insert','POST',data,'正在加载',(res)=>{
      console.log(res)//请求成功回调
      wx.navigateBack({
        delta: 0,
      })
		},function(res){
			console.log(res)//请求失败回调
    })
    
   },
   hideModal(e) {
    this.setData({
      errorModal: false
    })
  },
  onShow(){
    req.requestAjax('type/carType','Get','{}','正在加载',(res)=>{
      console.log(res)//请求成功回调
      this.setData({
        picker:res
      })
		},function(res){
			console.log(res)//请求失败回调
    })
  }
})