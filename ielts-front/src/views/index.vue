<template>
  <div class="dark:text-slate-400 dark:bg-slate-900 relative w-full">
    <div class="w-full flex justify-center items-center justify-between px-30">
      <a class="top-0 lg:left-30 text-theme" href="/">
        <SvgIcon name="atx" class="" width="120" height="80" />
      </a>
      <div class="lg:flex justify-center items-center space-x-4 hidden" v-if="isLogin">
        <a href="/#/login">
          <el-button size="small" type="" link> 登录 </el-button>
        </a>
        <a href="/#/login">
          <el-button type="" size="small" round color="#000"> 免费注册 </el-button>
        </a>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center">
      <a href="/#/login" class="block lg:hidden py-10">
        <el-button type="" size="" round color="#000"> 开始使用 </el-button>
      </a>
      <h1
        class="text-center w-full z-10 mt-8 animate-fade-up animate-ease-in-out animate-normal animate-fill-forwards sm:text-3xl lg:text-4xl font-semibold title"
        >1分钟了解爱听写功能</h1
      >

      <video src="http://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/471307749512.mp4" controls autoplay class="mt-2"></video>
    </div>
  </div>
  <Footer />
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
  video {
    width: 80%;
    height: calc(100vh - 220px);
  }
  @media (max-width: 600px) {
    video {
      width: 90%;
      height: auto !important; /* 小屏幕下的高度 */
    }
  }
</style>
