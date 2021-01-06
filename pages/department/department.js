// pages/department/department.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  department:function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  save:function(e) {
    var that = this
    if(this.data.name) {
      wx.request({
        url: 'http://47.104.165.90/api/departments',
        method: 'POST',
        header: {
          'Accpet': 'application/json',
          'Authorization': app.Data.token
        },
        data: {
          name: that.data.name
        },
        success:function(res) {
          if (res.statusCode == 200) {
            console.log(res.statusCode)
            wx.showToast({
              title: '成功',
              icon: 'success'
            })
            that.onLoad()
          } else {
            wx.showToast({
              title: '失败',
            })
          }
        },
        fail:function(res) {
          wx.showToast({
            title: '失败'
          })
        }
      })
    }
  },
  back:function(e) {
    wx.navigateBack({
      delta: 1,
    })
  },
  delete:function(e) {
    console.log(e.target.id)
    this.setData({
      id: this.data.departments[e.target.id].id
    })
    
    var that = this
    wx.showModal({
      title: '删除部门',
      content: '确认删除该部门？',
      showCancel: true,
      cancelColor:'#000000',
      confirmColor: '#000000',
      success (res) {
        if (res.confirm) {
          wx.showModal({
            title: '删除用户',
            content: '该部门下的用户也会删除，继续？',
            showCancel: true,
            cancelColor:'#000000',
            confirmColor: '#000000',
            success (res) {
              if (res.confirm) {
                wx.request({
                  url: 'http://47.104.165.90/api/departments/' + that.data.id,
                  method: 'DELETE',
                  header: {
                    'Accept': 'application/json',
                    'Authorization': app.Data.token
                  },
                  success:function(res) {
                    if (res.statusCode == 200) {
                       wx.showToast({
                         title: '成功',
                         icon: 'success',
                       })
                       that.onLoad()
                    } else (
                      wx.showToast({
                        title: '失败',
                      })
                    )
                  },
                  fail:function(res) {
                    wx.showToast({
                      title: '失败',
                    })
                  }
                })
              }
            }
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://47.104.165.90/api/departments',
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
      url: 'http://47.104.165.90/api/departments',
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