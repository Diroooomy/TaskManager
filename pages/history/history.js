// pages/history/history.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    department: '',
    user: '',
    start: '',
    end: '',
    taskName: null,
    width: '0%',
    open: true,
    navbar: ['已完成','已协办'],
    currentTab: 0,
    is_done: [],
    co_done: [],
    color1: ['#4DC971', '#6793FE','#A487FE','#FEA722','#FC6E46'],
    color2: ['#76ECB8', '#64C9FF','#CEA4FE','#FFCC4F','#FF8B66'],
    departments: ['a','b','c','d','e'],
    body: {}
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.Data.currentTab = e.currentTarget.dataset.idx;
  },
  taskinfo:function (e) {
    console.log(e.target.id)
    app.Data.task_id = e.target.id
    console.log(app.Data.task_id)
    wx.redirectTo({
      url: '/pages/show_task/show_task',
    })
  },
  select:function (e) {
    this.setData({
      width : '50%',
      open: false
    });
    var that = this
    wx.request({
      url: 'http://47.104.165.90/api/departments',
      method: 'GET',
      header: {
        'Accept': "application/json",
        'Authorization': app.Data.token
      },
      success:function (res) {
        console.log(res.data)
        that.setData({
          departments: res.data
        })
      }
    })
  },
  selectTask:function (e) {
    var that = this
    this.setData({
      width: '0%',
      open: true
    })
    console.log(this.data.body)
    wx.request({
      url: 'http://47.104.165.90/api/tasks/search',
      method: 'GET',
      header: {
        'Accept': "application/json",
        'Authorization': app.Data.token
      },
      data: that.data.body,
      success:function (res) {
        that.setData({
          is_done: res.data.is_done,
          co_done: res.data.co_done
        })
        console.log(res.data)
      }
    })
  },
  closeBar:function (e) {
    this.setData({
      width: '0%',
      open: true
    })
    console.log(this.data)
  },
  task:function (e) {

    this.setData({
      taskName: e.detail.value,
      ['body.taskname']: e.detail.value
    })
  },
  department:function (e) {
    this.setData({
      department: this.data.departments[e.detail.value].name,
      department_id: this.data.departments[e.detail.value].id,
      url: 'http://47.104.165.90/api/departments/' + this.data.departments[e.detail.value].id,
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
            users: res.data,
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
  leader:function (e) {
    this.setData({
      user: this.data.users[e.detail.value].name,
      user_id: this.data.users[e.detail.value].id,
      ['body.user_id']: this.data.users[e.detail.value].id
    })
  },
  start: function (e) {
    this.setData({
      start: e.detail.value,
      ['body.start']: e.detail.value
    })
  },
  end: function (e) {
    this.setData({
      end: e.detail.value,
      ['body.end']: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.xyz)
    console.log(app)
    var data = app
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://47.104.165.90/api/tasks',
      method: 'GET',
      header: {
        'Accept': "application/json",
        'Authorization': app.Data.token
      },
      data:{
        'completed': 1,
        'me': 0,
      },
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode == 200) {
          console.log(res.data)
          that.setData({
            'is_done': res.data.is_done,
            'co_done': res.data.co_done
          })
        } else {
          wx.showToast({
            title: '连接失败',
            image: '/icons/fail.png'
          })
        }
      },
      fail: function (res) {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '连接失败',
          image: '/icons/fail.png'
        })
      },
    })
  },
  taskName: function () {

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
    var that = this
    wx.request({
      url: 'http://47.104.165.90/api/tasks',
      method: 'GET',
      header: {
        'Accept': "application/json",
        'Authorization': app.Data.token
      },
      data:{
        'completed': 1,
        'me': 0,
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          that.setData({
            'is_done': res.data.is_done,
            'co_done': res.data.co_done
          })
        } else {
          wx.showToast({
            title: '连接失败',
            image: '/icons/fail.png'
          })
        }
      },
      fail: function (res) {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '连接失败',
          image: '/icons/fail.png'
        })
      },
      complete: function(res) {
        wx.hideNavigationBarLoading(); //完成停止加载图标
        wx.stopPullDownRefresh();
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