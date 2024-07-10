<template>
  <div class="dark:text-slate-400 dark:bg-slate-900 relative w-full">
    <div class="home-box h-screen w-full flex flex-col justify-center items-center">
      <a class="absolute top-0 lg:left-30 text-theme" href="/">
        <SvgIcon name="atx" class="" width="120" height="80" />
      </a>
      <!-- <div>
        <h1
          class="text-center w-full z-10 mt-8 animate-fade-up animate-ease-in-out animate-normal animate-fill-forwards text-[32px] sm:text-4xl lg:text-5xl font-semibold title"
          >1分钟了解爱听写功能</h1
        >
        <video
          src="http://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/471307749512.mp4"
          height="500"
          controls
          autoplay
          class="mt-5"
        ></video>
      </div> -->
      <div class="flex justify-center items-center space-x-12" v-if="isLogin">
        <a href="/#/login">
          <el-button type="" szie="large"> 注册 </el-button>
        </a>
        <a href="/#/login">
          <el-button type="primary" szie="large"> 登录 </el-button>
        </a>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import Footer from '@/components/footer/index.vue';

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
    height: 95vh;

    button {
      padding: 20px 40px;
    }
  }
  .title {
    background: linear-gradient(62deg, #fa7017, #ff80c4 82.51%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
