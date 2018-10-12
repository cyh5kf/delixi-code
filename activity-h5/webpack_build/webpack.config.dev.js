var webpack = require("webpack"),
    merge = require('webpack-merge'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    baseWebpackConfig = require('./webpack.config.base'),
    serverConfig = require('./serverConfig'),
    path = require('path');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: "[name].js"
    },
    cache: true,
    //目前最流行的Source Maps选项是cheap-module-eval-source-map，这个工具会帮助开发环境下在Chrome/Firefox中显示源代码文件，其速度快于source-map与eval-source-map：
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './',
        publicPath: '/',
        historyApiFallback: true,
        host: "0.0.0.0",
        disableHostCheck: true,
        hot: true,
        inline: true,
        port: serverConfig.port,
        proxy: {
            '/index.php*': {
                // target: 'http://10.1.1.185',  //测试环境
                target: 'http://lactivity.51rz.com',  //线上环境
                secure: false,  //https，设置false
                changeOrigin: true,
                // pathRewrite: {'^/apiActivity/': ''}
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }]
    },

    plugins: [
        //热插拔
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),

        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
})
