<template>
  <div class="p-8">
    <el-button class="w-full" @click="handleLogout">退出登录</el-button>
  </div>
</template>
<script setup>
  import { useUserStore } from '@/store';

  const userStore = useUserStore();

  const handleLogout = () => {
    userStore.logout();
  };
</script>
