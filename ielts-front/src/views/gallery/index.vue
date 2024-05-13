<template>
  <div class="relative mb-auto mt-auto flex w-full flex-1 flex-col overflow-y-auto lg:px-30 px-4 pt-6">
    <div class="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0">
      <a class="flex items-center text-2xl font-bold text-theme no-underline hover:no-underline lg:text-4xl" href="/">
        <SvgIcon name="atx" class="hidden md:block" width="180" height="80" />
      </a>
      <!-- <nav
        class="my-card on element flex w-auto flex-col lg:flex-row content-center items-center justify-end space-x-3 rounded-xl bg-white/75 lg:p-4 p-2 transition-colors duration-300 dark:bg-gray-800"
      >
        <div class="w-30 text-center cursor-pointer rounded-md text-theme font-bold text-2xl">单词书</div>
        <div class="text-lg w-30 text-center cursor-pointer">统计</div>
        <div class="text-lg w-30 text-center cursor-pointer">错词本</div>
        <div class="text-lg w-30 text-center cursor-pointer">我的</div>
      </nav> -->
      <el-menu default-active="/main/book" class="el-menu-demo" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/main/book">单词书</el-menu-item>
        <el-menu-item index="/main/statistics">统计</el-menu-item>
        <el-menu-item index="/main/errorbook">错词本</el-menu-item>
        <el-menu-item index="/main/user">我的</el-menu-item>
      </el-menu>
    </div>
    <router-view />
  </div>
  <Footer />
</template>
<script setup>
  import Footer from '@/components/footer/index.vue';
</script>
