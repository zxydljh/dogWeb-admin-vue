const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8891,
    open: true,
    hot:true,
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        ws: false,
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
