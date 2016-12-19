## 与webpack的区别
webpack将资源打包输出到硬盘上，而webpack-dev-server将结果资源输出到内存，webpack会启动一个express服务，通过配置的host和端口可以访问前面所述的资源。

## 参数说明
```javascript
.
|____assets
|   |____archives
|   |____home.js
|   |____page.js
|   |____sidebar.js
|   |____main.js
|____loader.js
|____index.html
|____webpack.config.js

//以下是webpack.config.js中的内容
var _loaders = require("./loader");
var path = require("path");
var webpack = require("webpack");

//打包资源来源目录
var fromPath = path.join(__dirname,"/assets/");
//发布目录
var contentBase = path.join(__dirname,"/release/");

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
        host:"localhost"
        port: "9998"
    }
    ,module: {
        loaders: _loaders
    }
    ,debug:true
    ,plugins: [new webpack.HotModuleReplacementPlugin()]
}
```

当使用webpack命令启动这个配置时，会在根目录下生成一个release文件夹，output的资源都会输入到这个文件夹中。特别地，如果你使用了**copy-webpack-plugin**之类的插件，to的值相对的位置也是这个output的path。output这个节点有非常重要的意义，所有的输出配置都在此，其他地方只是些编译配置。

当使用webpack-dev-server启动时，所有资源会打包输出到内存，并绑定到devServer描述的端口上。这里需要特别注意的是**publicPath**,当此值被设置时，所有webpack输出的资源在访问时都需要通过此前缀路径。在上面的例子中，我们输出的main.bundle.js正确的访问路径是**localhost:9998/public/main.bundle.js**。

## demo
我基于上面的结构写了一个demo: