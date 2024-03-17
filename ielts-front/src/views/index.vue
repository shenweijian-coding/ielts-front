<template>
  <div class="dark:text-slate-400 dark:bg-slate-900 relative w-full">
    <div class="home-box h-screen w-full">
      <img :src="logo" class="absolute top-20 left-60 h-20" alt="logo" />
      <div class="flex justify-center items-center h-screen space-x-12">
        <el-button type="" szie="large" @click="toLogin"> 注册 </el-button>
        <el-button type="primary" szie="large" @click="toLogin"> 登陆 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import logo from '@/assets/images/logo.png';

  const router = useRouter();
  const toLogin = () => {
    router.push('/login');
  };
</script>

<style lang="less" scoped>
  .home-box {
    background-image: url('https://pic.imgdb.cn/item/65f52d019f345e8d036267ae.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    height: 100vh;

    button {
      padding: 20px 40px;
    }
  }
</style>
