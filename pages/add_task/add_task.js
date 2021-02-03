// pages/add_task/add_task.js
const app = getApp()
var util=require('../../utils/util.js')
var date=util.formatTime(new Date());
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischange: false,
    date: date,
    deadline: '选择日期',
    leader: '点击选择',
    helper: '点击选择',
    task: {
      'is_helped': false
    }
  },
  clear:function(e) {
    delete this.data.task.helper
    this.setData({
      helper: '点击选择',
      ['task.is_helped']: false
    })
    console.log(this.data.task.helper)
  },
  name:function(e) {
    this.setData({
      ['task.name']: e.detail.value
    })
  },
  content:function(e) {
    this.setData({
      ['task.content']: e.detail.value
    })
  },
  leader:function(e) {
    this.setData({
      ['task.user_id']: this.data.users[e.detail.value].id,
      leader: this.data.users[e.detail.value].name,
      ischange:true
    })
  },
  helper:function(e) {
    this.setData({
      ['task.is_helped']: true,
      ['task.helper']: this.data.users[e.detail.value].id,
      helper: this.data.users[e.detail.value].name,
      ischange:true
    })
  },
  deadline:function(e) {
    this.setData({
      ['task.deadline']: e.detail.value,
      deadline: e.detail.value,
      ischange:true
    })
  },
  delete:function() {
    if (this.data.ischange) {
      wx.showNavigationBarLoading()
      wx.showModal({
      title: '放弃',
      content: '确定要放弃创建任务？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'#000000',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: '#000000',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
            //点击取消,默认隐藏弹框
        } else {
            wx.showModal({
              title: '放弃',
              content: '填写的数据将不会被保存，确定丢弃？',
              showCancel: true,//是否显示取消按钮
              cancelText:"否",//默认是“取消”
              cancelColor:'#000000',//取消文字的颜色
              confirmText:"是",//默认是“确定”
              confirmColor: '#000000',//确定文字的颜色
              success: function (res) {
                if (res.cancel) {
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

  save:function(e) {
    var that = this
    if (this.data.task.user_id == this.data.task.helper) {
      wx.showToast({
        title: '负责人与协助人不能一致',
        icon: 'none'
      })
    } else {
      wx.showNavigationBarLoading()
      wx.request({
        url: 'http://' + app.Data.hostname + '/api/tasks',
        method: 'POST',
        header: {
          'Accept': 'applicaiton/json',
          'Authorization': app.Data.token
        },
        data: that.data.task,
        success:function(res) {
          wx.hideNavigationBarLoading()
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
              title: '缺少必须数据',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://' + app.Data.hostname + '/api/users',
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
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      ['task.user_id']: null,
      leader: '点击选择',
      ['task.helper']: null,
      hepler: '点击选择',
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