// pages/addrocord/addrocord.js
// 引入腾讯地图
const BMap = require('../../lib/bmap.js');
const config=  require('../../utils/config.js');
const utils = require('../../utils/util.js');
const weather = require('./util.js');
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
    radioItems: [
      { src: '../../images/1.png', name: '1', value: '普通', checked: 'true' },
      { src: '../../images/2.png', name: '2', value: '开心' },
      { src: '../../images/3.png', name: '3', value: '大笑' },
      { src: '../../images/4.png', name: '4', value: '伤心' },
      { src: '../../images/5.png', name: '5', value: '惊讶' },
      { src: '../../images/6.png', name: '6', value: '发怒' },
    ],
    siteListItems: [
      { src: '../../images/site_1.svg', name: 'site_1', value: '徒步', checked: 'true' },
      { src: '../../images/site_2.svg', name: 'site_2', value: '餐厅' },
      { src: '../../images/site_3.svg', name: 'site_3', value: '酒店' },
      { src: '../../images/site_4.svg', name: 'site_4', value: '景区' },
      { src: '../../images/site_5.svg', name: 'site_5', value: '场馆' },
      { src: '../../images/site_6.svg', name: 'site_6', value: '公园' },
    ],
    hidden: false
  },
  moodRadioChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
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
      if (checked.indexOf(this.data.siteListItems[i].name) !== -1) {
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
    const _that = this;
    // 调用接口获取地址信息
    bmap.regeocoding({
      success: function (res) {
        console.log('jieguo:', res);
        _that.setData({
          locationName: res.originalData.result.business
        });
      }
    });
    // 获取天气信息
    bmap.weather({
      success: function (res) {
        const _w = _that.dealWeatherData(res.currentWeather[0]);
        console.log('天气', _w);
        _that.setData({
          weather: _w
        });
      }
    });
    wx.getLocation({
      success: function(res) {
        console.log('当前地理位置', res);
        _that.setData({
          location: utils.formatLocation(res.longitude, res.latitude)
        });
        
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  // 处理天气数据
  dealWeatherData: (data) => {
    let _date = data.date.split('(')[0];
    let _now = parseInt(data.date.split('：')[1].replace(/[\(-\)]/g, '')) + '°';
    let _result = {
      city: data.currentCity,
      pm25: data.pm25,
      date: _date,
      realtimeTemperature: _now,
      temperature: weather.dealTemperature(data.temperature),
      weather: data.weatherDesc,
      wind: data.wind,
      iconSrc: weather.weatherMoreLevel(data.weatherDesc)[0].src,
    };
    return _result;
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