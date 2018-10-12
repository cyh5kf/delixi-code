var webpack = require('webpack');
    path = require('path');
    ExtractTextPlugin = require('extract-text-webpack-plugin');
    merge = require('webpack-merge');
    webpackBaseConfig = require('./webpack.config.base.js');

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: "[name].[chunkHash:8].js"
    },
    devtool: 'hidden-source-map',
    plugins: [

        new webpack.NoEmitOnErrorsPlugin(),

        new ExtractTextPlugin({
            filename: "[name].[contenthash:8].css",
            disable: false,
            allChunks: true
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        //压缩混淆JS插件,UglifyJsPlugin 将不再支持让 Loaders 最小化文件的模式。debug 选项已经被移除。Loaders 不能从 webpack 的配置中读取到他们的配置项。
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            comments: false,
            beautify: false,
            sourceMap: false
        })
    ]
});