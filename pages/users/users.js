// pages/users/users.js
const app = getApp()
Page({
  hidden: true,
  data: {
    department: '全部',
    departments: '',
    users:[]
  },
  userinfo:function(e) {
    console.log(e.target.id)
    app.Data.user_id = e.target.id
    wx.navigateTo({
      url: '/pages/show_user/show_user',
    })
  },
  department:function (e) {
    this.setData({
      department: this.data.departments[e.detail.value].name,
      department_id: this.data.departments[e.detail.value].id,
      url: 'http://' + app.Data.hostname + '/api/departments/' + this.data.departments[e.detail.value].id,
    })
    console.log(e.detail.value)
    var that = this
    wx.request({
      url: that.data.url,
      method: 'GET',
      header: {
        'Accept': "application/json",
        'Authorization': app.Data.token
      },
      success:function (res) {
        if (res.statusCode == 200) {
          that.setData({
            users: res.data
          })
        } else {
          wx.showToast({
            title: '连接失败',
            imame: '/icons/fail.png',
            duration: 600
          })
        }
        console.log(res.data)
      },
      fail:function(res) {
        wx.showToast({
          title: '连接失败',
          imame: '/icons/fail.png',
          duration: 600
        })
      }
    })
  },
  addUser: function(e) {
    wx.navigateTo({
      url: '/pages/add_user/add_user',
    })
  },
  addDepartment: function(e) {
    wx.navigateTo({
      url: '/pages/department/department',
    })
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
    this.setData({
      department: '全部'
    })
    var that = this
    wx.request({
      url: 'http://' + app.Data.hostname + '/api/departments',
      method: 'GET',
      header: {
        'Accept': 'applicaiton/json',
        'Authorization': app.Data.token
      },
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            departments: res.data
          })
        } else {
          wx.showToast({
            title: '连接失败',
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '连接失败',
          icon: 'none'
        })
      }
    })
    wx.request({
      url: 'http://' + app.Data.hostname + '/api/users',
      method: 'GET',
      header: {
        'Accept': "application/json",
        'Authorization': app.Data.token
      },
      success:function (res) {
        if (res.statusCode == 200) {
          that.setData({
            users: res.data
          })
        } else {
          wx.showToast({
            title: '连接失败',
            imame: '/icons/fail.png',
            duration: 600
          })
        }
        console.log(res.data)
      },
      fail:function(res) {
        wx.showToast({
          title: '连接失败',
          imame: '/icons/fail.png',
          duration: 600
        })
      }
    })
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
    var that = this
    wx.request({
      url: 'http://' + app.Data.hostname + '/api/users',
      method: 'GET',
      header: {
        'Accept': "application/json",
        'Authorization': app.Data.token
      },
      success:function (res) {
        if (res.statusCode == 200) {
          that.setData({
            users: res.data,
            department: '全部'
          })
        } else {
          wx.showToast({
            title: '连接失败',
            icon: 'none',
            duration: 600
          })
        }
        console.log(res.data)
      },
      fail:function(res) {
        wx.showToast({
          title: '连接失败',
          icon: 'none',
          duration: 600
        })
      }
    })
    wx.request({
      url: 'http://' + app.Data.hostname + '/api/departments',
      method: 'GET',
      header: {
        'Accept': 'applicaiton/json',
        'Authorization': app.Data.token
      },
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            departments: res.data
          })
        } else {
          wx.showToast({
            title: '连接失败',
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '连接失败',
          icon: 'none'
        })
      }
    })
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