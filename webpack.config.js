/**
 * Created by Administrator on 2016/8/3.
 */
var webpack=require("webpack");
var path=require("path");
const ROOT_PATH = path.resolve(__dirname);
var ENTRY_PATH=path.resolve(ROOT_PATH,"entry");
var OUTPUT_PATH=path.resolve(ROOT_PATH,"build/js");
//https://zhangfeifei0907.github.io/me/build/index.html
//https://zhangfeifei0907.github.io/me/build/index.html#/page/20161112     发朋友圈


var ReactMarkdown = require('react-markdown');

module.exports = {
    entry:{
        app:[
            //'webpack-hot-middleware/client',
            ENTRY_PATH+"/app.js"],
        test:[
            //'webpack-hot-middleware/client',
            ENTRY_PATH+"/test.js"]
    },
    output: {
        path: OUTPUT_PATH,
        filename: "[name].bundle.js",
        publicPath: 'http://localhost:8080/'
    },
    //devtool: 'eval-source-map',
    cache: false,
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {  	test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['es2015', 'react']}
            },
            //{ test: /\.md$/, loader: "html!markdown" },
            { test: /\.json$/, loader: "json" },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), // recommanded by webpack
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin() // recommanded by webpack
    ],
     externals: {
         "jquery": "jQuery",//[,"./assets/src/vendor/jquery-1.9.1.min.js"]
         "react": "React",
         "react-dom": "ReactDOM"
         // "react-addons-css-transition-group":"react-addons-css-transition-group"
     }
};