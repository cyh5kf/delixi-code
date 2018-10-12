const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
HtmlWebpackPlugin = require('html-webpack-plugin'),

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main'),
        vendor: ['vue', 'vue-router', 'vuex', 'lodash', 'iview', 'axios', 'moment', 'qs', 'history']
    },
    module: {
        rules: [
            {
                test: /.vue$/,
                use: [{
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                less: ExtractTextPlugin.extract({
                                    use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    }
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    name: './img/[name].[hash:8].[ext]',
                    limit: '1024'
                }
            },
            
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.less', '.json'],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'api': path.resolve(__dirname, './src/api'),
            'views': path.resolve(__dirname, './src/views'),
            'common': path.resolve(__dirname, './src/common')
        }
    },

    plugins: [

        //动态生成html插件
        new HtmlWebpackPlugin({
            // favicon:'./src/img/favicon.ico', //favicon路径
            template: path.join(__dirname, '../index.html'),
            inject: true, //允许插件修改哪些内容，包括head与body、
        }),

        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),

        //  Webpack 3中提供了如下的插件来允许开发者启用作用域提升特性来避免这种额外的性能损耗
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};