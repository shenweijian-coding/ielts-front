<template>
  <div class="relative flex lg:px-30 align-center justify-center">
    <el-button @click="handleToBook">单词本</el-button>
    <el-button @click="handleLogout" type="" class="mt-10">退出登陆</el-button>
    <!-- <el-button @click="handleLogout" type="" class="mt-10">清除缓存</el-button>
      <el-button @click="handleLogout" type="" class="mt-10">修改密码</el-button> -->
    <tabbar />
  </div>
</template>
<script setup>
  import { useUserStore } from '@/store';
  import tabbar from '@/components/tabBar/index.vue';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    userStore.logout();
  };
  const handleToBook = () => {
    router.push('/main/vocabularyBook');
  };
</script>
