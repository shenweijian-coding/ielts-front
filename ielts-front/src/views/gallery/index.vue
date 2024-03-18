<template>
  <div class="relative mb-auto mt-auto flex w-full flex-1 flex-col overflow-y-auto px-30">
    <div class="mt-20 flex w-full flex-1 flex-col justify-center overflow-y-auto">
      <!-- tab切换 -->
      <!-- <div style="height: 10rem"> -->
      <!-- <el-affix :offset="14"> -->
      <el-tabs v-model="galleryState.activeTab" @tab-click="handleTabClick" class="flex h-20 w-full items-center justify-between pb-6">
        <el-tab-pane :name="item.id" v-for="item in galleryState.languageList" :key="item.id">
          <template #label>
            <img :src="galleryState.languageIcon[item.id]" alt="" />&nbsp;
            <span class="text-lg"> {{ item.name }} </span>
          </template>
        </el-tab-pane>
      </el-tabs>
      <!-- </el-affix> -->
      <!-- </div> -->
      <div class="flex-1 overflow-y-auto">
        <div class="mt-10">
          <!-- 选项 -->
          <div class="flex items-center space-x-4">
            <div
              v-for="(item, index) in galleryState.sceneList"
              :key="index"
              class="cursor-pointer whitespace-nowrap rounded-[3rem] px-4 py-2 false border-color-theme"
              :class="galleryState.currentScene == item.id ? 'bg-theme text-white' : 'bg-white text-black hover:bg-theme_hover'"
              @click="handleSceneSel(item)"
              ><span class="font-normal">{{ item.name }}</span></div
            >
          </div>
          <!-- <el-radio-group v-model="galleryState.activeType" size="large">
      <el-radio-button
        :label="item.title"
        :value="item.id"
        v-for="(item, index) in galleryState.tabs[galleryState.activeTab].childs"
        :key="index"
        class="pr-10 border"
      />
    </el-radio-group> -->

          <!-- 书籍 -->
          <div class="flex mt-8 px-1 pb-4 flex-wrap">
            <div
              v-for="item in galleryState.booksList"
              :key="item.id"
              class="group flex h-36 w-80 cursor-pointer items-center justify-center overflow-hidden rounded-lg p-4 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 mr-10 mb-10"
              @click="openChapter(item)"
            >
              <div class="relative ml-1 mt-2 flex h-full w-full flex-col items-start justify-start"
                ><h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:color-theme dark:text-gray-200">{{ item.name }}</h1
                ><p class="mb-3 max-w-full truncate textdelayDuration-gray-600 dark:text-gray-200 whitespace-nowrap" data-state="closed">{{
                  item.remarks
                }}</p>
                <p class="mb-2 font-bold text-gray-600 dark:text-gray-200">{{ item.word_total }} 词</p>
                <p class="mb-0.5 font-bold text-gray-600 dark:text-gray-200" v-if="item.chapter_total">{{ item.chapter_total }} 章</p>
                <div class="flex w-full items-center pt-2"
                  ><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" /></div
              ></div>
            </div>
          </div>
        </div>
      </div>
      <ChapterDialog ref="ChapterDialogRef" />
    </div>
  </div>
  <LastPage />
</template>
<script setup>
  import ChapterDialog from './chapter-dialog.vue';
  import yg from '@/assets/images/yg.png';
  import rb from '@/assets/images/rb.png';
  import LastPage from '@/components/lastPage/index.vue';
  // import dg from '@/assets/images/dg.png';

  import { getSceneList, getGroupBooks, getChapterList, getLanguageList } from '@/api/book/index';

  const ChapterDialogRef = ref(null);

  const galleryState = reactive({
    sceneList: [],
    currentScene: 1,
    booksList: [],
    chapterList: [],
    languageList: [],
    languageIcon: {
      1: yg,
      2: rb,
    },
    activeTab: 1,
    activeType: 0,
  });

  const openChapter = (item) => {
    getChapterList({ g_id: item.id }).then((res) => {
      galleryState.chapterList = res;
      ChapterDialogRef.value.open(item, res);
    });
  };

  const getBooks = (s_id) => {
    getGroupBooks({ s_id: s_id }).then((res) => {
      galleryState.booksList = res;
    });
  };

  const handleSceneSel = (item) => {
    galleryState.currentScene = item.id;
    getBooks(item.id);
  };
  const getScene = (l_id) => {
    getSceneList({
      l_id: l_id,
    }).then((res) => {
      galleryState.sceneList = res;
      if (res.length) {
        getBooks(res[0].id);
      } else {
        galleryState.booksList = [];
      }
    });
  };
  const getLanguage = () => {
    getLanguageList().then((res) => {
      galleryState.languageList = res;
      getScene(res[0].id);
    });
  };

  const handleTabClick = ({ paneName }) => {
    getScene(paneName);
  };
  onMounted(() => {
    getLanguage();
  });
</script>
