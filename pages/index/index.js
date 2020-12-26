//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    phone: '15611111111',
    password: '142578',
    root: 0
  },
  phoneInput:function(e)
  {
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
  listenerSwitch: function(e) {
    console.log('root', e.detail.value);
    if (e.detail.value) {
      this.data.root = 1
    } else {
      this.data.root = 0
    }
    console.log(this.data.root)
  },
  onLoad: function () {
    
  },
  btnclick:function() {
    wx.showLoading({
      title: '加载中...',
    });
    app.Data.root = this.data.root
    wx.request({
      url: 'http://localhost/api/loginbyphone',
      method: 'POST',
      data:{
        "phone": this.data.phone,
        'password': this.data.password,
        'root': this.data.root
      },    //参数为键值对字符串
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.token)
        if(res.statusCode == 200) {
          app.Data.token = res.data.token
          wx.showToast({
            title: '成功',
            duration: 1000,
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '../home/home',
                })
              }, 1000)
            }
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'error',
            duration: 1800,
            mask: true
          })
        }
      }
    })
  },
  forget:function() {
    wx.navigateTo({
      url: '../forget/forget',
    })
  }
})
