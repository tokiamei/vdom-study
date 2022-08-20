import vnode from "./vnode"

/* 编写一个低配版的 h 函数，这个函数必须接收三个参数，缺一不可。
    相当于重载功能较弱的版本。
    调用的必须是 以下三种形态之一

    【1】h('div', {}, '文字')
    【2】h('div', {}, [])
    【3】h('div', {}, h())
*/

export default function(sel, data, c) {
    if (arguments.length !== 3) throw new Error(`对不起，您输入的参数个数小于3，我们是低配版的 h 函数~~~`)
    if (typeof c == 'string' || typeof c == 'number') {
        // 【1】模式
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        // 【2】模式
        let children = []
        // 遍历 c，收集
        c.forEach( item => {
            if (!typeof item === 'object' && item.hasOwnProperty('sel')) {
                throw new Error('传入的第三个参数类型不对')
            } else {
                children.push(item)
            }
        })
        // 收集完毕【返回 vnode】
        // console.log(children)
        return vnode(sel, data, children, undefined, undefined)
    } else if (c instanceof Object && c.hasOwnProperty('sel')) {
        // 【3】模式
        let children = [c]
        return vnode(sel, data, children, undefined, undefined)

    } else {
        throw new Error('传入的第三个参数类型不对')
    }
}