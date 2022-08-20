import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";

  // 创建 patch 函数
  const patch = init([classModule, propsModule, styleModule, eventListenersModule])
  // console.log(patch);

  // 创建虚拟节点
/*   const myVnode01 = h('a', { 
    props: { 
      href: 'https://www.tokiame.love',
      target: '_blank' // 在新标签页中打开
     } }, '时雨')
  
  const myVnode02 = h('div', {
    class: { 'box': true }
  }, '我是一个小盒子') */
  
  // 嵌套使用 h 函数
  const myVnode03 = h("div", [
    h('div', '我是儿子标签'),
    h('div', '我是儿子标签'),
    h('div', '我是儿子标签'),
    h('div', '我是儿子标签')
  ])

  // 让虚拟节点上树
  const container = document.getElementById("container")

  // 一个容器只能让一个节点上树
  patch(container, myVnode03)