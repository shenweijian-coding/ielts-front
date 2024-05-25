<template>
  <div class="relative mt-auto flex w-full flex-1 flex-col overflow-y-auto lg:px-30 lg:pt-6 mb-10 md:mb-auto bg-white">
    <div class="">
      <el-button @click="handleLogout" type="" class="mt-10">退出登陆</el-button>
      <!-- <el-button @click="handleLogout" type="" class="mt-10">清除缓存</el-button>
      <el-button @click="handleLogout" type="" class="mt-10">修改密码</el-button> -->
    </div>
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
