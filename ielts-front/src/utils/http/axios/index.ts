import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { showMessage } from './status';
import { IResponse } from './type';
import { ElMessage } from 'element-plus';
import { clearToken } from '@/utils/auth';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  withCredentials: true
});

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = getToken();
    // if (token) {
    //   config.headers.authorization = `${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// axios实例拦截响应
service.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      console.log(response, 'response');
      
      if (response.data.status == 401) {
        const userStore = useUserStore();
        const router = useRouter()
        userStore.logout()
        clearToken()
        router.replace('/login')
      }
      if (response.data.status) {
        ElMessage.error(response.data.message);
        return Promise.reject(response.data);
      }

      // 统一处理 失败问题
      return response;
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);
      return Promise.reject(response.data);
    }
    showMessage('网络连接异常,请稍后再试!');
  },
);

const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve,reject) => {
    service.request<any, AxiosResponse<IResponse>>(conf).then((res: AxiosResponse<IResponse>) => {
      const { data } = res || {};

      resolve(data.values as T);
    }).catch(err => reject(err));
  });
};

export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' });
}

export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' });
}

export function put<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'put' });
}

export function del<T = any>(config: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'delete' });
}

export default request;
