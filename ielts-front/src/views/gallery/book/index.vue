<template>
  <div class="lg:mt-10 flex w-full flex-1 flex-col justify-center overflow-y-auto">
    <el-tabs v-model="galleryState.activeTab" @tab-click="handleTabClick" class="flex h-20 w-full items-center justify-between lg:pb-6">
      <el-tab-pane :name="item.id" v-for="item in galleryState.languageList" :key="item.id">
        <template #label>
          <img :src="galleryState.languageIcon[item.id]" alt="" />&nbsp;
          <span class="text-lg"> {{ item.name }} </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="flex-1 overflow-y-auto">
      <div v-if="galleryState.activeTab != 2" class="lg:mt-4">
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
              ><p class="lg:mb-3 max-w-full truncate textdelayDuration-gray-600 dark:text-gray-200 whitespace-nowrap" data-state="closed">{{
                item.remarks
              }}</p>
              <p class="mb-2 font-bold text-gray-600 dark:text-gray-200">{{ item.word_total }} 词</p>
              <p class="mb-0.5 font-bold text-gray-600 dark:text-gray-200" v-if="item.chapter_total">{{ item.chapter_total }} 章</p>
              <div class="flex w-full items-center"
                ><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" /></div
            ></div>
          </div>
        </div>
      </div>
      <div v-else class="lg:mt-4">
        <div class="flex mt-8 px-1 pb-4 flex-wrap justify-between lg:justify-initial md:justify-initial">
          <div
            class="group flex lg:h-36 w-[46%] lg:w-80 cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4 flex-col"
            @click="openCustomDialog"
          >
            <el-icon size="40" color="gray"><Plus /></el-icon>
            <div class="mt-4">添加自定义词书</div>
          </div>
        </div>
      </div>
    </div>
    <Loading :loading="loading" />
    <ChapterDialog ref="ChapterDialogRef" />
    <ImportDialog ref="ImportDialogRef" />
  </div>
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
  // import Footer from '@/components/footer/index.vue';
  import { Plus } from '@element-plus/icons-vue';
  import ImportDialog from './import-dialog.vue';

  import { getSceneList, getGroupBooks, getChapterList, getLanguageList } from '@/api/book/index';

  const { loading, setLoading } = useLoading();

  const ChapterDialogRef = ref(null);
  const ImportDialogRef = ref(null);

  const galleryState = reactive({
    sceneList: [],
    currentScene: 1,
    booksList: [],
    chapterList: [],
    languageList: [],
    languageIcon: {
      1: yg,
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
    if (paneName == '我的词书') {
      galleryState.sceneList = [];
      galleryState.booksList = [];
    } else {
      getScene(paneName);
    }
  };

  const openCustomDialog = () => {
    ImportDialogRef.value.open();
  };

  onMounted(() => {
    getLanguage();
  });
</script>
<style lang="less">
  .flex-grow {
    flex-grow: 1;
  }
</style>
