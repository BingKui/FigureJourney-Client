// pages/list/list.js
const Data = require('./data.js');
const _url = require('../../utils/url.js');
const ajax = require('../../utils/ajax.js');
const tools = require('../../utils/tools.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],
    pageNum: 1,
    showBottomLine: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPageData(1);
  },

  // 分页获取数据
  getPageData: function (page, callback) {
    const wx_openid = tools.getItem('userOpenId');
    const param = {
      "where":{
        "wx_openid": wx_openid
      },
      "order": "createdAt DESC",
      "skip": (page - 1) * 20,
      "limit": 20
    };
    const _that = this;
    wx.showLoading({
      title: '加载中...',
    })
    // 获取数据
    ajax.ApiCloudGet(_url.getRecordList, param, res => {
      _that.setData({
        recordList: res,
        showBottomLine: res.length < 20,
        pageNum: page
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
  // 下拉刷新
  upper:function () {
    this.getPageData(1);
  },
  // 上啦加载
  lower: function () {
    if (!this.data.showBottomLine) {
      this.getPageData(this.data.pageNum + 1);
    }
  }
})