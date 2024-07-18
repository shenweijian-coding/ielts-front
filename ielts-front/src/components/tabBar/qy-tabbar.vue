<template>
  <keep-alive>
    <div class="phone-tab md:hidden flex tabbar bg-white w-full justify-center h-14">
      <el-menu :default-active="currentRoute" mode="horizontal" :ellipsis="false" router>
        <el-menu-item index="/company/index/class" class="flex flex-col">
          <el-icon><School /></el-icon> 班级
        </el-menu-item>
        <el-menu-item index="/company/index/library" class="flex flex-col">
          <el-icon><Files /></el-icon>
          资源库
        </el-menu-item>
        <el-menu-item index="/company/index/user" class="flex flex-col">
          <el-icon><User /></el-icon>
          我的
        </el-menu-item>
      </el-menu>
    </div>
  </keep-alive>
  <div class="phone-tab-block"></div>
</template>
<script setup>
  import { Memo, Files, School, DocumentDelete, User } from '@element-plus/icons-vue';
  import { useAppStore } from '@/store';
  import { useRoute } from 'vue-router';

  const appStore = useAppStore();
  const route = useRoute();
  const currentRoute = ref('/main/book');
  // 监听路由变化
  watch(
    () => route.path,
    (newPath) => {
      currentRoute.value = newPath;
    },
  );
  onMounted(() => {
    console.log(console.log(route.path), '111');
    currentRoute.value = route.path;
  });
</script>
<style lang="less" scoped>
  .tabbar .el-menu-item {
    line-height: 1.4rem;
  }
  .phone-tab {
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .phone-tab .el-menu--horizontal {
    width: 100%;
    justify-content: space-evenly;
  }
  .phone-tab-block {
    height: 60px;
  }
  .el-menu-item > .el-icon {
    margin: 0 !important;
  }
</style>
