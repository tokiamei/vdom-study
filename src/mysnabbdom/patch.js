import vnode from './vnode.js'
import createElement from './createElement.js';
import patchVnode from './patchVnode.js';
export default function(oldVnode, newVnode) {
    // 判断传入的第一个参数，是 DOM 节点还是 Vnode 节点
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        // 如果不是 vnode，就把 原节点 变成 vnode
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
        // console.log('@@@@@', oldVnode);
    }

    // 判断 oldVnode 与 newVnode 是不是同一个虚拟节点
    if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
        console.log('patch 函数：是同一个节点');
        patchVnode(oldVnode, newVnode)
    } else {
        console.log('不是同一个节点，暴力插入新的，删除旧的', oldVnode, newVnode);
        let newVnodeElm = createElement(newVnode)
        // 插入旧节点之前
        // 判断父节点是否存在，新节点 elm 属性是否存在，不用判断父节点是否存在也可以
        if (newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
            // 删除旧节点
            oldVnode.elm.parentNode.removeChild(oldVnode.elm)
        }
    }
}



// 练习
// 2022年7月31日12:37:43
/* export default function(oldVnode, newVnode) {
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
        console.log('是同一个节点');
    } else {
        console.log('不是同一个节点，暴露插入新节点，再删除旧节点');
        const newVnodeElm = createElement(newVnode)
        oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        // 删除旧节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
} */