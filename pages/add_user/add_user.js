// pages/add_user/add_user.js
const app = getApp()
Page({
  data: {
    department: '点击选择',
    vali: '点击选择',
    newuser: {
    },
    validity: ['永久', '一年', '二年', '三年']
  },
  name:function(e) {
    this.setData({
      ['newuser.name'] : e.detail.value,
    })
  },
  phone:function(e) {
    this.setData({
      ['newuser.phone'] : e.detail.value,
    })
  },
  department:function(e) {
    console.log(e.detail.value)
    this.setData({
      ['newuser.department_id'] : this.data.departments[e.detail.value].id,
      department: this.data.departments[e.detail.value].name,
      ischange: true
    })
  },
  id:function(e) {
    this.setData({
      ['newuser.id'] : e.detail.value,
    })
  },
  validity:function(e) {
    this.setData({
      ['newuser.validity'] : e.detail.value,
      vali: this.data.validity[e.detail.value]
    })
  },
  back:function(e) {
    if (this.data.ischange) {
      wx.showModal({
        title: '修改',
        content: '不保存直接退出？',
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
              title: '修改',
              content: '不保存退出，填写过的数据将无法保存',
              showCancel: true,//是否显示取消按钮
              cancelText:"否",//默认是“取消”
              cancelColor:'#000000',//取消文字的颜色
              confirmText:"是",//默认是“确定”
              confirmColor: '#000000',//确定文字的颜色
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
  save:function() {
    var that = this
    wx.showModal({
      title: '新建用户',
      content: '确定新建该用户信息？',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'#000000',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: '#000000',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
        } else {
          
          wx.request({
            url: 'http://' + app.Data.hostname + '/api/user/store',
            method: 'POST',
            header: {
              'Accept': 'applicaiton/json',
              'Authorization': app.Data.token
            },
            data: that.data.newuser,
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
                  title: '数据均不能为空',
                  icon: 'none'
                })
              }
            },
            fail:function(res) {
              wx.showToast({
                title: '连接失败',
                icon: 'none'
              })
            }
          })
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://' + app.Data.hostname + '/api/departments',
      method: 'GET',
      header: {
        'Accept': 'applicaiton/json',
        'Authorization': app.Data.token
      },
      success:function (res) {
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
      fail:function(res) {
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