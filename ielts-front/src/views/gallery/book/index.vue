<template>
  <div class="flex w-full flex-1 flex-col justify-center px-4">
    <el-tabs v-model="galleryState.activeTab" @tab-click="handleTabClick" class="flex h-12 w-full items-center justify-between">
      <el-tab-pane :name="item.id" v-for="item in galleryState.languageList" :key="item.id">
        <template #label>
          <img :src="galleryState.languageIcon[item.id]" alt="" style="width: 30px" />&nbsp;
          <span class="text-lg"> {{ item.name }} </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="flex-1">
      <div class="">
        <!-- 选项 -->

        <el-tabs
          v-if="galleryState.activeTab != 2"
          v-model="galleryState.currentCategory"
          @tab-click="handleCategorySel"
          class="flex h-16 w-full items-center justify-between"
        >
          <el-tab-pane :label="item.name" :name="item.id" v-for="(item, index) in galleryState.categoryList" :key="item.id" />
        </el-tabs>

        <!-- <div v-if="galleryState.activeTab != 2" class="flex items-center overscroll-x-auto flex-wrap mb-4">
          <div
            v-for="(item, index) in galleryState.categoryList"
            :key="index"
            class="cursor-pointer whitespace-nowrap rounded-[3rem] px-4 py-2 false border-color-theme mr-4 mb-2"
            :class="galleryState.currentCategory == item.id ? 'bg-theme text-white' : 'bg-white text-black hover:bg-theme_hover'"
            @click="handleCategorySel(item)"
            ><span class="font-normal">{{ item.name }}</span></div
          >
        </div> -->

        <div v-if="galleryState.activeTab != 2" class="flex items-center overscroll-x-auto flex-wrap lg:mt-4">
          <div
            v-for="(item, index) in galleryState.sceneList"
            :key="index"
            class="cursor-pointer whitespace-nowrap rounded-[3rem] px-4 py-2 false border-color-theme mr-4 mb-2"
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
            class="group flex lg:h-36 w-[46%] lg:w-74 cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4"
            @click="openChapter(item)"
          >
            <div class="relative ml-1 lg:mt-2 flex h-full w-full flex-col items-start justify-start"
              ><h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:color-theme dark:text-gray-200">{{ item.name }}</h1>
              <!-- <p class="lg:mb-3 max-w-full truncate textdelayDuration-gray-600 dark:text-gray-200 whitespace-nowrap" data-state="closed">{{
                item.remarks
              }}</p> -->
              <p class="mb-2 font-bold text-gray-600 dark:text-gray-200">{{ item.word_total }} 词</p>
              <p class="mb-0.5 font-bold text-gray-600 dark:text-gray-200" v-if="item.chapter_total">{{ item.chapter_total }} 章</p>
              <div class="flex w-full items-center"
                ><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" /></div
            ></div>
          </div>
          <template v-if="galleryState.activeTab == 2">
            <!-- <div class="flex px-1 pb-4 flex-wrap justify-between lg:justify-initial md:justify-initial"> -->
            <div
              class="group flex lg:h-36 w-[46%] lg:w-80 cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4 flex-col"
              @click="openCustomDialog"
            >
              <el-icon size="40" color="gray"><Plus /></el-icon>
              <div class="mt-4">添加自定义词书</div>
            </div>
            <!-- </div> -->
          </template>
        </div>
      </div>
    </div>
    <Loading :loading="loading" />
    <ChapterDialog ref="ChapterDialogRef" />
    <ImportDialog ref="ImportDialogRef" @ok="getBooks(2)" />
    <tabbar />
  </div>
</template>
<script setup>
  import ChapterDialog from './chapter-dialog.vue';
  import yg from '@/assets/images/yg.png';
  import collect from '@/assets/images/collect.png';
  // import rb from '@/assets/images/rb.png';
  // import LastPage from '@/components/lastPage/index.vue';
  // import dg from '@/assets/images/dg.png';
  import { ElMessage } from 'element-plus';
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';
  // import Footer from '@/components/footer/index.vue';
  import { Plus } from '@element-plus/icons-vue';
  import ImportDialog from './import-dialog.vue';
  import tabbar from '@/components/tabBar/index.vue';

  import { getSceneList, getGroupBooks, getChapterList, getLanguageList, getCategoryList } from '@/api/book/index';

  const { loading, setLoading } = useLoading();

  const ChapterDialogRef = ref(null);
  const ImportDialogRef = ref(null);

  const galleryState = reactive({
    cuttentCID: '',
    cuttentLID: '',
    categoryList: [],
    sceneList: [],
    currentScene: 1,
    currentCategory: 1,
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
  const handleCategorySel = ({ paneName }) => {
    galleryState.currentCategory = paneName;
    getScene(galleryState.activeTab, paneName);
  };
  const getScene = (l_id, c_id = galleryState.currentCategory) => {
    getSceneList({
      l_id: l_id,
      c_id: c_id,
    }).then((res) => {
      galleryState.sceneList = res;
      if (res.length) {
        galleryState.currentScene = res[0].id;
        getBooks(res[0].id);
      } else {
        galleryState.booksList = [];
      }
    });
  };
  const getCategory = (l_id) => {
    getCategoryList({
      l_id: l_id,
    }).then((res) => {
      galleryState.categoryList = res;
      galleryState.currentCategory = res[0].id;
      if (res.length) {
        getScene(l_id, res[0].id);
      } else {
        galleryState.booksList = [];
      }
    });
  };
  const getLanguage = () => {
    getLanguageList().then((res) => {
      galleryState.languageList = res;
      getCategory(res[0].id);
      // getScene(res[0].id);
    });
  };

  const handleTabClick = ({ paneName }) => {
    if (paneName == 2) {
      galleryState.sceneList = [];
      galleryState.booksList = [];
      getBooks(2);
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
  /*去掉el-tab-pane底部灰色线条*/
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  /*去掉el-tab-pane切换时的蓝色下划线*/
  .el-tabs__active-bar {
    // background: transparent;
  }
</style>
