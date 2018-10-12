const merge = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseWebpackConfig = require('./webpack.config');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const Dashboard = require('webpack-dashboard');
const path = require('path');

// const dashboard = new Dashboard();
console.log("env: " +  'production');
module.exports = merge(baseWebpackConfig, {

    // devtool: 'source-map',
    plugins: [
        // new DashboardPlugin(dashboard.setData),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ],
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, "./target"),
        publicPath: "/",
        quiet: false,
        hot: true,
        port:9000,
        disableHostCheck: true,
        historyApiFallback: {
            index: '/index.html'
        },
        host: '0.0.0.0',
        proxy: {
            // '/view':'/index.html',
            // '/rest':{
            //     target: 'http://39.106.212.120:8080',
            //     // pathRewrite:{'^/rest':'rest/inventory-service'}
            // },
            // '/rest/inventory-service': {
            //     target: 'http://192.168.2.39:8081',
            //     pathRewrite: {'/rest/inventory-service': ''}
            // },
            '/api': {
                target: 'http://ltmk.51rz.com',
                changeOrigin: true,
                pathRewrite:{'^/api':'/index.php'}
            },

        }

    }
});
