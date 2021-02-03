// pages/done_task/done_task.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  back:function(e) {
    wx.navigateBack({
      delta: 1,
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
    var that = this
    var url = 'http://' + app.Data.hostname + '/api/tasks/' + app.Data.task_id
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': app.Data.token
      },
      success: function(res) {
        wx.hideNavigationBarLoading()
        if (res.statusCode == 200) {
          that.setData({
            task: res.data
          })
        }
      },
      fail: function(res) {
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
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