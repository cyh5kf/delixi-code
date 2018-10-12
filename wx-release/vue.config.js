// vue.config.js
const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/css/base.scss'),
      ],
    })
}

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    },
    devServer: {
        // 设置主机地址
        host: '0.0.0.0',
        // 设置默认端口
        port: 3005,
        // 设置代理
        proxy: {
            '/apiApp': {
                // target:'http://10.1.14.7:8088',//杨光伟
                target:'https://m.51rz.com/apiApp',//线上环境
                // target:'http://devm.51rz.com/apiApp',//dev环境
                // target:'http://testm.51rz.com/apiApp',//test环境
                // target:'http://10.1.1.171:300/1/app',//存管1.0环境
                 //target:'https://mobile.51rz.com/apiApp',//演练环境
                changeOrigin: true,
                secure: true,
                pathRewrite: {
                    '^/apiApp': ''
                }
            }
        }
    }
}