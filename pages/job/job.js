Page({

  /**
   * 页面的初始数据
   */
  data: {
    house_type:0,//户型
    tabTxt:['类型'],//tab文案
    tab:[true],
    data:[
      {
        id:1,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:2,
        jobname:'物流分拣180包吃住可预支',
        jobcompany:'上海***科技发展有限公司',
        jobaddress:'平谷',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:3,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:4,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:5,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:6,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      }
    ]
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
    var data=[true],
    index=e.currentTarget.dataset.index;
    data[index]=!this.data.tab[index];
    this.setData({
        tab:data
    })
},
//筛选项点击操作
filter:function(e){
  var self=this,
  id=e.currentTarget.dataset.id,
  txt=e.currentTarget.dataset.txt,
  tabTxt=this.data.tabTxt;
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
  self.getData();
},
getData:function(callback){
  var self = this;
  wx.showToast({
    title: '加载中...',
    icon: 'loading',
    duration:10000
  });
  self.setData({
    data:[
      {
        id:1,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:2,
        jobname:'物流分拣180包吃住可预支',
        jobcompany:'上海***科技发展有限公司',
        jobaddress:'平谷',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:3,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:4,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:5,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      },
      {
        id:6,
        jobname:'兼职医院英语翻译口译',
        jobcompany:'北京***科技发展有限公司',
        jobaddress:'丰台',
        jobsalary:'150/天',
        jobway:'月结'
      }
    ]
  })
  wx.hideToast();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  }
})