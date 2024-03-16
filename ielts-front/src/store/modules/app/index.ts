import { defineStore } from 'pinia';
import piniaStore from '@/store/index';
import { AppState } from './types';

export const useAppStore = defineStore(
  // 唯一ID
  'app',
  {
    state: () => ({
      theme: '',
      dictationInfo: null,
      errWords: null
    }),
    getters: {
      chapterId(state) {
        return state?.dictationInfo?.currentChapter.id
      }
    },
    actions: {
      updateSettings(partial: Partial<AppState>) {
        this.$patch(partial);
      },

      // Change theme color
      toggleTheme(dark: boolean) {
        if (dark) {
          this.theme = 'dark';
          document.documentElement.classList.add('dark');
        } else {
          this.theme = 'light';
          document.documentElement.classList.remove('dark');
        }
      },
      setChapterInfo(data) {
        this.dictationInfo = data
      },
      async toggleCurrentChapter(data) {
        this.dictationInfo.currentChapter = data
      },
      async setErrWords(data) {
        this.errWords = data
      }
    },
    persist: {
      enabled: true,
      storage: sessionStorage, // 存储方式
    },
  },
);

export function useAppOutsideStore() {
  return useAppStore(piniaStore);
}
