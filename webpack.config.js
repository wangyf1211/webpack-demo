const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin=require('webpack-manifest-plugin')
const webpack=require('webpack')

module.exports = {
  entry: {
    app:'./src/index.js'
  },
  devtool:'inline-source-map',
  devServer:{
      contentBase:'./dist',
      port:1111,
      hot:true 
  },
  module:{
      rules:[
          {
            test:/\.css$/,
            use:['style-loader','css-loader']
          }
      ]
  },
  plugins: [
    new ManifestPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};