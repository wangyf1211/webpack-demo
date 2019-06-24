### Webpack概念
现代JavaScript应用程序的静态模块打包器(module bundler)。
> 递归构建依赖关系图

四个核心概念：
    
    入口(entry)
    输出(output)
    loader
    插件(plugins)

### 入口
入口起点(entry point)指示webpack应该使用哪个模块，作为构建内部依赖图的开始。进入入口起点后，webpack找出哪些模块和库是入口起点依赖的。
通过配置webpack.config.js配置entry属性，指定入口起点，默认<code>.src</code>
```
module.exports={
    entry:'./path/to/my/entry/file.js'
};
```

### 出口
output属性指明输出创建的bundles的路径，以及如何命名这些文件，默认值是<code>./dist</code>
```
const path = require('path');//操作文件路径

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

### loader
让webpack处理非JavaScript文件，可以将所有类型的文件转换为webpack能够处理的有效模块，然后利用webpack的打包能力，对他们进行处理。

> loader 将所有类型的文件，转换为应用程序的依赖图（和最终的bundle）可以直接引用的模块

loader的两个目标：
    
    test属性，标出应该被对应的loader进行转换的某个或某些文件
    use属性，表示进行转换时，应该使用哪个loader

```
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```
> 表示的是遇到require()/import语句中被解析为.txt的路径时，对其打包前，先用raw-loader转换

### 插件
插件功能极其强大，可以处理各种各样的任务

> 使用插件，<code>require()</code>它，然后添加到<code>plugins</code>数组中

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

### 模式 mode
通过mode来设置<code>development</code>和<code>production</code>，设置mode参数，启动相应模式下的优化
```
module.exports={
    mode:'production'
};
```
在production模式下设置<code>process.env.NODE_ENV</code>值为<code>production</code>，开启<code>FlagDependencyUsagePlugin</code>,<code>FlagIncluedChunksPlugin</code>，<code>ModuleConcatenationPlugin</code>,
<code>NoEmitOnErrorsPlugin</code>,<code>OccurrenceOrderPlugin</code>,<code>SideEffectsFlagPlugin</code>和<code>TerserPlugin</code>

在development模式下设置<code>process.env.NODE_ENV</code>值为<code>development</code>，开启<code>NamedChunksPlugin</code>和<code>NamedModulesPlugin</code>

### 依赖图
一个文件依赖另一个文件，两个文件之间就有<mark>依赖关系</mark>

### webpack构建的典型应用程序或站点中，有三种主要的代码类型

1. 你或你的团队编写的源码。
2. 你的源码会依赖的任何第三方的library或vendor代码
3. webpack的<code>runtime</code>和<code>manifest</code>，管理所有模块的交互

### target
不支持向<code>target</code>传入多个字符串，可以通过打包两份分离的配置来创建同构的库


### 安装配置babel

    npm i @babel/core @babel/preset-env babel-loader -D
  
添加.babelrc配置文件

### loader转JSX

  .babelrc配置添加<code>@babel/preset-react</code>

### file-loader & url-loader

  url-loader包括file-loader，有个limit参数，小于limit的使用base64编码，可以减少请求数，大于limit的还是使用file-loader

### webpack watch文件监听的原理分析
轮询判断文件的最后编辑时间是否变化

某个文件发生变化并不会立刻告诉监听者，先缓存起来，等<code>aggregatetimeout</code>

```
module.export={
  //默认为false
  watch:true,
  watchOptions:{
    //默认为空，不监听的文件或文件夹，支持正则匹配
    ignored:/node_modules/,
    //监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout:300,
    //判断文件是否发生变化是通过不断询问系统指定文件有没有变化实现的，默认每秒问1000次
    poll:1000
  }
}
```

### 热更新
通过webpack-dev-server(简称WDS)和HotModuleReplacementPlugin插件

通过npm i webpack-dev-server -D和引入webpack自带的HMP

此外，使用webpack-dev-middleware将webpack输出的文件传输给服务器，适用于灵活的定制场景
```
const express=require('express')
const webpack=require('webpack')
const webpackDevMiddleware=require('webpackDevMiddleware')
const app=express()
const config=require('./webpack.config.js')
const compiler=webpack(config)

app.use(webpackDevMiddleware(compiler,{
  publicPath:config.output.publicPattth
}))

app.listen(3000,function(){
  console.log('Example app listening on port 3000!\n')
})
```
#### 热更新的原理分析
webpack compiler: 将JS编译成Bundle
HMR server: 将热更新的文件输出给HMR Runtime
Bundle server: 提供文件在浏览器的访问
HMR Runtime: 会被注入到浏览器，更新文件的变化
bundle.js: 构建输出的文件
  
  HMR server在服务器端, HMR Runtime在客户端，server检测到文件变化之后，就会以json的形式传给客户端，所以不需要刷新浏览器


### 文件指纹
打包后输出的文件名的后缀，用于做版本管理

#### 如何生成呢
1. hash:和整个项目的构建相关，只要项目文件修改，整个项目构建的hash值就会更改
2. chunkhash：和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
3. contenthash：根据文件内容来定义hash，文件内容不变，则contenthash不变

#### JS、CSS、图片的文件指纹设置
通过设置output的filename，使用\[chunkpath\]

示例：
<code>filename:'[name][chunkhash:8].js'</code>

对于CSS文件，一般通过css-loader和style-loader作用之后会生成style标签插入到头部，所以没有独立的css文件，对此可以使用MiniCssExtractPlugin的filename

npm i mini-css-extract-plugin -D

```
plugins:[
  new MiniCssExtractPlugin({
    filename:'[name][contenthash:8].css
  })
]
```

对于图片
```
module:{
  rules:[
    {
      test:/\.(png|jpg|jpeg|svg|gif)$,
      use:[{
        loader:'file-loader',
        options:{
          name:'img/[name][hash:8].[ext]'//[ext]表示资源后缀名
        }
      }]
    }
  ]
}
```
这里的hash其实是指contenthash,默认使用md5生成,默认有32位

### 文件压缩
对于js压缩，通过内置的uglifyjs-webpack-plugin

可以进行配置，配置并行压缩

#### css文件的压缩
使用optimize-css-assets-webpack-plugin同时使用cssnano预处理器

npm i optimize-css-assets-webpack-plugin

```
plugins:[
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp:/\.css$/g,
    cssProcessor:require('cssnano')//按需加载
  })
]
```

#### html文件的压缩
修改html-webpack-plugin，设置压缩参数
```
plugins:[
  new HtmlWebpackPlugin({
    template:path.join(__dirname,'src/search.html'),
    filename:'search.html',
    chunks:['search'],
    inject:true,
    minify:{
      html5:true,
      collapseWhitespace:true,
      preserveLineBreaks:false,
      minifyCSS:true,
      minifyJS:true,
      removeComments:false
    }
  })
]
```

### 清理构建目录
rm -rf ./dist && webpack

或者使用clean-webpack-plugin默认删除output指定的目录

注意⚠️

    const { CleanWebpackPlugin } from 'clean-webpack-plugin'
    plugins:[
      new CleanWebpackPlugin()//配置见https://www.npmjs.com/package/clean-webpack-plugin
    ]