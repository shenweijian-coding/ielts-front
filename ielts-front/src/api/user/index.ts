// 权限问题后期增加
import { get, post } from '@/utils/http/axios';
// import axios from 'axios';
enum URL {
  login = '/api/study/customer/v1/login',
  logout = '/api/study/customer/v1/logout',
  profile = '/user/profile',
  sendyzm = '/api/study/phone/send/sms',
  signup = '/api/study/customer/v1/signup',
  updateConfig = '/api/study/customer/v1/update/config',
}
interface LoginRes {
  token: string;
}

export interface LoginData {
  phone_number: string;
  password: string;
}

const getUserProfile = async () => get({ url: '/user/getUserInfo' });
const login = async (data: LoginData) => post<any>({ url: URL.login, data });
const logout = async () => post<LoginRes>({ url: URL.logout });
const saveConfig = async (data) => post({ url: '/user/saveConfig', data });
const sendyzm = async (data) => post({ url: URL.sendyzm, data });
const signup = async (data) => post({ url: URL.signup, data });
const updateConfig = async (data) => post({ url: URL.updateConfig, data });
export { getUserProfile, logout, login, saveConfig, sendyzm, signup, updateConfig };
