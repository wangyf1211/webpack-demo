import {cube} from './math.js'
import printMe from './print.js'
import './style.css'

if(process.env.NODE_ENV!=='production'){
  console.log('这边不是在prod环境呢')
}
function component() {
  var element = document.createElement('pre');
  element.innerHTML=[
    'hello webpack!',
    '5 cubed is equal to '+cube(5)
  ].join('\n\n')
  
  return element;
}
let element=component()
document.body.appendChild(element);