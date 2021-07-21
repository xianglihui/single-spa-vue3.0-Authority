// 工具集
const debounce = (fn: () => void, delay: number) => {
  let timer = 0;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
};

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

export { debounce, throttle };
