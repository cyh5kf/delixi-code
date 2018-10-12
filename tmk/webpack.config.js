const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const prod = process.env['NODE_ENV'] === 'production';
// console.log("env: " + (!prod ? 'development' : 'production'));

module.exports = {
    mode: 'development',
    entry: {
        main: ["babel-polyfill", './src/index.jsx'],
        login: ["babel-polyfill", './src/login.jsx'],
    },
    output: {
        path: path.resolve(__dirname, './target'),
        publicPath: "/",
        filename: '[name].[hash].js',
        chunkFilename: "[name].js"
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/Components/'),
            api: path.resolve(__dirname, 'src/Api/'),
            less: path.resolve(__dirname, 'src/Less/'),
            utils: path.resolve(__dirname, 'src/Utils/utils.js'),
            Utils: path.resolve(__dirname, 'src/Utils'),
            icomoon: path.resolve(__dirname, 'src/icomoon/style.css'),
            iconfont: path.resolve(__dirname, 'src/iconfont/iconfont.css'),
            page: path.resolve(__dirname, 'src/Pages/'),
            // constants: prod
            //     ? path.resolve(__dirname, 'src/constants/system-profile-prod.json')
            //     : path.resolve(__dirname, 'src/constants/system-profile-dev.json'),
        },
        extensions: ['.js', '.jsx', 'css', 'less'],
    },
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'env', 'react', 'stage-0'],
                            plugins: ['transform-runtime', ["import", {
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','postcss-loader']
                }),

            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','postcss-loader', 'less-loader']
                })

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
        new ExtractTextPlugin({filename: 'css/[name].[hash].css', allChunks: true}),
        new HtmlWebpackPlugin({
            minify: false,
            // hash: prod,
            template: './src/index.html',
            chunks: ['main','vendor','react','react-dom','moment'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            minify: false,
            // hash: prod,
            template: './src/index.html',
            chunks: ['login','vendor','react','react-dom','moment'],
            filename: 'login.html'
        })
    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                'react': {
                    chunks: "initial",
                    name: "react",
                    test:/react/,
                    priority:10,
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                'moment': {
                    chunks: "initial",
                    name: "moment",
                    test:/moment/,
                    priority:12,
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                'react-dom': {
                    chunks: "initial",
                    name: "react-dom",
                    priority:11,
                    test:/react-dom/,
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
};
