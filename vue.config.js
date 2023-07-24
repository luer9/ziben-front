const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-demo/'
  : '/',
  css: { extract: false },
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
        args[0].title = '《资本论》汉英术语知识库';
        return args
    })},
  // 前后端 服务没有运行在同一个主机上时，可以采用代理配置.
  devServer: {
      port: 8080, // 
      host: '0.0.0.0', //默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，代表可以被外界访问
      https: false, // 
      open: true, // 构建完成之后，用系统默认的浏览器打开网页
      proxy: {
        '/api': {
         // proxy会拦截所有url中可以成功匹配到 ‘/api’ 的请求
          target:  'http://localhost:9090',
          // target: 'http://192.168.0.6:9090', // 目标接口的域名
          changOrigin: true, // 是否跨域
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
}
