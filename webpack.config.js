const path=require('path')

module.exports={
    entry:{
       index:'./src/index.js',
       search:'./src/search.js' 
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    mode:'production'
}