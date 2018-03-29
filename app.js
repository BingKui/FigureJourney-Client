//app.js
const config = require('./utils/config.js');
const _url = require('./utils/url.js');
const ajax = require('./utils/ajax.js');
const tools = require('./utils/tools.js');
App({
    onLaunch: function () {
        const _that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    const _opts = {
                        appid: config.AppId,
                        secret: config.AppSecret,
                        js_code: res.code,
                        grant_type: 'authorization_code'
                    };
                    ajax.ajaxWx(_url.WX_jscode2session, _opts, data => {
                        tools.setItem('userOpenId', data.openid);
                        _that.getUserInfo(data.openid);
                    });
                    const _ops = {
                        grant_type: 'client_credential',
                        appid: config.AppId,
                        secret: config.AppSecret
                    };
                    ajax.ajaxWx(_url.WX_token, _ops, data => {
                        tools.setItem('AccessToken', data.access_token);
                    });
                }
            }
        });
    },
    globalData: {
        userInfo: null
    },
    getUserInfo: function(openid) {
        const _that = this;
        // 获取用户信息
        wx.getSetting({
            success: _res => {
                if (_res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: info => {
                            // 可以将 res 发送给后台解码出 unionId
                            // 查询是否存在用户信息，不能存在就创建
                            ajax.ApiCloudGet(_url.userCount, {'wx_openid': openid}, count => {
                                if (count.count === 0) {
                                    // 用户不存在创建用户
                                    _that.createUser(openid, info.userInfo);
                                }
                            });
                            _that.globalData.userInfo = info.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (_that.userInfoReadyCallback) {
                              _that.userInfoReadyCallback(info)
                            }
                        }
                    });
                }
            }
        });
    },
    createUser: (openid, user) => {
        const param = {
            username: user.nickName,
            wx_openid: data.openid,
            password: '1234567',
            nickName: user.nickName,
            avatarUrl: user.avatarUrl,
            province: user.province,
            gender: user.gender,
            country: user.country,
            city: user.city
        };
        ajax.ajaxPost(_url.user, param, apiRes => {
            console.log(apiRes);
        });
    }
})