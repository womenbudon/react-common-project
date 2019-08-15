const path = require('path');

const SRC_PATH = path.join(__dirname, 'src');
const cookie =
  'connect.sid=s%3AQWopV1Jlp3IH_Ctj-eCM_BfA_Raj5i2k.vBnyG2wD2XlsRbdwkjXnfnJLcXp%2FKLxOn2oxoz7TUHM';

module.exports = {
  proxy: [
    // {
    //   context: ['/iotapp', '/oasisapp/ace'],
    //   target: 'https://oasisrdapp.h3c.com',
    //   secure: false,
    //   onProxyReq: function(proxyReq, req, rsp) {
    //     proxyReq.setHeader('cookie', cookie);
    //   }
    // }
  ],
  antdTheme: {
    "primary-color": "#3bc1c4",
    "border-radius-base": "4px",
    "font-size-base": "14px"
  }
};
