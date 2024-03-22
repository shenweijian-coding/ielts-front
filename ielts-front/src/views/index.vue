<template>
  <div class="dark:text-slate-400 dark:bg-slate-900 relative w-full">
    <div class="home-box h-screen w-full">
      <a class="flex items-center text-2xl font-bold text-indigo-500 no-underline hover:no-underline lg:text-4xl" href="/">
        <img :src="logo" class="absolute top-20 left-60 h-20" alt="logo" />
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
  import logo from '@/assets/images/logo.png';

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
