var path = require('path');
var webpack=require('webpack');
var vue=require('vue-loader');
module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    watch:true,
    module: {
        // 加载器
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            { test: /\.less$/, loader: 'style!css!autoprefixer!less'},
            { test: /\.scss$/, loader: 'style!css!autoprefixer!sass'},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
            { test: /\.(html|tpl)$/, loader: 'html-loader' }
        ]
    },
    vue: {
        loaders: {
            css: 'style!css!autoprefixer!less!sass'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue','.css'],
        // 别名
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        },
        modulesDirectories: [
            'node_modules'
        ]
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    devtool: '#source-map'
};
