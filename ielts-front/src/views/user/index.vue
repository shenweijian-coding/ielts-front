<template>
  <div class="relative flex lg:px-30 align-center justify-center">
    <el-button @click="handleLogout" type="" class="mt-10">退出登陆</el-button>
    <!-- <el-button @click="handleLogout" type="" class="mt-10">清除缓存</el-button>
      <el-button @click="handleLogout" type="" class="mt-10">修改密码</el-button> -->
    <tabbar />
  </div>
</template>
<script setup>
  import { useUserStore } from '@/store';
  import tabbar from '@/components/tabBar/index.vue';

  const userStore = useUserStore();

  const handleLogout = () => {
    userStore.logout();
  };
</script>
