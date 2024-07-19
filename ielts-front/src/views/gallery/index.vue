<template>
  <!-- PC端展示的 -->
  <div class="hidden md:block w-full general_header">
    <div class="flex justify-between lg:px-30">
      <div class="flex flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0">
        <a class="flex items-center text-2xl font-bold text-theme no-underline hover:no-underline lg:text-4xl" href="/">
          <SvgIcon name="atx" class="hidden md:block" width="100" height="50" />
        </a>
      </div>
      <el-menu :default-active="currentRoute" mode="horizontal" :ellipsis="false" router>
        <el-menu-item v-if="appStore?.dictationInfo?.currentChapter" index="/home" @click="appStore.updateContinuePlayStatus(true)">
          <!-- <el-icon><Headset /></el-icon> -->
          听写
        </el-menu-item>
        <el-menu-item index="/main/book">
          <!-- <el-icon><Memo /></el-icon> -->
          单词书
        </el-menu-item>
        <el-menu-item index="/main/statistics">
          <!-- <el-icon><DataLine /></el-icon> -->
          统计
        </el-menu-item>
        <el-menu-item index="/main/errorbook">
          <!-- <el-icon><DocumentDelete /></el-icon> -->
          错词本
        </el-menu-item>
        <el-menu-item index="/main/user">
          <!-- <el-icon><User /></el-icon> -->
          我的
        </el-menu-item>
      </el-menu>
    </div>
  </div>
  <div class="md:block hidden header-blank"></div>
  <div class="relative mt-auto flex w-full flex-1 flex-col overflow-y-auto lg:px-30 mb-10 md:mb-auto">
    <router-view />
  </div>
  <Footer />
</template>
<script setup>
  import Footer from '@/components/footer/index.vue';
  import { Memo, Headset, DataLine, DocumentDelete, User } from '@element-plus/icons-vue';
  import { useAppStore, useUserStore } from '@/store';
  import { useRoute } from 'vue-router';

  const appStore = useAppStore();
  const userStore = useUserStore();
  const route = useRoute();
  const currentRoute = ref('/main/book');
  onMounted(() => {
    if (route.meta.belong) {
      currentRoute.value = route.meta.belong;
    } else {
      currentRoute.value = route.path;
    }
    userStore.info();
  });
</script>
<style lang="less" scoped>
  .general_header {
    width: 100vw;
    height: 72px;
    position: fixed;
    background-color: hsla(0, 0%, 100%, 0.49);
    -webkit-box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    width: 100%;
    z-index: 99;
  }
  .header-blank {
    height: 68px;
  }
  .el-menu-item {
    border: none !important;
    background-color: transparent !important;
  }
  .el-menu--horizontal {
    background-color: transparent !important;
    border: none;
  }
</style>
