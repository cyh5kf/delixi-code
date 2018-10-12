const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

// const prod = process.env['NODE_ENV'] === 'production';
// console.log("env: " + (!prod ? 'development' : 'production'));

module.exports = {
    entry: {
        main: ["babel-polyfill",'./src/index.jsx'],
        login:["babel-polyfill",'./src/login.jsx']
    },
    output: {
        path: path.resolve(__dirname, './target'),
        publicPath: "/",
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/Components/'),
            api: path.resolve(__dirname, 'src/Api/'),
            less: path.resolve(__dirname, 'src/Less/'),
            utils: path.resolve(__dirname, 'src/Utils/Utils.js'),
            Utils: path.resolve(__dirname, 'src/Utils'),
            icomoon: path.resolve(__dirname, 'src/icomoon/style.css'),
            iconfont: path.resolve(__dirname, 'src/iconfont/iconfont.css'),
            page: path.resolve(__dirname, 'src/Pages/'),
            // constants: prod
            //     ? path.resolve(__dirname, 'src/constants/system-profile-prod.json')
            //     : path.resolve(__dirname, 'src/constants/system-profile-dev.json'),
        },
        extensions: ['.js', '.jsx','css','less'],
    },
    // devtool: 'source-map',
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'env', 'react','stage-0'],
                            plugins: ['transform-runtime',["import", {
                                "libraryName": "antd-mobile"
                            }
                            ]],
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:'css-loader'
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['css-loader','postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)(\?[\s\S]+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '/assets/',
                            outputPath: 'assets/'
                        },
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: '[name].[ext]',
                    publicPath: '/fonts/',
                    outputPath: 'fonts/'
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/[name].[chunkhash].css', disable: false, allChunks: true }),
        new HtmlWebpackPlugin({
            minify: false,
            // hash: prod,
            template: './src/index.html',
            chunks:['main'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            minify: false,
            // hash: prod,
            template: './src/index.html',
            chunks:['login'],
            filename:'login.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "target"),
        publicPath: "/",
        quiet: false,
        hot: true,
        disableHostCheck: true,
        historyApiFallback: {
            index: '/index.html'
        },
        host: '0.0.0.0',
        proxy:{
            // '/view':'/index.html',
            // '/rest':{
            //     target: 'http://39.106.212.120:8080',
            //     // pathRewrite:{'^/rest':'rest/inventory-service'}
            // },
            '/rest/inventory-service':{
                target: 'http://192.168.2.39:8081',
                pathRewrite:{'/rest/inventory-service':''}
            },
            '/api':{
                target: 'http://test1.jwsmed.com:90',
            },

        }

    }
};
