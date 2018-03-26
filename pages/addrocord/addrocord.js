// pages/addrocord/addrocord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { src: '../../images/1.png', name: '1', value: '美国' },
      { src: '../../images/2.png', name: '2', value: '中国', checked: 'true' },
      { src: '../../images/3.png', name: '3', value: '巴西' },
      { src: '../../images/4.png', name: '4', value: '日本' },
      { src: '../../images/5.png', name: '5', value: '英国' },
      { src: '../../images/6.png', name: '6', value: '法国' },
    ],
    hidden: false
  },
  radioChange: function (e) {
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