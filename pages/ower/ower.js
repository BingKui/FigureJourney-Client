// pages/ower/ower.js
const app = getApp();
const _url = require('../../utils/url.js');
const ajax = require('../../utils/ajax.js');
const tools = require('../../utils/tools.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    locationList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  getData: function () {
    const wx_openid = tools.getItem('userOpenId');
    const param = {
      "where": {
        "wx_openid": wx_openid
      },
      "fields": { "city": true, "location": true },
      "order": "createdAt DESC",
      "limit": 10
    };
    const _that = this;
    wx.showLoading({
      title: '加载中...',
    })
    // 获取数据
    ajax.ApiCloudGet(_url.getRecordList, param, res => {
      _that.setData({
        locationList: res
      });
      wx.hideLoading();
    });
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
    this.setData({
      userInfo: app.globalData.userInfo
    });
    this.getData();
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
})