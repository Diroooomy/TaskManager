// pages/edit_task/edit_task.js
const app = getApp()
var util=require('../../utils/util.js')
var date=util.formatTime(new Date());
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: [],
    task: {},
    body: {},
    date: date,
    ischange: false
  },
  name:function(e) {
    console.log(e.detail.value)
    this.setData({
      ['newtask.name']: e.detail.value,
      ['body.content']: e.detail.value,
      ischange: true
    })
  },
  content:function(e) {
    this.setData({
      ['newtask.content']: e.detail.value,
      ['body.content']: e.detail.value,
      ischange:true
    })
  },
  leader:function(e) {
    console.log(e.detail.value)
    this.setData({
      ['newtask.user_id']: this.data.users[e.detail.value].id,
      ['newtask.leader']: this.data.users[e.detail.value].name,
      ['body.user_id']: this.data.users[e.detail.value].id,
      ischange:true
    })
  },
  helper:function(e) {
    console.log(e.detail.value)
    this.setData({
      ['newtask.helper']: this.data.users[e.detail.value].id,
      ['newtask.assistant']: this.data.users[e.detail.value].name,
      ['body.helper']: this.data.users[e.detail.value].id,
      ['body.is_helped']: 1,
      ischange:true
    })
  },
  deadline:function(e) {
    this.setData({
      ['newtask.deadline']: e.detail.value,
      ['body.deadline']: e.detail.value
    })
  },
  back:function() {
    if (this.data.ischange) {
      wx.showModal({
        title: '修改',
        content: '不保存修改退出？',
        showCancel: true,//是否显示取消按钮
        cancelText:"否",//默认是“取消”
        cancelColor:'skyblue',//取消文字的颜色
        confirmText:"是",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
              //点击取消,默认隐藏弹框
          } else {
            wx.showModal({
              title: '修改',
              content: '不保存修改退出，修改过的数据将无法保存',
              showCancel: true,//是否显示取消按钮
              cancelText:"否",//默认是“取消”
              cancelColor:'skyblue',//取消文字的颜色
              confirmText:"是",//默认是“确定”
              confirmColor: 'skyblue',//确定文字的颜色
              success:function(res) {
                if (res.cancel){
                } else {
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
  delete:function() {
    if (this.data.task.user_id == app.Data.id) {
    wx.showModal({
      title: '删除',
      content: '确定要删除该任务？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'skyblue',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
            //点击取消,默认隐藏弹框
        } else {
          wx.showModal({
            title: '删除',
            content: '确定要删除该用户，用户数据将无法恢复？',
            showCancel: true,//是否显示取消按钮
            cancelText:"否",//默认是“取消”
            cancelColor:'skyblue',//取消文字的颜色
            confirmText:"是",//默认是“确定”
            confirmColor: 'skyblue',//确定文字的颜色
            success: function (res) {
              if (res.cancel) {
              } else {
                url = 'http://47.104.165.90/api/tasks/' + app.Data.task_id
          wx.request({
            url: url,
            method: 'DELETE',
            header: {
              'Accept': 'application/json',
              'Authorization': app.Data.token
            },
            success:function(res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                })
                wx.navigateBack({
                  delta: 2,
                })
              } else {
                wx.showToast({
                  title: '连接失败',
                  image: '/icons/fail.png'
                })
              }
            }
          })
              }
            }
          })
          
        }
      },
   })
  } else {
    wx.showToast({
      title: '仅负责人可删除',
      image: '/icons/fail.png'
    })
  }
  },
  save:function() {
    if (this.data.newtask.user_id == this.data.newtask.helper) {
      wx.showToast({
        title: '负责人与协助人',
        image:'/icons/fail.png'
      })
    } else {
      var that = this
    wx.showModal({
      title: '保存修改',
      content: '确定要修改该任务信息？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'skyblue',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
        } else {
          var url = 'http://47.104.165.90/api/tasks/' + app.Data.task_id
          wx.request({
            url: url,
            method: 'PUT',
            header: {
              'Accept': 'applicaiton/json',
              'Authorization': app.Data.token
            },
            data: that.data.body,
            success:function (res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '成功',
                  icon: 'success'
                })
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
              wx.showToast({
                title: '连接失败',
                image: '/icons/fail.png'
              })
            }
          })
        }
      },
   })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
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
            task: res.data,
            newtask: res.data
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
    wx.request({
      url: 'http://47.104.165.90/api/users',
      method: 'GET',
      header: {
        'Accept': 'applicaiton/json',
        'Authorization': app.Data.token
      },
      success: function(res) {
        if (res.statusCode == 200) {
          that.setData({
            users: res.data
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