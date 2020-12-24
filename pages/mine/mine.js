// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['待办','进行中', '协办'],
    currentTab: 0,
    to_do: 0,
    ongoing: 0,
    co_work: 0,
    color1: ['#4DC971', '#6793FE','#A487FE','#FEA722','#FC6E46'],
    color2: ['#76ECB8', '#64C9FF','#CEA4FE','#FFCC4F','#FF8B66']
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  taskinfo:function (e) {
    console.log(e.target.id)
    app.globalData.task_id = e.target.id
    console.log(app.globalData.task_id)
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
      url: 'http://localhost/api/tasks',
      method: 'GET',
      header: {
        'Accept': "application/json",
        'Authorization': "604f74cf30bf13b8b9c796322eed4063"
      },
      data:{
        'completed': 0,
        'me': 1,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          'to_do': res.data.to_do,
          'ongoing': res.data.ongoing,
          'co_work': res.data.co_work
        })
        console.log(that.data)
        wx.hideLoading()
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