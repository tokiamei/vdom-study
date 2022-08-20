import createElement from "./createElement";
import patchVnode from "./patchVnode";

// 判断是不是同一个 vnode
function checkSameNode(a, b) {
    return a.sel === b.sel && a.key ===b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
    // console.log('真实 DOM：', parentElm, '@@@@ oldCh:', oldCh, '@@@@ newCh:', newCh);

    // 旧前
    let oldStartIdx = 0
    // 旧后
    let oldEndIdx = oldCh.length - 1
    // 新前
    let newStartIdx = 0
    // 新后
    let newEndIdx = newCh.length - 1
    console.log(oldStartIdx, oldEndIdx, newStartIdx, newEndIdx);

    // 旧前节点
    let oldStartVnode = oldCh[0]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新前节点
    let newStartVnode = newCh[0]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]

    // 定义一个 keymap
    let keyMap
    // 开始 while 循环，注意：如果 while 中的指针没走到底，就会死循环
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

        // 要先判断一下 oldStartVnode 是否为 空
        // 这里一定要写 
        if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
            console.log('^^^^^^^^^^^^^^^^^^^^^^');
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
            console.log('^^^^^^^^^^^^^^^^^^^^^^');
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
            console.log('^^^^^^^^^^^^^^^^^^^^^^');
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
            console.log('^^^^^^^^^^^^^^^^^^^^^^');
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameNode(oldStartVnode, newStartVnode)) {
            // 新前与旧前
            console.log('新前与旧前命中');
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (checkSameNode(oldEndVnode, newEndVnode)) {
            // 新后与旧后
            console.log('新后与旧后命中');
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameNode(oldStartVnode, newEndVnode)) {
            // 新后与旧前
            console.log('新后与旧前命中');
            patchVnode(oldStartVnode, newEndVnode)
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameNode(oldEndVnode, newStartVnode)) {
            // 新前与旧后
            console.log('新前与旧后命中');
            patchVnode(oldEndVnode, newStartVnode)
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 如果四个都没命中，就寻找 key 的 map，制作一个 keyMap 的映射对象，这样就不用每次都遍历老节点
            // 这里别把下面代码也包含进去！！！！血的教训
            // 从 oldStartIdx 开始，到 oldEndIdx 结束，创建 keyMao 映射对象
            if (!keyMap) {
                keyMap = {}
                for (let i = oldStartIdx; i <= oldEndIdx; ++i) {
                    const key = oldCh[i].key
                    if (key) {
                        keyMap[key] = i
                    }
                }
            }
                console.log('KEMAPKEYMAPKEYMAP', keyMap);
                // 寻找这项(newStartIdx)这项在 keyMap 中的映射的位置序号
                const idxInOld = keyMap[newStartVnode.key]
                console.log('###################', idxInOld);

                // 判断 idxInOld 这个值是否存在，如果已经存在就去移动它，不存在就创建新节点
                if (idxInOld == undefined) {
                    // 如果 newStartVnode 在旧节点中找不到，就创建新节点
                    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', idxInOld);
                    parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
                    
                } else {
                    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$', idxInOld);
                    // 移动
                    const elmToMove = oldCh[idxInOld]
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = undefined
                    // 把这个节点移动到 oldStartVnode 的前面
                    parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
                    console.log('********************************');
                }
                newStartVnode = newCh[++newStartIdx]
            }
    console.log(oldStartIdx, oldEndIdx, newStartIdx, newEndIdx);

    }

    // 继续看看有没有剩余的，循环结束了 start 还是比 old 小
    if (newStartIdx <= newEndIdx) {
        console.log('new 还有剩余的节点需要添加！！！');
        // 插入的标杆
        const before = oldCh[oldStartIdx] == null ? null : oldCh[oldStartIdx].elm
        // console.log('-------------------', before);
        // 遍历新的 newCh ，添加到老的没有处理的之前
        for (let i = newStartIdx; i <= newEndIdx; ++i) {
            // insertBefore 方法可以自动识别 null，如果是 null 就会自动排到队尾。和 appendChild 是一致的
            console.log(before);
            parentElm.insertBefore(createElement(newCh[i]), before)
        }
    } else if (oldStartIdx <= oldEndIdx) {
        console.log('old 中还有残余节点需要删除');
        for (let i = oldStartIdx; i <= oldEndIdx; ++i) {
            if (oldCh[i]) {
                console.log('需要删除的节点：', oldCh[i].elm);
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }
}