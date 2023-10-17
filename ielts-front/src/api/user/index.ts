// 权限问题后期增加
import { get, post } from '@/utils/http/axios';
// import axios from 'axios';
enum URL {
  login = '/user/login',
  logout = '/user/logout',
  profile = '/user/profile',
}
interface LoginRes {
  token: string;
}

export interface LoginData {
  username: string;
  password: string;
}

const getUserProfile = async () => get({ url: '/user/getUserInfo' });
const login = async (data: LoginData) => post<any>({ url: URL.login, data });
const logout = async () => post<LoginRes>({ url: URL.logout });
const saveConfig = async (data) => post({ url: '/user/saveConfig', data })
export { getUserProfile, logout, login, saveConfig };
