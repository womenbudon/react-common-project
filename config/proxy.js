/**
 * 代理配置
 *  配置代理远程api
 *  配置mock数据调整
 */
export default proxyConfig = {
    devServer: {
        proxy: {
          '/api': {
            target: 'http://www.baidu.com/',
            pathRewrite: {'^/api' : ''},
            changeOrigin: true,     // target是域名的话，需要这个参数，
            secure: false,          // 设置支持https协议的代理
          },
        }
      }
}