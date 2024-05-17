// import { resolve } from 'path';

// const fs = require('fs');

// function pathResolve(dir: string) {
//   return resolve(process.cwd(), '.', dir);
// }

// export const getFolder = (path: any) => {
//   const components: Array<string> = [];
//   const files = fs.readdirSync(path);
//   files.forEach(function (item: string) {
//     const stat = fs.lstatSync(path + '/' + item);
//     if (stat.isDirectory() === true && item != 'components') {
//       components.push(path + '/' + item);
//       components.push(pathResolve(path + '/' + item));
//     }
//   });
//   return components;
// };

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