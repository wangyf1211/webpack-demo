import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello')

  var myIcon=new Image();
  myIcon.src=Icon;

  element.appendChild(myIcon);

  var ele=document.createElement('div')
  ele.style.width='100px'

  element.appendChild(ele);
  
  console.log(Data)

  return element;
}

document.body.appendChild(component());
