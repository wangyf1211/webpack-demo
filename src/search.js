'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './search.css'

class Search extends React.Component{
    render(){
        return <div class="search-text">Search Text</div>
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