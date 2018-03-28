const SHA1 = require('./SHA1.js');
const now = Date.now();

module.exports = {
  AppId: 'wx46175db5f9b16f90',
  AppSecret: '6ad88495ff436f0b0cb160f60340b0d1',
  baiduAK: 'g4I2oOxpdnhxmuQwYaDrrLayDqZBft78',
  APICloud_AppId: 'A6075310347246',
  APICloud_AppKey: SHA1("A6075310347246" + "UZ" + "B032099A-D582-97AE-9EFD-97035235F07F" + "UZ" + now) + "." + now,
};