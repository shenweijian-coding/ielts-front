// 权限问题后期增加
import { get, post } from '@/utils/http/axios';

const getUserProfile = async () => post({ url: '/api/study/customer/v1/login/msg' });
const login = async (data) => post({ url: '/api/study/customer/v1/login', data });
const logout = async () => post({ url: '/api/study/customer/v1/logout' });
const saveConfig = async (data) => post({ url: '/user/saveConfig', data });
const sendyzm = async (data) => post({ url: '/api/study/phone/send/sms', data });
const signup = async (data) => post({ url: '/api/study/customer/v1/signup', data });
const updateConfig = async (data) => post({ url: '/api/study/customer/v1/update/config', data });

export { getUserProfile, logout, login, saveConfig, sendyzm, signup, updateConfig };
