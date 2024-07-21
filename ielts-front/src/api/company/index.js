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

//
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
};
