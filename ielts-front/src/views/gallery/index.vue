<template>
  <div class="relative mb-auto mt-auto flex w-full flex-1 flex-col overflow-y-auto lg:px-30 px-4 pt-6">
    <div class="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0">
      <a class="flex items-center text-2xl font-bold text-theme no-underline hover:no-underline lg:text-4xl" href="/">
        <SvgIcon name="atx" class="hidden md:block" width="180" height="80" />
      </a>
      <nav
        class="my-card on element flex w-auto flex-col lg:flex-row content-center items-center justify-end space-x-3 rounded-xl bg-white/75 lg:p-4 p-2 transition-colors duration-300 dark:bg-gray-800"
      >
        <div class="w-30 text-center cursor-pointer rounded-md text-theme font-bold text-2xl">单词书</div>
        <div class="text-lg w-30 text-center cursor-pointer">统计</div>
        <div class="text-lg w-30 text-center cursor-pointer">错词本</div>
        <div class="text-lg w-30 text-center cursor-pointer">我的</div>
      </nav>
    </div>
    <div class="mt-10 flex w-full flex-1 flex-col justify-center overflow-y-auto">
      <el-tabs v-model="galleryState.activeTab" @tab-click="handleTabClick" class="flex h-20 w-full items-center justify-between pb-6">
        <el-tab-pane :name="item.id" v-for="item in galleryState.languageList" :key="item.id">
          <template #label>
            <img :src="galleryState.languageIcon[item.id]" alt="" />&nbsp;
            <span class="text-lg"> {{ item.name }} </span>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="flex-1 overflow-y-auto">
        <div class="lg:mt-4">
          <!-- 选项 -->
          <div class="flex items-center space-x-4 overscroll-x-auto">
            <div
              v-for="(item, index) in galleryState.sceneList"
              :key="index"
              class="cursor-pointer whitespace-nowrap rounded-[3rem] px-4 py-2 false border-color-theme"
              :class="galleryState.currentScene == item.id ? 'bg-theme text-white' : 'bg-white text-black hover:bg-theme_hover'"
              @click="handleSceneSel(item)"
              ><span class="font-normal">{{ item.name }}</span></div
            >
          </div>

          <!-- 书籍 -->
          <div class="flex mt-8 px-1 pb-4 flex-wrap justify-between lg:justify-initial md:justify-initial">
            <div
              v-for="item in galleryState.booksList"
              :key="item.id"
              class="group flex lg:h-36 w-[46%] lg:w-80 cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4"
              @click="openChapter(item)"
            >
              <div class="relative ml-1 lg:mt-2 flex h-full w-full flex-col items-start justify-start"
                ><h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:color-theme dark:text-gray-200">{{ item.name }}</h1
                ><p
                  class="lg:mb-3 max-w-full truncate textdelayDuration-gray-600 dark:text-gray-200 whitespace-nowrap"
                  data-state="closed"
                  >{{ item.remarks }}</p
                >
                <p class="mb-2 font-bold text-gray-600 dark:text-gray-200">{{ item.word_total }} 词</p>
                <p class="mb-0.5 font-bold text-gray-600 dark:text-gray-200" v-if="item.chapter_total">{{ item.chapter_total }} 章</p>
                <div class="flex w-full items-center"
                  ><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" /></div
              ></div>
            </div>
          </div>
        </div>
      </div>
      <ChapterDialog ref="ChapterDialogRef" />
    </div>
  </div>
  <!-- <LastPage /> -->
  <Loading :loading="loading" />
  <Footer v-if="galleryState.sceneList.length" />
</template>
<script setup>
  import ChapterDialog from './chapter-dialog.vue';
  import yg from '@/assets/images/yg.png';
  import rb from '@/assets/images/rb.png';
  // import LastPage from '@/components/lastPage/index.vue';
  // import dg from '@/assets/images/dg.png';
  import { ElMessage } from 'element-plus';
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';
  import Footer from '@/components/footer/index.vue';

  import { getSceneList, getGroupBooks, getChapterList, getLanguageList } from '@/api/book/index';

  const { loading, setLoading } = useLoading();

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
    setLoading(true);
    getChapterList({ g_id: item.id })
      .then((res) => {
        galleryState.chapterList = res;
        if (res.length) {
          setLoading(false);
          ChapterDialogRef.value.open(item, res);
        } else {
          ElMessage.warning('未配置词库');
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getBooks = (s_id) => {
    setLoading(true);

    getGroupBooks({ s_id: s_id })
      .then((res) => {
        galleryState.booksList = res;
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
