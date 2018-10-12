var webpack = require("webpack"),
    path = require('path'),
    merge = require('webpack-merge'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    baseWebpackConfig = require('./webpack.config.base');

process.env.BABEL_ENV='production';

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: "[name].[chunkHash:8].js"
    },
    devtool: 'hidden-source-map',
    module: {
        rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader"
                },
                {
                    loader: 'autoprefixer-loader'
                }]
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader"
                },
                {
                    loader: 'autoprefixer-loader'
                },{
                    loader: 'less-loader'
                }]
            })
        }]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BABEL_ENV: JSON.stringify('production')
            }
        }),

        //loader的最小化文件模式将会在webpack 3或者后续版本中被彻底取消掉.为了兼容部分旧式loader，你可以通过 LoaderOptionsPlugin 的配置项来提供这些功能。
        new webpack.LoaderOptionsPlugin({
            minimize: true
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
})
