import createElement from "./createElement";
import updateChildren from "./updateChildren";

/* 
    该函数用于让代码更清晰~~
*/
export default function patchVnode(oldVnode, newVnode) {
    // 判断新旧 vnode 是否是同一个对象 ？【困惑：同一个节点和和同一个对象不是一个概念吗 ？】
    if (oldVnode === newVnode) return 
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        // 如果新节点中的 text 和老节点的 text 不同，那么直接让新的 text 写入老的 elm 中即可，如果老节点中 elm 有 chidren，也会被抹掉
        if (oldVnode.text !== newVnode.text) {
            console.log(oldVnode.text, newVnode.text);
            oldVnode.elm.innerText = newVnode.text
        }
    } else {
        console.log('新节点没有 text 属性, 但是有子节点');
        // 判断老节点是否有子节点
        if (oldVnode.children === undefined || oldVnode.children.length === 0) {
            console.log('老节点没有子节点');

            // 老节点没有子节点,就先清空文本,并把新节点的子节点挂上去
            let newVnodeElm = createElement(newVnode)
            // console.log(oldVnode.text);
            oldVnode.elm.innerText = ''
            oldVnode.elm.appendChild(newVnodeElm)
        } else {
            console.log('老节点有子节点');
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)

            // 如下方法不好使，所以采用【命中查找的方法】 ~~~~
            // 遍历新节点，看看老节点再新节点中是否存在
            // for (let i = 0, lenNew = newVnode.children.length; i < lenNew; ++i) {
            //     let isExsit = false
            //     let index = 0
            //     for (let j = 0, lenOld = oldVnode.children.length; j < lenOld; ++j) {
            //         if (newVnode.children[i].sel === oldVnode.children[j].sel && newVnode.children[i].key === oldVnode.children[j].key) {
            //             isExsit = true
            //             index = j
            //         }
            //     }
            //     if (!isExsit) {
            //         const newDom = createElement(newVnode.children[i])
            //         console.log(i);
            //         // 直接在 oldVnode 的 elm 的子元素上添加就完事了
            //         // oldVnode.elm.insertBefore(newDom, oldVnode.elm.children[oldVnode.elm.children.length])
            //         oldVnode.elm.insertBefore(newDom, oldVnode.elm.children[i])
            //     } else {
            //         /* 这个地方需要判断原有的子节点和新节点子节点位置是否一致 */
            //         if (index !== i) {
            //             console.log(oldVnode.elm.children[index], oldVnode.elm.children[i]);
            //             // oldVnode.elm.insertBefore(oldVnode.elm.children[index], oldVnode.elm.children[i])
                        
            //         }
            //     }
            // }
            
        }
    }
}