'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './search.less'
import pika from './pika.jpeg'

class Search extends React.Component{
    render(){
        return <div class="search-text">The content of Search Text <a href="http://www.baidu.com">link</a>
        <img src={pika} alt="pika" /></div>
    }
}
ReactDom.render(
    <Search/>,
    document.getElementById('root')
)
// export function search(){
//     return 'search'
// }
// export function swap(){
//     let a=3,b=5
//     let tmp=a
//     a=b
//     b=tmp
//     document.write(b,a)
// }