
import { getStudentList, updateStudentInfo, delStudent, getInviteCode, getStudenErrWords } from '@/api/company/index';
import { ElMessage } from 'element-plus';

function useInvite() {

  // 复制企业的邀请链接
  const getCode = () => {
    getInviteCode().then((res) => {
      if (res.code && res.sign) {
        copyUrl(`${window.location.origin}/#/company/join?code=${res.code}&sign=${res.sign}`)
      }
    });
  };

  const getInviteClass = (class_id) => {
    getInviteCode({
      type: 'school_class',
      foreign_id: class_id,
    }).then((res) => {
      copyUrl(`${window.location.origin}/#/jc?code=${res.code}&sign=${res.sign}`)
    });
  };

  // 复制文本到剪贴板的方法
  const copyUrl = (copyText) => {
    var textareaC = document.createElement('textarea');
    textareaC.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
    textareaC.value = copyText;
    document.body.appendChild(textareaC); //将textarea添加为body子元素
    textareaC.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaC); //移除DOM元素
    ElMessage.success('复制成功，快去分享吧！');
  };
  return {
    getCode,
    copyUrl,
    getInviteClass
  }
}

export {
  useInvite
}