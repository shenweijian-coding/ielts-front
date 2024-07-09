<template>
  <div class="relative flex align-center pt-5 flex-col lg:flex-row">
    <div
      class="group flex lg:h-36 w-[46%] lg:w-74 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4"
      @click="handleToBook"
    >
      <div
        class="relative ml-1 px-3 lg:px-0 lg:mt-2 flex h-full w-full lg:flex-col lg:items-start items-center lg:justify-start justify-between"
        ><h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:color-theme dark:text-gray-200">我的词书</h1>
        <p class="mb-2 font-bold text-gray-600 dark:text-gray-200">共 {{ state.list.length }} 本</p>
        <div class="w-full items-center hidden lg:flex"
          ><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" /></div
      ></div>
    </div>

    <!-- <div
      class="group flex lg:h-36 w-[46%] lg:w-50 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4"
    >
      <div
        class="relative ml-1 px-3 lg:px-0 lg:mt-2 flex h-full w-full lg:flex-col lg:items-start items-center lg:justify-start justify-between"
        ><h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:color-theme dark:text-gray-200">新手教学视频</h1>
        <div class="w-full items-center hidden lg:flex"
          ><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" /></div
      ></div>
    </div> -->

    <div
      class="group flex lg:h-36 w-[20%] lg:w-50 mt-10 lg:mt-0 w-full text-lg cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-white shadow-lg focus:outline-none bg-red-3 hover:bg-red-4 dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4"
      @click="handleLogout"
    >
      退出登陆
    </div>

    <!-- <el-button @click="handleToBook" class="w-full">单词本{{ state.list.length }}本</el-button> -->
    <!-- <el-button @click="handleLogout" type="" class="mt-5 w-full m-0">退出登陆</el-button> -->
    <!-- <el-button @click="handleLogout" type="" class="mt-10">清除缓存</el-button>
      <el-button @click="handleLogout" type="" class="mt-10">修改密码</el-button> -->
    <tabbar />
  </div>
</template>
<script setup>
  import { useUserStore } from '@/store';
  import tabbar from '@/components/tabBar/index.vue';
  import { useRouter } from 'vue-router';
  import { getGroupBooks } from '@/api/book/index';
  import { ElMessage } from 'element-plus';

  const userStore = useUserStore();
  const router = useRouter();

  const state = reactive({
    list: [],
  });

  const handleLogout = () => {
    userStore.logout();
  };
  const handleToBook = () => {
    if (!state.list.length) {
      ElMessage.warning('无单词本');
      return;
    }
    router.push('/main/vocabularyBook');
  };
  const getBooks = (s_id) => {
    getGroupBooks({ s_id: s_id })
      .then((res) => {
        state.list = res;
      })
      .catch(() => {});
  };
  getBooks(2);
</script>
<style lang="less" scoped>
  .el-button + .el-button {
    margin-left: 0;
    margin-right: 0;
  }
</style>
