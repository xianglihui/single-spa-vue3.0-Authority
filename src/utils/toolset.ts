// 工具集
import { ComponentInternalInstance, getCurrentInstance } from "vue";

// 防抖
// const debounce = (fn: () => void, delay: number) => {
//   let timer = 0;
//   return () => {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(fn, delay);
//   };
// };
// 节流
const throttle = (fn: () => void, delay: number) => {
  let valid = true;
  return () => {
    if (!valid) {
      return false;
    }
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
};
// 修饰params
const getParams = (body: any = {}) => {
  let temp = `?`;
  for (const prop of Object.keys(body)) {
    temp += `${prop}=${body[prop]}&`;
  }
  return temp;
};
// 修复Vue3 getCurrentInstance与ts结合使用的问题
const useCurrentInstance = () => {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return {
    proxy,
  };
};
export { throttle, getParams, useCurrentInstance };
