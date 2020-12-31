// pages/ongoing_task/ongoing_task.js
const app = getApp()
Page({
  data: {
    ischange: false
  },
  back:function(e) {
    if(this.data.ischange) {
      var that = this
      wx.showModal({
        title: '返回',
          content: '保存该任务进度？',
          showCancel: true,//是否显示取消按钮
          cancelText:"否",//默认是“取消”
          cancelColor:'skyblue',//取消文字的颜色
          confirmText:"是",//默认是“确定”
          confirmColor: 'skyblue',//确定文字的颜色
          success: function (res) {
            if (res.cancel) {
            } else {
              wx.request({
                url: 'http://47.104.165.90/api/tasks/' + app.Data.task_id,
                method: 'PUT',
                header: {
                  'Accpet': 'application/json',
                  'Authorization': app.Data.token
                },
                data: {
                  'rate': that.data.rate
                },
                success:function(res) {
                  if (res.statusCode == 200) {
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: '200'
                    })
                    wx.navigateBack({
                      delta: 1,
                    })
                  }
                }
              })
            }
          },
      })
    } else {
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  edit:function(e) {
    wx.navigateTo({
      url: '/pages/edit_task/edit_task',
    })
  },
  rate:function(e) {
    console.log(e.detail.value)
    this.setData({
      ['task.rate']: e.detail.value,
      rate: e.detail.value,
      ischange: true
    })
  },
  finish:function(e) {
    wx.showNavigationBarLoading()
    wx.showModal({
      title: '完成',
      content: '是否已完成该任务？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'skyblue',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
         if (res.cancel) {
         } else {
            wx.request({
              url: 'http://47.104.165.90/api/tasks/' + app.Data.task_id,
              method: 'PUT',
              header: {
                'Accept': 'application/json',
                'Authorization': app.Data.token
              },
              data: {
                'rate': 100
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
              fail:function(e) {
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
    wx.showNavigationBarLoading()
    wx.request({
      url: 'http://47.104.165.90/api/tasks/' + app.Data.task_id,
      method: 'GET',
      header: {
        'Accept': 'application/json',
        'Authorization': app.Data.token
      },
      success:function(res) {
        wx.hideNavigationBarLoading()
        if (res.statusCode == 200) {
          that.setData({
            task: res.data
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