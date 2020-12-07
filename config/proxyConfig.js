module.exports = {
  '/api': {
    target: 'http://localhost:8000/', // 设置你调用的接口域名和端口号
    changeOrigin: true,     // 跨域
    pathRewrite: {
      '^/api': '/api'
    }
  },
}
