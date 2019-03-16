import {cube} from './math.js'
import printMe from './print.js'
import './style.css'

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