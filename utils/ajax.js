const config = require('./config.js');
const _header = {
    'content-type': 'application/json',
    'X-APICloud-AppId': config.APICloud_AppId,
    'X-APICloud-AppKey': config.APICloud_AppKey
};

const WX_Request = (url, param, callback, methodType, header) => {
    wx.request({
        url,
        data: param,
        method: methodType || 'GET',
        header: header || {'content-type': 'application/json'},
        success: (res) => {
            if (typeof(callback) == "function") callback(res.data);
        },
        fail: (res) => {
            // 出错统一报错
        }
    });
};
const ajaxGet = (url, param, callback) => {
    return WX_Request(url, param, callback, 'GET', _header);
};

const ajaxPost = (url, param, callback) => {
    return WX_Request(url, param, callback, 'POST', _header);
};

const ApiCloudGet = (url, filter, callback) => {
    url = url + '?filter=' + encodeURIComponent(JSON.stringify(filter));
    ajaxGet(url, '', (data) => {
        if (typeof(callback) == "function") callback(data);
    });
};

module.exports = {
    ajaxWx: WX_Request,
    ajaxGet,
    ajaxPost,
    ApiCloudGet
};