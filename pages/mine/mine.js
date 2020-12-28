// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['待办','进行中', '协办'],
    currentTab: 0,
    to_do: [],
    ongoing: [],
    co_work: [],
    color1: ['#4DC971', '#6793FE','#A487FE','#FEA722','#FC6E46'],
    color2: ['#76ECB8', '#64C9FF','#CEA4FE','#FFCC4F','#FF8B66']
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        'completed': 0,
        'me': 1,
      },
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.statusCode == 200) {
          that.setData({
            'to_do': res.data.to_do,
            'ongoing': res.data.ongoing,
            'co_work': res.data.co_work
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
        'completed': 0,
        'me': 1,
      },
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          that.setData({
            'to_do': res.data.to_do,
            'ongoing': res.data.ongoing,
            'co_work': res.data.co_work
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
        wx.showToast({
          title: '连接失败',
          image: '/icons/fail.png'
        })
      },
      complete:function(res) {
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