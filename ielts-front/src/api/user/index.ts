// 权限问题后期增加
import { get, post } from '@/utils/http/axios';
// import axios from 'axios';
enum URL {
  login = '/api/study/customer/v1/login',
  logout = '/user/logout',
  profile = '/user/profile',
  sendyzm = '/study/phone/send/sms',
  signup = '/study/customer/v1/signup'
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
const saveConfig = async (data) => post({ url: '/user/saveConfig', data })
const sendyzm = async (data) => post({ url: URL.sendyzm, data })
const signup = async (data) => post({ url: URL.signup, data })
export { getUserProfile, logout, login, saveConfig, sendyzm, signup };
