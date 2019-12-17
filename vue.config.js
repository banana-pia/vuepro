const path = require('path')
const px2rem = require('postcss-px2rem')
// 配置postcs-px2rem
const postcss = px2rem({
  remUnit: 37.5   //基准大小 baseSize，需要和rem.js中单位rem值占比一样相同
})

module.exports = {
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },
  // runtimecompiler:true,//tmemplant的语法解析
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components')
      }
    }
  },
  devServer:{
    proxy:{
      '/api':{
        target:"http://localhost:4000",
        pathRewrite:{
          "^/api":""
        },
        changeOrigin:true,
      }
    }
  }
}