import type { VDOM } from './types';

const REGEXP = {
    EVENT: /^on[a-zA-Z]+/,
}

// 记录当前组件树
const ComponentsTrees = [];
export const render = () => {
  ComponentsTrees.forEach((root, index) => {
    const {
      funcComponent,
      props,
      container,
    } = root;
    mount(container, funcComponent, props, index);
  })
}

// 挂载到DOM
export const mount = (container: HTMLElement, funcComponent: Function, props: Object, index?: number) => {
    const vDOMObj = funcComponent(props);
    const newRoot = {
      funcComponent,
      props,
      container,
    };
    // 省略 diff 和 patch
    // 新增或更新根节点
    if (index !== undefined) {
        ComponentsTrees.splice(index, 1, newRoot);
    } else {
        ComponentsTrees.push(newRoot);
    }

    renderComponent(container, vDOMObj);
    return funcComponent;
}

// 渲染组件
const renderComponent = (container: HTMLElement, vDOMObj: VDOM) : void => {
    let { type, props } = vDOMObj;
    let { children } = props;
    let newDOMElement = document.createElement(type);
    // 分类处理props
    for (let attr in props) {
        // 类
        if (attr === 'className') {
            newDOMElement.className = props.className;
        // 样式
        } else if (attr === 'style') {
            const styleObj: object = props.style;
            for(let key in styleObj) {
                if(styleObj.hasOwnProperty(key)) {
                    newDOMElement.style[key] = styleObj[key];
                }
            }
        // 事件
        } else if (REGEXP.EVENT.test(attr)){
            const type = attr.slice(2).toLowerCase();
            newDOMElement.addEventListener(type, props[attr]);
        // children
        } else if (attr === 'children') {
            children.forEach(child => {
                // 文本节点
                if (typeof child === 'string') {
                    const newTextNode = document.createTextNode(child);
                    newDOMElement.appendChild(newTextNode);
                } else {
                    renderComponent(newDOMElement, child)
                }
            });
        } else {
            newDOMElement.setAttribute(attr, props[attr]);
        }
    }
    const childNodes = container.childNodes;
    childNodes?.forEach(child => {
        container.removeChild(child);
    })
    container.appendChild(newDOMElement);
}