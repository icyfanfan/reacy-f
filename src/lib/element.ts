import type { VDOM } from './types';

// 创建虚拟DOM
export function createElement (type, props, ...childrens) : VDOM {
    // todo 特殊处理，绑定事件之类的
  return {
    type,
    props: {
      ...props,
      children: [...childrens],
    }
  }
}