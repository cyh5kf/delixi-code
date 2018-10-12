let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path');
let glob = require('glob');
let autoprefixer = require('autoprefixer');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
let HtmlWebpackPlugin =require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const baseConfig = require('./base-config.js');

const ENTRY_PATH = './src/page/';


//个人中心只打包member/index文件   member下的其它文件不打包  避免浪费打包性能
module.exports = function () {
    console.log('env:', process.env.NODE_ENV);
    let env = process.env.NODE_ENV || 'dev';

    let files = []

    let getEntries = function (root) {
        var entryFiles = glob.sync(root + '**/*.{js,jsx}');
        var map = {};
        for (var i = 0; i < entryFiles.length; i++) {
            var filePath = entryFiles[i].substring(ENTRY_PATH.length, entryFiles[i].lastIndexOf('\.'));
            if(/^member\/.*/.test(filePath) ){
                if(filePath=='member/index'){
                    map[filePath] = [entryFiles[i]];
                    files.push(filePath)
                }
            }else{
                files.push(filePath)
                map[filePath] = [entryFiles[i]];
            }
        }
        return map;
    }

    //公共配置
    let commonConfig = {
        mode: env == 'dev'? 'development': 'production',
        entry: getEntries(ENTRY_PATH),
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: env == 'dev'? './js/[name].js' :'./js/[name].min.[hash:8].js',
            publicPath: '/',
            chunkFilename: env == 'dev'? './js/chunk/[name]-[id].common.js': './js/chunk/[name]-[id].common.js?[chunkhash:8]'//非主文件的命名规则
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                        use: {
                                loader: 'css-loader',
                                options: {
                                    modules: true,//css模块化
                                    minimize: true,
                                    import: true,
                                    localIdentName: '[name]_[local]_[hash:base64:8]'
                                }
                            }
                },
                {
                    test: /\.scss$/,
                    use:ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                minimize: true,
                                import: true,
                                localIdentName: '[name]_[local]_[hash:base64:8]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                import: true,
                                modules: true
                            }
                        }],
                    })
                },
                {test: /\.json$/, loader: 'json-loader'},
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    // use:['babel-loader']
                    use: {
                        loader: 'happypack/loader?id=happyBabel',
                    }
                },
                {
                    test: /\.(png|jpe?g|eot|svg|ttf|woff2?)$/,
                    loader: 'url-loader?name=image/[name].[ext]',
                    options: {
                        limit: 8000
                    }
                }
            ],
        },
        resolve: {
            modules: [path.resolve(__dirname, './src'), 'node_modules'],
            extensions: ['.jsx','.scss','.js' ,'.css'],
            alias: {
                '@': path.resolve(__dirname, './src'),
                // 'apiConfig': path.resolve(__dirname, './src/api/mockApiConfig.js'),
                'apiConfig': path.resolve(__dirname, './src/api/onLineApiConfig.js'),
            }
        },
    };

    // 公共plugins
    let plugins = [
        // 提取css文件
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].css',
            allChunks: true // 一开始所有css都打包
        }),

        new HappyPack({
            //用id来标识 happypack处理那里类文件
          id: 'happyBabel',
          //如何处理  用法和loader 的配置一样
          loaders: [{
            loader: 'babel-loader?cacheDirectory=true',
          }],
          //共享进程池
          threadPool: happyThreadPool,
          //允许 HappyPack 输出日志
          verbose: true,
        }),
        // new HappyPack({
        //     //用id来标识 happypack处理那里类文件
        //   id: 'happyScss',
        //   //如何处理  用法和loader 的配置一样
        //   loaders: ['style-loader',
        //   {
        //       loader: 'css-loader',
        //       options: {
        //           modules: true,
        //           minimize: true,
        //           import: true,
        //           localIdentName: '[name]_[local]_[hash:base64:8]'
        //       }
        //   },
        //   {
        //       loader: 'postcss-loader',
        //   },
        //   {
        //       loader: 'sass-loader',
        //       options: {
        //           import: true,
        //           modules: true
        //       }
        //   },
        // ],
        //   //共享进程池
        //   threadPool: happyThreadPool,
        //   //允许 HappyPack 输出日志
        //   verbose: true,
        // }),
    ]

    files.forEach((item)=>{
        var plugin = new HtmlWebpackPlugin({
            // 生成出来的html文件名
            filename: item + '.html',
            // 每个html的模版，这里多个页面使用同一个模版
            template: './src/index.html',
            // 自动将引用插入html
            inject: true,
            // 每个html引用的js模块，也可以在这里加上vendor等公用模块
            chunks: [item,'common-css-js']
        });
        plugins.push(plugin)
    })

    //开发环境配置
    let devConfig = {
        devtool: 'cheap-module-source-map',//cheap-module-source-map  source-map  eval

        plugins: plugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new OpenBrowserPlugin({url: `http://localhost:${baseConfig.port}/index.html`})
        ])
    }


    //生产环境配置
    let prodConfig = {
        plugins: plugins.concat([
            new CleanWebpackPlugin(
                ['dist/*'],　     //匹配删除的文件
                {
                    root: __dirname,       　　　　　　　　　　//根目录
                    verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                    dry: false        　　　　　　　　　　//启用删除文件
                }
            ),
            // new CopyWebpackPlugin([
            //     {from: path.resolve(__dirname, './static'), to: './static'},
            // ]),
            // new webpack.optimize.UglifyJsPlugin({//代码压缩
            //     comments: false,//显示注释
            //     mangle: false,//取消代码混淆
            //     compress: {
            //         warnings: false//在UglifyJs删除没有用到的代码时不输出警告
            //     }
            // }),
            new ParallelUglifyPlugin({//代码压缩
                workerCount: 4,
                uglifyJS: {
                    output: {
                        beautify: false, // 不需要格式化
                        comments: false // 保留注释
                    },
                    compress: { // 压缩
                        warnings: false, // 删除无用代码时不输出警告
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            }),
            new webpack.DefinePlugin({//避免打包后出现警告的问题
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),

        ]),
    };

    return Object.assign(commonConfig, env == 'dev' ? devConfig : prodConfig);

}

