const config = require('./config.js');

const tip = (text, type) => {
    wx.showToast({
        title: text,
        icon: type,
        duration: 1500
    });
};

module.exports = {
    // 设置值
    setItem: (key, data) => {
        wx.setStorage({
            key,
            data,
            fail: () => {
                module.exports.setItem(key, data);
            }
        })
    },
    // 获取值
    getItem: (key) => {
        try {
            return wx.getStorageSync(key)
        } catch (e) {
            module.exports.getItem(key);
        }
    },
    // 格式化地理位置信息
    formatLocation: (longitude, latitude) => {
        if (typeof longitude === 'string' && typeof latitude === 'string') {
            longitude = parseFloat(longitude)
            latitude = parseFloat(latitude)
        }

        longitude = longitude.toFixed(2)
        latitude = latitude.toFixed(2)

        return {
            longitude: longitude.toString().split('.'),
            latitude: latitude.toString().split('.')
        }
    },
    navTo: (name) => {
        wx.navigateTo({
            url: '../' + name + '/' + name
        });
    },
    redirectTo: (name) => {
      wx.redirectTo({
        url: '../' + name + '/' + name,
      });
    },
    successTip: (text) => {
        tip(text, 'success');
    },
    hideTip: () => {
        wx.hideToast();
    },
};