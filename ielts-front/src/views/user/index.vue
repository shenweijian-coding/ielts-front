<template>
  <div class="relative flex lg:px-30 align-center justify-center flex-col pt-5">
    <el-button @click="handleToBook" class="w-full">单词本</el-button>
    <el-button @click="handleLogout" type="" class="mt-5 w-full m-0">退出登陆</el-button>
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

  const userStore = useUserStore();
  const router = useRouter();

  const state = reactive({
    list: []
  })
  
  const handleLogout = () => {
    userStore.logout();
  };
  const handleToBook = () => {
    router.push('/main/vocabularyBook');
  };
  const getBooks = (s_id) => {
    getGroupBooks({ s_id: s_id })
      .then((res) => {
        state.list = res;
      })
      .catch(() => {
      });
  };
  getBooks(3)
</script>
<style lang="less" scoped>
  .el-button + .el-button{
    margin-left: 0;
    margin-right: 0;
  }
</style>
