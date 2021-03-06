const app = getApp();
const req=require('../../utils/requestAjax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    jobList:[
      // {
      //   id:1,
      //   jobname:'兼职医院英语翻译口译',
      //   jobcompany:'北京***科技发展有限公司',
      //   jobaddress:'丰台',
      //   jobsalary:'150/天',
      //   jobway:'月结'
      // },
      // {
      //   id:2,
      //   jobname:'物流分拣180包吃住可预支',
      //   jobcompany:'上海***科技发展有限公司',
      //   jobaddress:'平谷',
      //   jobsalary:'150/天',
      //   jobway:'月结'
      // },
      // {
      //   id:3,
      //   jobname:'兼职医院英语翻译口译',
      //   jobcompany:'北京***科技发展有限公司',
      //   jobaddress:'丰台',
      //   jobsalary:'150/天',
      //   jobway:'月结'
      // },
      // {
      //   id:4,
      //   jobname:'兼职医院英语翻译口译',
      //   jobcompany:'北京***科技发展有限公司',
      //   jobaddress:'丰台',
      //   jobsalary:'150/天',
      //   jobway:'月结'
      // },
      // {
      //   id:5,
      //   jobname:'兼职医院英语翻译口译',
      //   jobcompany:'北京***科技发展有限公司',
      //   jobaddress:'丰台',
      //   jobsalary:'150/天',
      //   jobway:'月结'
      // },
      // {
      //   id:6,
      //   jobname:'兼职医院英语翻译口译',
      //   jobcompany:'北京***科技发展有限公司',
      //   jobaddress:'丰台',
      //   jobsalary:'150/天',
      //   jobway:'月结'
      // }

    ]
  },
  goJobContent(e){
    console.log(e);
    wx.navigateTo({
      url: `../../pages/jobDetail/jobDetail?jobid=${e.currentTarget.dataset.jobid}`,
    })
  },

  onShow() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    this.updateJobList()
  },
  onPullDownRefresh: function() {
    this.updateJobList()
    wx.stopPullDownRefresh()
  },
  updateJobList(){
    req.requestAjax('recruit/list','GET','{}','正在加载',(res)=>{
      console.log(res)//请求成功回调
      res=res.reverse()
      this.setData({
        jobList:res
      })
		},function(res){
			console.log(res)//请求失败回调
    })
  },
  //  轮播图  start
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
  //  轮播图  end
})