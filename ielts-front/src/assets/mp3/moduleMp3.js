// moduleMp3.js

const modulesFiles = import.meta.globEager("./*.mp3"); // 导入同级目录mp3下面所有的wav文件
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  // console.log(modulePath);
  const moduleName = modulePath.slice(2,3); // 文件名即为key名，方便引用时匹配
  const value = modulesFiles[modulePath];
  modules[moduleName] = value.default;
  return modules;
}, {});
// 所有的语音文件都存入 modules
export {
  modulesFiles,
  modules
}
