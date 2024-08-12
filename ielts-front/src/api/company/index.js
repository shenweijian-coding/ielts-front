import { get, post } from '@/utils/http/axios';

// 获取邀请码 { type: enterprise:企业  school_class: 班级}
const getInviteCode = async (data) => post({ url: '/api/study/enterprise/v1/get/invite/code', data });

//新增企业 enterprise_name: 企业昵称 name: 用户昵称
const addEnterpriseInfo = async (data) => post({ url: '/api/study/enterprise/v1/add', data });

// 加入企业 name: 用户昵称 code 邀请码  sign：签名
const joinEnterprise = async (data) => post({ url: '/api/study/enterprise/v1/invite', data });

// 获取角色列表
const getRoles = async (data) => post({ url: '/api/study/enterprise/v1/get/role', data });

// 获取员工列表
const getManagerList = async (data) => post({ url: '/api/study/enterprise/v1/manager/list', data });

// 修改角色列表
const updateManagerRole = async (data) => post({ url: '/api/study/enterprise/v1/manager/role/update', data });

// 员工移除
const delManager = async (data) => post({ url: '/api/study/enterprise/v1/manager/delete', data });

// 修改员工权限
const updateManagerPermission = async (data) => post({ url: '/api/study/enterprise/v1/manager/permission/update', data });

// 获取学生列表
const getStudentList = async (data) => post({ url: '/api/study/enterprise/v1/class/student/list', data });

//获取邀请用户的信息
const getInviteInfo = async (data) => post({ url: '/api/study/enterprise/v1/get/invite/info', data });

// 获取班级列表
const getClassList = async (data) => post({ url: '/api/study/enterprise/v1/class/list', data });

// 修改用户备注
const updateStudentInfo = async (data) => post({ url: '/api/study/enterprise/v1/class/update/student/info', data });

// 删除班级学生
const delStudent = async (data) => post({ url: '/api/study/enterprise/v1/class/update/student/info', data });

// 上传词书 资源库
const enterpriseUpload = async (data) => post({ url: '/api/study/enterprise/v1/upload/book', data });

// 资源库编辑
const updateBook = async (data, id) => post({ url: '/api/study/enterprise/v1/upload/book/update/' + id, data });

// 新建班级
const addClass = async (data) => post({ url: '/api/study/enterprise/v1/class/add', data });

// 上传班级词书
const uploadClassBook = async (data) => post({ url: '/api/study/enterprise/v1/class/upload/book', data });


// 学生错词列表
const getStudenErrWords = async (data) => post({ url: '/api/study/enterprise/v1/class/student/error/list', data });

// 退出班级
const classLogout = (data) => post({ url: '/api/study/enterprise/v1/class/logout', data });
export {
  getInviteCode,
  addEnterpriseInfo,
  joinEnterprise,
  getRoles,
  getManagerList,
  updateManagerRole,
  delManager,
  updateManagerPermission,
  getStudentList,
  getInviteInfo,
  getClassList,
  updateStudentInfo,
  delStudent,
  enterpriseUpload,
  addClass,
  uploadClassBook,
  getStudenErrWords,
  classLogout,
  updateBook
};
