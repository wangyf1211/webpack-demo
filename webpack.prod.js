const webpack=require('webpack')
const merge=require('webpack-merge')
const UglifyJSPlugin=require('uglifyjs-webpack-plugin')
const common=require('./webpack.base.js')

module.exports=merge(common,{
    devtool:'source-map',
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify('production')
        })
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }
})