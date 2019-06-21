const path=require('path')
const webpack=require('webpack')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')

module.exports={
    entry:{
       index:'./src/index.js',
       search:'./src/search.js' 
    },
    output:{
        filename:'[name]_[chunkhash:8].js',
        path:path.resolve(__dirname,'dist')
    },
    mode:'production',
    module:{
        rules:[
            {
                test:/.js$/,
                use:'babel-loader'
            },
            {
                test:/.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        name:'[name]_[hash:8][ext]'
                    }
                }]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css'
        })
    ]
}