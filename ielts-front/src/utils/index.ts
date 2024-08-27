export const shuffleArray = (array: any) => {
  let newArray = array.slice(); // 创建原始数组的副本
  for (let i = newArray.length - 1; i > 0; i--) {
    // 生成一个从 0 到 i 的随机索引
    let j = Math.floor(Math.random() * (i + 1));
    // 交换 newArray 中的元素
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return null;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj; // 原始类型直接返回

  if (hash.has(obj)) return hash.get(obj); // 处理循环引用

  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

export function replaceWithBr(str = '') {
  return str.replace(/([^\s&])\s([A-Za-z]+)\./g, function (match, p1, p2) {
    if (p1 !== '&') {
      return p1 + '<br>' + p2 + '.';
    }
    return match;
  });
}