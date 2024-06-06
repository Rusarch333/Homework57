'use strict';

/*
const options={
  classNames : ['actors', 'active'],
  attributes : {'title': 'actors', 'key':'value'},
  styles : {'color':'red'},
  events : {'click', handleClick}
}
*/

function createElement(tag, options, ...children) {
  const elem = document.createElement(tag);
  if (options.classNames) {
    elem.classList.add(...options.classNames);
  }
  if (options.attributes) {
    for (const titleAttr in options.attributes) {
      // titleAttr = 'title', titleAttr='key'
      elem.setAttribute(titleAttr, options.attributes[titleAttr]);
    }
  }
  if (options.events) {
    for (const titleEvent in options.events) {
      elem.addEventListener(titleEvent, options.events[titleEvent]);
    }
  }
  elem.append(...children);
  return elem;
}
