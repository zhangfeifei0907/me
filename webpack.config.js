/**
 * Created by Administrator on 2016/8/3.
 */
var webpack=require("webpack");
var path=require("path");
const ROOT_PATH = path.resolve(__dirname);
var ENTRY_PATH=path.resolve(ROOT_PATH,"entry");
var OUTPUT_PATH=path.resolve(ROOT_PATH,"build/js");
//https://zhangfeifei0907.github.io/me/build/

module.exports = {
    entry:{
        index:[
            'webpack-hot-middleware/client',
            ENTRY_PATH+"/index.js"]
    },
    output: {
        path: OUTPUT_PATH,
        filename: "[name].bundle.js",
        publicPath: 'http://localhost:8080/'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {  	test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['es2015', 'react']}
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), // recommanded by webpack
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin() // recommanded by webpack
    ]
    // externals: {
    //     "jquery": "jQuery",//[,"./assets/src/vendor/jquery-1.9.1.min.js"]
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    //     // "react-addons-css-transition-group":"react-addons-css-transition-group"
    // }
};