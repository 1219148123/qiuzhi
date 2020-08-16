const app = getApp();
const req=require('../../utils/requestAjax.js')
Page({
  data: {
    warn: "",
    errorMessage:"",
    isSubmit: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['货车', '轿车', '客车', '电动车', '摩托车'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
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
  hideModal(e) {
    this.setData({
      errorModal: false
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let {hContent,hImg,hMoney,hPeople,hPhone,hAddress} = e.detail.value;
    if (!hContent) {
      this.setData({
       warn: "房子描述为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"房子描述不能为空！"
      })
      return;
    }
    if (!hMoney) {
      this.setData({
       warn: "预期价位为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"预期价位不能为空！"
      })
      return;
     }
    
    if (!hPeople) {
      this.setData({
       warn: "联系人为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"联系人不能为空！"
      })
      return;
    }
    if (!hPhone||!(/^1[3456789]\d{9}$/.test(hPhone))) {
      this.setData({
       warn: "手机号码为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"手机号格式不对！"
      })
      return;
    }
    if (!hAddress) {
      this.setData({
       warn: "房子地址为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"房子地址不能为空！"
      })
      return;
    }
   
    let data = {
      hAddress,
      hContent,
      hId:0,
      hImg,
      hMoney,
      hPeople,
      hStatus:1,
      hTime:""
    }
    data = JSON.stringify(data)
    req.requestAjax('house/insert','POST',data,'正在加载',(res)=>{
      console.log(res)//请求成功回调
      // this.setData({
      //   jobList:res
      // })
		},function(res){
			console.log(res)//请求失败回调
    })
    
   },
})