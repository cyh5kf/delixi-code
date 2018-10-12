module.exports = {
    devServer: {
        // 设置主机地址
        host: '0.0.0.0',
        // 设置默认端口
        port: 8080,
        // 设置代理
        proxy: {
            '/api': {
                // 目标 API 地址
                target: 'https://mobile.51rz.com/apiApp',//演练
                // target: 'http://10.1.20.198:3001/app',//演练
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: false,
                pathRewrite: {
                    '^/apiApp': ''
                }
            }
        }
    }
}
