<template>
  <div class="relative mb-auto mt-auto flex w-full flex-1 flex-col overflow-y-auto lg:px-30 px-4 lg:pt-6">
    <div class="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0">
      <a class="flex items-center text-2xl font-bold text-theme no-underline hover:no-underline lg:text-4xl" href="/">
        <SvgIcon name="atx" class="hidden md:block" width="180" height="80" />
      </a>
      <!-- PC端展示的 -->
      <div class="hidden md:block">
        <el-menu default-active="/main/book" mode="horizontal" :ellipsis="false" router>
          <el-menu-item v-if="appStore?.dictationInfo?.currentChapter" index="/home">
            <el-icon><Headset /></el-icon>
            听写
          </el-menu-item>
          <el-menu-item index="/main/book">
            <el-icon><Memo /></el-icon>
            单词书
          </el-menu-item>
          <el-menu-item index="/main/statistics">
            <el-icon><DataLine /></el-icon>
            统计
          </el-menu-item>
          <el-menu-item index="/main/errorbook">
            <el-icon><DocumentDelete /></el-icon>
            错词本
          </el-menu-item>
          <!-- <el-menu-item index="/main/user">
            <el-icon><User /></el-icon>
            我的
          </el-menu-item> -->
        </el-menu>
      </div>
    </div>
    <router-view />
  </div>
  <Footer />
  <!-- 移动端展示的 -->
  <div class="md:hidden flex tabbar bg-white w-full justify-center">
    <el-menu default-active="/main/book" mode="horizontal" :ellipsis="false" router>
      <el-menu-item v-if="appStore?.dictationInfo?.currentChapter" index="/home" class="flex flex-col leading-1">
        <el-icon><Headset /></el-icon>
        听写
      </el-menu-item>
      <el-menu-item index="/main/book" class="flex flex-col">
        <el-icon><Memo /></el-icon>
        单词书
      </el-menu-item>
      <el-menu-item index="/main/statistics" class="flex flex-col">
        <el-icon><DataLine /></el-icon>
        统计
      </el-menu-item>
      <el-menu-item index="/main/errorbook" class="flex flex-col">
        <el-icon><DocumentDelete /></el-icon>
        错词本
      </el-menu-item>
      <el-menu-item index="/main/user" class="flex flex-col">
        <el-icon><User /></el-icon>
        我的
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
  import Footer from '@/components/footer/index.vue';
  import { Memo, Headset, DataLine, DocumentDelete, User } from '@element-plus/icons-vue';
  import { useAppStore } from '@/store';

  const appStore = useAppStore();
</script>
<style lang="less" scoped>
  .tabbar .el-menu-item {
    line-height: 1.4rem;
  }
</style>
