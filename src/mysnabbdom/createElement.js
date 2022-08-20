/* // 真正创建节点，将 vnode 创建为 DOM，孤儿节点，不进行插入
export default function createElement(vnode) {
    // 创建一个 DOM 节点，这个节点现在还是孤儿节点，不进行插入
    let domNode = document.createElement(vnode.sel)
    // 有子节点还是有文本 ？
    if (vnode.text != '' && (vnode.children === undefined || vnode.children === [])) {
        // console.log(vnode.text);
        // 它内部是文字
        domNode.innerText = vnode.text
        // 补充 elm 属性
        vnode.elm = domNode
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 它内部是子节点，就要递归创建节点
        for (let i = 0, len = vnode.children.length; i < len; ++i) {
            // 创建出每一个 child 的 DOM，一旦调用 createElement 意味着：创建出 DOM 了，并且它的 elm 顺序ing指向了创建出的 DOM，但是还没有上树，是一个孤儿节点
            let cDOM = createElement(vnode.children[i])
            // console.log(cDOM);
            domNode.appendChild(cDOM)
        }
        vnode.elm = domNode
    }

    // 返回 elm，是一个纯 DOM 对象
    return vnode.elm
} */

/* 
    2022年7月31日12:37:52
    练习 创建元素
*/

export default function createElement(vnode) {
    let domNode = document.createElement(vnode.sel)
    // 判断有子节点还是文本
    if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
        // 把文本渲染到 DOM 上
        domNode.innerText = vnode.text
        vnode.elm = domNode
    } else if (Array.isArray(vnode.children)) {
        vnode.children.forEach((item) => {
            // 创建出它的 DOM，一旦调用 createElement 意味着：创建出 DOM 了，并且它的 elm 属性指向了它的 DOM 节点
            domNode.appendChild(createElement(item))
            vnode.elm = domNode
        })
    }
    return vnode.elm
}