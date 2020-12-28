// pages/forget/forget.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn: false,
    info: '发送',
    currentTime: 60,
    color: 'rgb(254,99,0)',
    phone: null,
    code: null,
    password: null,
    confirm: null,
    zid: null,
    root: null
  },
  phoneInput:function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  passwordInput:function(e)
  {
    this.setData({
      password: e.detail.value
    })
  },
  codeInput:function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  passwordConfirm:function(e) {
    this.setData({
      confirm: e.detail.value
    })
},
  sendButton:function(options) {
    wx.showLoading({
      title: '加载中...',
    });
    var that = this;
    wx.request({
      url: 'http://47.104.165.90/api/sms',
      method: 'POST',
      data:{
        "phone": this.data.phone
      },    //参数为键值对字符串
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.zid)
        if(res.statusCode == 200) {
          app.globalData.root = res.data.root
          that.setData({
            zid: res.data.zid
          })
          wx.showToast({
            title: '成功',
            duration: 1000,
            mask: true,
          })
        } else {
          wx.showToast({
            title: '网络不佳',
            image: '../../icons/fail.png',
            duration: 1800,
            mask: true
          })
        }
      },
      fail:function(){
        wx.hideLoading()
        wx.showToast({
          title: '连接失败',
          image: '/icons/fail.png'
        })
      }
    })
    var that = this;
    var currentTime = that.data.currentTime
    var interval = setInterval(function() {
      currentTime--;
      that.setData({
        info: currentTime + '秒',
        btn:true,
        color:'rgb(255,255,255)'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          info: 'Retry',
          currentTime: 60,
          btn: false,
          color: 'rgb(254,99,0)'
        })
      }
    }, 1000)
  },
  enter:function() {
    wx.showLoading({
      title: '加载中...',
    });
    app.globalData.root = this.data.root
    if (this.data.password == this.data.confirm) {
      wx.request({
        url: 'http://47.104.165.90/api/change',
        method: 'PUT',
        data:{
          "phone": this.data.phone,
          'password': this.data.password,
          'code': this.data.code,
          'zid': this.data.zid
        },    //参数为键值对字符串
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res.data.message)
          if(res.statusCode == 200) {
            app.globalData.token = res.data.token
            wx.showToast({
              title: '成功',
              duration: 1000,
              mask: true,
            })
            wx.redirectTo({
              url: '/pages/index/index',
            })
          } else {
            wx.showToast({
              title: '验证码错误',
              image: '../../icons/fail.png',
              duration: 1800,
              mask: true
            })
          }
        },
        fail:function() {
          wx.hideLoading()
          wx.showToast({
            title: '连接失败',
            image: '/icons/fail.png'
          })
        }
      })
    } else {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',    
        duration: 1000    
      })  
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})