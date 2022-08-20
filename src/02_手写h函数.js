import h from "./mysnabbdom/h"

// const myVnode01 = h('div', {}, '文字')
// const myVnode01 = h('div', {}, [])
// const myVnode01 = h('div', '文字')
/* const myVnode03 = h("div", {}, [
    h('div', {}, '我是儿子标签'),
    h('div', {}, '我是儿子标签'),
    h('div', {}, [
        h('div', {}, '我是儿子标签'),
        h('div', {}, '我是儿子标签'),
    ]),
    h('div', {}, '我是儿子标签')
  ]) */

  const myVnode04 = h('div', {}, h('p', {}, [
    h('div', {}, '我是儿子标签'),
    h('div', {}, '我是儿子标签'),
  ]))
console.log(myVnode04);

const container = document.getElementById('container')
patch(container, myVnode04)