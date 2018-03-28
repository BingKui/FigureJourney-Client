// pages/addrocord/addrocord.js
// 引入腾讯地图
const BMap = require('../../lib/bmap.js');
const config = require('../../utils/config.js');
const tools = require('../../utils/tools.js');
const ajax = require('../../utils/ajax.js');
const weather = require('./util.js');
const emum = require('./enum.js');
const _url = require('../../utils/url.js');
const bmap = new BMap.BMapWX({
    ak: config.baiduAK
});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        locationName: '',
        location: null,
        weather: null,
        radioItems: emum.moodList,
        siteListItems: emum.siteList,
        hidden: false
    },
    moodRadioChange: function (e) {
        var checked = e.detail.value
        var changed = {}
        for (var i = 0; i < this.data.radioItems.length; i++) {
            if (checked.indexOf(this.data.radioItems[i].value) !== -1) {
                changed['radioItems[' + i + '].checked'] = true
            } else {
                changed['radioItems[' + i + '].checked'] = false
            }
        }
        this.setData(changed)
    },
    siteRadioChange: function (e) {
        var checked = e.detail.value
        var changed = {}
        for (var i = 0; i < this.data.siteListItems.length; i++) {
            if (checked.indexOf(this.data.siteListItems[i].value) !== -1) {
                changed['siteListItems[' + i + '].checked'] = true
            } else {
                changed['siteListItems[' + i + '].checked'] = false
            }
        }
        this.setData(changed)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
          title: '获取位置信息~'
        })
        const _that = this;
        _that.getPoint(() => {
          _that.getLocationName(() => {
            _that.getWeatherInfo(() => {
              wx.hideLoading();
            });
          });
        });
    },
    // 获取坐标信息
    getPoint: function(callback) {
      const _that = this;
      wx.getLocation({
        success: function (res) {
          _that.setData({
            location: tools.formatLocation(res.longitude, res.latitude)
          });
          callback && callback();
        },
      });
    },
    // 获取位置信息
    getLocationName: function(callback) {
      const _that = this;
      // 调用接口获取地址信息
      bmap.regeocoding({
        success: function (res) {
          _that.setData({
            locationName: res.originalData.result.business
          });
          callback && callback();
        }
      });
    },
    // 获取天气信息
    getWeatherInfo: function(callback) {
      const _that = this;
      bmap.weather({
        success: function (res) {
          const _w = _that.dealWeatherData(res.currentWeather[0]);
          _that.setData({
            weather: _w
          });
          callback && callback();
        }
      });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    // 处理天气数据
    dealWeatherData: (data) => {
        let _date = data.date.split('(')[0];
        let _now = data.date.split('：')[1].replace(/[\(-\)]/g, '');
        let _result = {
            city: data.currentCity,
            pm25: data.pm25,
            date: _date,
            realtimeTemperature: _now,
            temperature: data.temperature,
            weather: data.weatherDesc,
            wind: data.wind,
            iconSrc: weather.weatherMoreLevel(data.weatherDesc)[0].src,
        };
        return _result;
    },

    formSubmit: function (e) {
        console.log(this.data);
        const _data = this.data;
        const _vals = e.detail.value;
        const _wx_openid = tools.getItem('userOpenId');
        const param = {
            wx_openid: _wx_openid, // 微信openID微信用户的标识
            city: _data.weather.city, // 城市，如：杭州市
            location: _data.locationName, // 具体位置
            weather: _data.weather, // 天气信息
            point: _data.location, // 地理经纬度
            remark: _vals.remark, // 备注
            mood: _vals.mood, // 心情
            type: _vals.type // 类型
        };
        ajax.ajaxPost(_url.addRecordUrl, param, res => {
            tools.successTip('添加成功');
            tools.redirectTo('list');
        });
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