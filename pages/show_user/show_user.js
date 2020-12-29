// pages/show_user/show_user.js
const app = getApp()
Page({
  data: {
    user: {
      name: 'asd',
      phone: '15611111',
      department: '运输部',
      id: 'GT250',
      validity: 1
    }
  },
  back:function() {
    wx.navigateBack({
      delta: 1,
    })
  },
  edit:function() {
    wx.navigateTo({
      url: '/pages/edit_user/edit_user',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = 'http://47.104.165.90/api/user/' + app.Data.user_id+ '/show'
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Accept': 'applicaiton/json',
        'Authorization': app.Data.token
      },
      success:function(res) {
        if (res.statusCode == 200) {
          that.setData({
            user: res.data
          })
        }
      }
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
    wx.showLoading()
    var that = this
    var url = 'http://47.104.165.90/api/user/' + app.Data.user_id+ '/show'
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Accept': 'applicaiton/json',
        'Authorization': app.Data.token
      },
      success:function(res) {
        wx.hideLoading()
        if (res.statusCode == 200) {
          that.setData({
            user: res.data
          })
        }
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