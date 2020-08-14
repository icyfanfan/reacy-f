import { render } from './render';
// Hooks
// 利用数组缓存
let memorizedState = [];
let cursor = 0;

// 模拟 useState
export const useState = (initialValue) => {
  memorizedState[cursor] = memorizedState[cursor] || initialValue;
  // 利用闭包缓存对应的下标
  const currentCursor = cursor;
  console.log('useState', cursor, memorizedState);

  const setState = (newValue) => {
    memorizedState[currentCursor] = newValue;
    console.log('setState', currentCursor, memorizedState);
    cursor = 0;
    render();
  }

  return [
    memorizedState[cursor++],
    setState,
  ]
};

// 模拟 useEffect
export const useEffect = (callback: Function, deps: Array<any>) => {
  const hasNodeps = !deps;
  const curDeps = memorizedState[cursor];
  const hasChanged = curDeps ? !curDeps.every((e, i) => e === deps[i]) : true ;
  if (hasNodeps || hasChanged) {
    callback();
    memorizedState[cursor] = deps;
  }
  console.log('useEffect', cursor, memorizedState);
  cursor ++;
}
