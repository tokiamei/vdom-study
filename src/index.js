import h from "./mysnabbdom/h"
import patch from './mysnabbdom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

// const myVnode01 = h('ul', {}, 'sssss')
const myVnode01 = h('ul', {}, [
  h('li', { key: 'A' }, `A`),
  h('li', { key: 'B' }, `B`),
  h('li', { key: 'C' }, `C`),
  h('li', { key: 'D' }, `D`),
  
  
])
/* 
  h('li', { key: 'K' }, `K`),
  h('li', { key: 'H' }, `H`),
  h('li', { key: 'X' }, `X`),
    h('li', { key: 'K' }, `K`),
  h('li', { key: 'Q' }, `Q`),
  h('li', { key: 'O' }, `O`),
*/
patch(container, myVnode01)

const myVnode02 = h('ul', {}, [
  h('li', { key: 'A' }, `A`),
  h('li', { key: 'B' }, `B`),
  h('li', { key: 'C' }, `C`),
  h('li', { key: 'D' }, `D`),
  h('li', { key: 'Q' }, `Q`),
  h('li', { key: 'H' }, `H`),

])
// const myVnode02 = h('ul', {}, 'sssss')

btn.addEventListener('click', () => {
  patch(myVnode01, myVnode02)
})