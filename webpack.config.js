var _loaders = require("./loader");
var path = require("path");
var webpack = require("webpack");
var Cp = require('copy-webpack-plugin');


//打包资源来源目录
var fromPath = path.join(__dirname,"/assets/");
//发布目录
var contentBase = path.join(__dirname,"/release/");
//复制index.html到output的根目录下
var _cp = new Cp([{
    from:path.join(__dirname,"/index.html")
    ,to:"./"
}])


module.exports = {
    entry: path.join(__dirname,"/assets/main.js"),
    output: {
        path: contentBase
        ,filename: "main.bundle.js"
        ,libraryTarget: 'umd'
        //请注意这个字段，使用webpack-dev-server的时候，访问资源的时候需要加上这个值
        ,publicPath:"/public/"
    }
    //开发服务器配置
    ,devServer: {
        contentBase: contentBase,
        port: "9998"
    }
    ,module: {
        loaders: _loaders
    }
    ,debug:true
    ,plugins: [_cp,new webpack.HotModuleReplacementPlugin()]
}
