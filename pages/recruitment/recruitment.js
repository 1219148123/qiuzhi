const app = getApp();
const req=require('../../utils/requestAjax.js')
Page({
  data: {
    warn: "",
    errorMessage:"",
    isSubmit: false,
    // jobContent:"",
    // jobNeed:"",
    // jobSalay:"",
    // jobType:"喵喵喵",
    // jobEmail:"",
    // jobPhone:"",
    // jobAddress:"",
    // jobTime:"",
    jobEmailFocus:false,
    jobPhoneFocus:false,
    errorModal:false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    index: null,
    picker: [],
    imgList: [],
    // modalName: null,
    textareaAValue: '',
    textareaBValue: ''
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
    let { jobContent,jobNeed,jobSalay,jobType,jobPeople,jobPhone,jobAddress,jobPeriod, } = e.detail.value;
    if (!jobContent) {
      this.setData({
       jobContentFocus:true,
       warn: "工作内容为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"工作内容不能为空！"
      })
      return;
    }
    if (!jobNeed) {
      this.setData({
       jobNeedFocus:true,
       warn: "岗位要求为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"岗位要求不能为空！"
      })
      return;
     }
    
    if (!jobSalay||!(/^[1-9]\d*元\/天|[1-9]\d*元\/月$/.test(jobSalay))) {
      this.setData({
       jobSalayFocus:true,
       warn: "薪资为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"薪资不能为空！"
      })
      return;
    }
    if (!jobType) {
      this.setData({
       jobTypeFocus:true,
       warn: "工作类型为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"工作类型不能为空！"
      })
      return;
    }
    if (!jobPeople) {
     this.setData({
      warn: "联系人为空！",
      isSubmit: true,
      errorModal:true,
      errorMessage:"联系人不能为空！"
     })
     return;
    }
    if (!jobPhone||!(/^1[3456789]\d{9}$/.test(jobPhone))) {
      this.setData({
       jobPhoneFocus:true,
       warn: "手机号码为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"手机号格式不对！"
      })
      return;
    }
    if (!jobAddress) {
      this.setData({
       jobAddressFocus:true,
       warn: "地址为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"工作地址不能为空！"
      })
      return;
    }
    if (!jobPeriod) {
      this.setData({
       jobTimeFocus:true,
       warn: "时间为空！",
       isSubmit: true,
       errorModal:true,
       errorMessage:"工作时间不能为空！"
      })
      return;
    }
    let data = {
      zId: 0,
      zStatus: 0,
      zType: parseInt(jobType)+1,
      zWorkAddress: jobAddress,
      zWorkContent: jobContent,
      zWorkEmail: jobPeople,
      zWorkPeriod: jobPeriod,
      zWorkPhone: jobPhone,
      zWorkRequirement: jobNeed,
      zWorkSalary: jobSalay
    }
    data = JSON.stringify(data)
    req.requestAjax('recruit/insert','POST',data,'正在加载',(res)=>{
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
    req.requestAjax('type/workType','Get','{}','正在加载',(res)=>{
      console.log(res)//请求成功回调
      this.setData({
        picker:res
      })
		},function(res){
			console.log(res)//请求失败回调
    })
  }
})