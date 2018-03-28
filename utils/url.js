// 接口地址统一管理
const _url = 'https://d.apicloud.com/mcm/api';
module.exports = {
    WX_jscode2session: 'https://api.weixin.qq.com/sns/jscode2session',
    WX_token: 'https://api.weixin.qq.com/cgi-bin/token',
    user: _url + '/user',
    userCount: _url + '/user/count',
    userCreate: _url + '',
    addRecordUrl: _url + '/record',
    getRecordList: _url + '/record',
};