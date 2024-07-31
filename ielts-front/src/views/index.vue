<template>
  <div class="dark:text-slate-400 dark:bg-slate-900 relative w-full">
    <div class="w-full flex justify-center items-center lg:px-30 flex-col">
      <a class="top-0 lg:left-30 text-theme lg:py-0 py-10" href="/">
        <SvgIcon name="atx" class="" width="120" height="80" />
      </a>
      <h1 class="text-bold">快速了解功能 开启学习之旅吧</h1>

      <div class="flex justify-center items-center space-x-4 my-6 lg:py-4 py-10" v-if="isLogin">
        <!-- <a href="/#/login"> -->
        <el-button size="default" type="" round auto-insert-space @click="openTeaching">
          观看教程 <el-icon size="16"><CaretRight /></el-icon
        ></el-button>
        <!-- </a> -->
        <a href="/#/login">
          <el-button type="" size="default" round color="#000" auto-insert-space> 开始使用 </el-button>
        </a>
      </div>

      <div class="px-4">
        <img class="w-full" src="@/assets/images/home-img.png" alt="爱听写首页图" />
      </div>
    </div>
    <!-- <div class="flex flex-col items-center justify-center">
      <a href="/#/login" class="block lg:hidden py-10">
        <el-button type="" size="" round color="#000"> 开始使用 </el-button>
      </a>
      <h1
        class="text-center w-full z-10 mt-8 animate-fade-up animate-ease-in-out animate-normal animate-fill-forwards sm:text-3xl lg:text-4xl font-semibold title"
        >1分钟了解爱听写功能</h1
      >

      <video src="http://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/471307749512.mp4" controls autoplay class="mt-2"></video>
    </div> -->
  </div>
  <Teach ref="teachRef" />
  <Footer />
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import Footer from '@/components/footer/index.vue';
  import { CaretRight } from '@element-plus/icons-vue';
  import Teach from '@/components/teaching/index.vue';

  const teachRef = ref(null);

  const isLogin = ref(false);

  const openTeaching = () => {
    console.log(teachRef.value);
    teachRef.value && teachRef.value.open();
  };

  onMounted(() => {
    isLogin.value = true;
  });
</script>

<style lang="less" scoped>
  h1 {
    margin-bottom: 0;
  }
  .el-button.is-round {
    padding: 0 24px !important;
    font-size: 10px !important;
  }
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
