<template>
  <div class="dark:text-slate-400 dark:bg-slate-900 relative w-full">
    <div class="home-box h-screen w-full flex justify-center items-center">
      <a class="absolute top-20 lg:left-60 text-theme" href="/">
        <SvgIcon name="atx" class="" width="200" height="80" />
      </a>
      <div class="flex justify-center items-center h-screen space-x-12" v-if="isLogin">
        <a href="/#/login">
          <el-button type="" szie="large"> 注册 </el-button>
        </a>
        <a href="/#/login">
          <el-button type="primary" szie="large"> 登录 </el-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';

  const isLogin = ref(false);
  onMounted(() => {
    isLogin.value = true;
  });
</script>

<style lang="less" scoped>
  .home-box {
    background-image: url('');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100vh;

    button {
      padding: 20px 40px;
    }
  }
</style>
