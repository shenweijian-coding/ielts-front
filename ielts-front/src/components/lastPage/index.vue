<template>
  <div class="absolute right-20 top-10 mr-2 h-7 w-7 cursor-pointer text-gray-400" @click="handleLastPage">
    <el-icon size="24"><CloseBold /></el-icon>
  </div>
</template>
<script setup lang="ts">
  import { CloseBold } from '@element-plus/icons-vue';

  const router = useRouter();
  const handleLastPage = () => {
    router.back();
  };
</script>
