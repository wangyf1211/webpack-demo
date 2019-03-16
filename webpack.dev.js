const merge=require('webpack-merge')
const common=require('./webpack.base.js')
const webpack=require('webpack')

module.exports=merge(common,{
    devtool:'source-map',
    devServer:{
        contentBase:'./dist',
        port:1111,
        hot:true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
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