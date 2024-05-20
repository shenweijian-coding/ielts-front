import { defineStore } from 'pinia';
import { login as userLogin, logout as userLogout, getUserProfile, saveConfig, updateConfig } from '@/api/user/index';
import { setToken, clearToken } from '@/utils/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    phone_number: {},
    password: '',
    created_at: '',
    updated_at: '',
    session_ids: '',
    config: {
      play_speed: '1.0', // 播放速度
      play_interval: 5, //播放间隔
      phonetic_type: 1, // 发音  1：英音 2：美音
      repetitions: 1, // 重复次数
      error_sound: 1, //错误音效是否开启
      is_disorderly: 0, // 是否乱序
    },
  }),
  persist: {
    storage: sessionStorage,
  },
  getters: {
    userProfile(state) {
      return { ...state };
    },
    token(state) {
      return state.session_ids;
    },
    getConfig(state) {
      return state.config;
    },
  },
  actions: {
    // switchRoles() {
    //   return new Promise((resolve) => {
    //     this.role = this.role === 'user' ? 'user' : 'admin';
    //     resolve(this.role);
    //   });
    // },
    // 设置用户的信息
    setInfo(partial) {
      this.$patch(partial);
    },
    persist: {
      storage: sessionStorage,
    },
    // 保存用户的听写配置
    async saveUserConfig() {
      return saveConfig(this.$state.config);
    },
    // 重置用户信息
    resetInfo() {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('app');
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile();
      console.log(result);

      this.setInfo(result);
    },
    async handleConfig(p, val) {
      this.config[p] = val;
      updateConfig({
        ...this.config,
      });
    },
    // 异步登录并存储token
    async login(loginForm) {
      this.resetInfo();
      const result = await userLogin(loginForm);

      const token = result?.session_ids;
      if (token) {
        setToken(token);
      }
      this.setInfo(result);

      return result;
    },
    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
      // 路由表重置
      location.reload();
    },
  },
});
