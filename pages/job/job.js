const app = getApp();
const req=require('../../utils/requestAjax.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    house_type:0,//户型
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    tabTxt:['类型'],//tab文案
    workType:[],
    tab:[true],
    jobList:[]
  },
  // onReady: function() {
  //   //初始化数据
  //   var self=this;
  //   self.getFilter();
  // },
  // // 获取筛选项
  // getFilter:function(){
  //   var self=this;
  //   wx.request( {
  //       url:app.api.condition,
  //       data: {
  //           type:'housetype-style-area'
  //       },
  //       header: {
  //           'Content-Type': 'application/json'
  //       },
  //       success: function( res ) {
  //           self.getData();
  //           self.setData({
  //               filterList:res.data.data
  //           }); 
  //       },
  //       fail:function(){
  //           console.log('error!!!!!!!!!!!!!!')
  //       }
  //   })
  // },
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
  let data = {workId:e.currentTarget.dataset.id}
    data = JSON.stringify(data)
    req.requestAjax('recruit/list','GET',data,'正在加载',(res)=>{
      console.log(res)//请求成功回调
      this.setData({
        jobList:res
      })
		},function(res){
			console.log(res)//请求失败回调
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let data = {workId:1}
    data = JSON.stringify(data)
    req.requestAjax('recruit/list','GET',data,'正在加载',(res)=>{
      console.log(res)//请求成功回调
      res = res.reverse()
      this.setData({
        jobList:res
      })
		},function(res){
			console.log(res)//请求失败回调
    })
    req.requestAjax('type/workType','Get','{}','正在加载',(res)=>{
      console.log(res)//请求成功回调
      this.setData({
        workType:res
      })
    },function(res){
      console.log(res)//请求失败回调
    })
    
  }
})