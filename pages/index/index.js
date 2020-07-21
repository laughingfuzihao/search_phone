//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '手机号码归属地查询',
    province: '',
    city: '',
    company: '',
    iphone:'',
    iphones:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
	getInput:function(e){
    this.setData({
      iphones: e.detail.value
    })
},
 // https://mobsec-dianhua.baidu.com/dianhua_api/open/location?tel=18618479125
 //https://apis.juhe.cn/mobile/get?phone=18618479125&dtype=&key=74ede9803f71203ac935cfeb54bf3a9f
 btn2click:function(){
  var that = this;
  that.setData({
    province: "",
    city: "",
    company: "",
    iphones:"",
   })

 },
  btnclick:function(){
    var iphone = this.data.iphones;
    var that = this;

    if(iphone == "110"){
      that.setData({
        province: "互联网不是法外之地",
        city: "",
        company: "",
       })
       return;
    }
    if(iphone == "120"){
      that.setData({
        province: "您是否需要救治",
        city: "",
        company: "",
       })
       return;
    }
    if(iphone == "119"){
      that.setData({
        province: "不要上火",
        city: "",
        company: "",
       })
       return;
    }
    console.log(iphone.length);
    if(iphone.length != 11){
      that.setData({
        province: "请输入合法的号码",
        city: "",
        company: "",
       })
       return;
    }

    var key1 = "74ede9803f71203ac935cfeb54bf3a9f";
    if(iphone != null && iphone != ''){
    wx.request({
      url: 'https://apis.juhe.cn/mobile/get?phone='+iphone+'&key='+key1, 
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data);
        if(res.data.resultcode == "112"){
          that.setData({
            province: "API调用次数今日已用尽！",
            city:"",
            company: "" 
           })         
        }else{
          if(res.data.result == null){
            that.setData({
              province: "号码不存在",
              city:"",
              company: "" 
             })
          }else{
            if(res.data.result.city == res.data.result.province){
              that.setData({
                province: res.data.result.province,
                city: "",
                company: res.data.result.company,
               })
            }else{
              that.setData({
                province: res.data.result.province,
                city: res.data.result.city,
                company: res.data.result.company,
               })
            }
          }
        }
      }
    })      
    }
},

})












