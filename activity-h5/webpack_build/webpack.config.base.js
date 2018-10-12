var path = require('path'),
    webpack = require("webpack"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../src/index.js'),
        vendor: ['react', 'react-dom', 'react-router-dom', 'underscore', 'antd', 'axios', 'history', 'moment', 'qs', 'classnames']
    },
    module: {
        rules: [
            {
                test: /\.js$/, //用babel编译jsx和es6
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/, //处理css文件中的背景图片
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    name: './static/imgs/[name].[hash:8].[ext]',
                    limit: '8192'//当图片大小小于这个限制的时候，会自动启用base64编码图片。减少http请求,提高性能
                }
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './static/fonts/[name].[hash:8].[ext]',
                    }
                }]
            }]
    },
    resolve: {
        //注意一下, extensions webpack2第一个不是空字符串! 对应不需要后缀的情况.
        extensions: ['.js', '.json', '.sass', '.less', 'jsx'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components'),
            'utils': path.resolve(__dirname, '../src/utils'),
            'api': path.resolve(__dirname, '../src/api')
        }
    },

    plugins: [
        //动态生成html插件
        new HtmlWebpackPlugin({
            // favicon:'./src/img/favicon.ico', //favicon路径
            template: path.join(__dirname, '../index.html'),
            inject: true, //允许插件修改哪些内容，包括head与body
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),

        new ExtractTextPlugin({
            filename: "[name].[contenthash:8].css",
            disable: false,
            allChunks: true
        }),

        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),

        //  Webpack 3中提供了如下的插件来允许开发者启用作用域提升特性来避免这种额外的性能损耗
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}
