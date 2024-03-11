<template>
  <div class="pl-20">
    <!-- tab切换 -->
    <!-- <div style="height: 10rem"> -->
    <!-- <el-affix :offset="14"> -->
    <el-tabs v-model="galleryState.activeTab" @tab-click="handleClick">
      <el-tab-pane :name="item.id" v-for="item in galleryState.tabs" :key="item.id">
        <template #label>
          <img :src="item.icon" alt="" />&nbsp;
          <span class="text-lg"> {{ item.title }} </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <!-- </el-affix> -->
    <!-- </div> -->

    <div v-for="item in 3" :key="item" class="mt-10">
      <!-- 选项 -->
      <div class="flex items-center space-x-4">
        <div
          v-for="(item, index) in galleryState.tabs[galleryState.activeTab].childs"
          :key="index"
          class="cursor-pointer whitespace-nowrap rounded-[3rem] px-4 py-2 bg-white hover:bg-indigo-100 text-black false"
          ><span class="font-normal">大学英语</span></div
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
      <div class="mt-8 grid gap-x-5 gap-y-10 px-1 pb-4 sm:grid-cols-1 md:grid-cols-6 dic3:grid-cols-3 dic4:grid-cols-4">
        <div
          v-for="item in 10"
          :key="item"
          class="group flex h-36 w-80 cursor-pointer items-center justify-center overflow-hidden rounded-lg p-4 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700"
          @click="openChapter"
        >
          <div class="relative ml-1 mt-2 flex h-full w-full flex-col items-start justify-start"
            ><h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:text-indigo-400 dark:text-gray-200">CET-4</h1
            ><p class="mb-1 max-w-full truncate textdelayDuration-gray-600 dark:text-gray-200 whitespace-nowrap" data-state="closed"
              >大学英语四级词库</p
            ><p class="mb-0.5 font-bold text-gray-600 dark:text-gray-200">2607 词</p
            ><div class="flex w-full items-center pt-2"
              ><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" /></div
          ></div>
        </div>
      </div>
    </div>
    <ChapterDialog ref="ChapterDialogRef" />
  </div>
</template>
<script setup>
  import ChapterDialog from './chapter-dialog.vue';
  import yg from '@/assets/images/yg.png';
  import rb from '@/assets/images/rb.png';
  import dg from '@/assets/images/dg.png';

  const ChapterDialogRef = ref(null);

  const galleryState = reactive({
    tabs: [
      {
        id: 0,
        title: '英语',
        icon: yg,
        childs: [
          { id: 0, title: '大学英语' },
          { id: 1, title: '考研' },
        ],
      },
      { id: 1, title: '英语', icon: rb },
      { id: 2, title: '英语', icon: dg },
    ],
    activeTab: 0,
    activeType: 0,
  });

  const openChapter = () => {
    ChapterDialogRef.value.open();
  };

  const handleClick = () => {
    console.log();
  };
</script>
