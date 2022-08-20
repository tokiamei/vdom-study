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

  const container = document.getElementById('container')
  const btn = document.getElementById('btn')

  const myVnode01 = h("div", {}, [
    h('div', { key: 'A' }, 'A'),
    h('div', { key: 'B' }, 'B'),
    h('div', { key: 'C' }, 'C'),
    h('div', { key: 'D' }, 'D')
  ])
  patch(container, myVnode01)
  const myVnode02 = h("div", {}, [
    // h('div', { key: 'E' }, 'E'),
    h('div', { key: 'B' }, 'B'),
    h('div', { key: 'D' }, 'D'),
    h('div', { key: 'A' }, 'A'),
    h('div', { key: 'C' }, 'C'),
  ])

  btn.onclick = () => patch(myVnode01, myVnode02)

  