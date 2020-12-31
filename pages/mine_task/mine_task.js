// pages/mine_task/mine_task.js
const app = getApp()
Page({
  data: {

  },
  back:function(e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  start:function(e) {
    wx.showModal({
      title: 'start',
      content: '开始进行该任务？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'skyblue',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
        } else {
          let pages = getCurrentPages();//当前页面栈
          let prevPage = pages[pages.length - 2];//上一页面
          prevPage.setData({
            currentTab: 1
          });
          wx.showNavigationBarLoading()
          var url = 'http://47.104.165.90/api/tasks/' + app.Data.task_id
          wx.request({
            url: url,
            method: 'PUT',
            header: {
              'Accpet': 'application/json',
              'Authorization': app.Data.token
            },
            data: {
              'rate': 1
            },
            success:function(res) {
              wx.hideNavigationBarLoading()
              if (res.statusCode == 200) {
                wx.navigateBack({
                  delta: 1,
                })
              } else {
                wx.showToast({
                  title: '连接失败',
                  image: '/icons/fail.png'
                })
              }
            },
            fail:function(res) {
              wx.hideNavigationBarLoading()
              wx.showToast({
                title: '连接失败',
                image: '/icons/fail.png'
              })
            }
          })
        }
      },
   })
  },
  edit:function(e) {
    wx.navigateTo({
      url: '/pages/edit_task/edit_task',
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
    var url = 'http://47.104.165.90/api/tasks/' + app.Data.task_id
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
          image: '/icons/fail.png'
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