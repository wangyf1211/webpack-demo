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

### 依赖图
一个文件依赖另一个文件，两个文件之间就有<mark>依赖关系</mark>

### webpack构建的典型应用程序或站点中，有三种主要的代码类型

1. 你或你的团队编写的源码。
2. 你的源码会依赖的任何第三方的library或vendor代码
3. webpack的<code>runtime</code>和<code>manifest</code>，管理所有模块的交互

### target
不支持向<code>target</code>传入多个字符串，可以通过打包两份分离的配置来创建同构的库



### 添加图片之后

    Version: webpack 4.29.6
    Time: 2356ms
    Built at: 2019-03-15 19:33:08
    Asset      Size  Chunks             Chunk Names
    bundle.js  76.7 KiB       0  [emitted]  main
    d4224c3cf01a393d7b139d948b84808a.png  1.46 KiB          [emitted]  
    Entrypoint main = bundle.js
    [0] ./src/icon.png 82 bytes {0} [built]
    [2] ./src/index.js 493 bytes {0} [built]
    [3] (webpack)/buildin/global.js 472 bytes {0} [built]
    [4] (webpack)/buildin/module.js 497 bytes {0} [built]
    [5] ./src/style.css 1.06 KiB {0} [built]
    [6] ./node_modules/css-loader/dist/cjs.js!./src/style.css 407 bytes {0} [built]
        + 5 hidden modules
