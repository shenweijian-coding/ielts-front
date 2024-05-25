import { defineStore } from 'pinia';
import piniaStore from '@/store/index';

export const useAppStore = defineStore(
  // 唯一ID
  'app',
  {
    state: () => ({
      theme: '',
      dictationInfo: null,
      errWords: null,
      isContinuePlay: false,
    }),
    persist: {
      storage: sessionStorage,
    },
    getters: {
      chapterId(state) {
        return state?.dictationInfo?.currentChapter?.id;
      },
    },
    actions: {
      updateSettings(partial) {
        this.$patch(partial);
      },

      // Change theme color
      toggleTheme(dark) {
        if (dark) {
          this.theme = 'dark';
          document.documentElement.classList.add('dark');
        } else {
          this.theme = 'light';
          document.documentElement.classList.remove('dark');
        }
      },
      updateContinuePlayStatus(data) {
        this.isContinuePlay = data;
      },
      setChapterInfo(data) {
        this.dictationInfo = data;
      },
      async toggleCurrentChapter(data) {
        this.dictationInfo && (this.dictationInfo.currentChapter = data);
      },
      async setErrWords(data) {
        this.errWords = data;
      },
      async setLastId(data) {
        this.dictationInfo.currentChapter.last_id = data;
      },
    },
  },
);

export function useAppOutsideStore() {
  return useAppStore(piniaStore);
}
