<template>
  <div class="flex items-center justify-eventy w-full md:bg-white">
    <!-- <div class="logo flex justify-center lg:justify-start lg:ml-30 items-center mt-5">
      <a class="text-theme" href="/">
        <SvgIcon name="atx" width="120" height="80" />
      </a>
    </div> -->
    <a href="http://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/471307749512.mp4" target="_blank" class="text-0">
      <div class="hidden lg:block banner cursor-pointer">
        <img src="../../assets/images/home-banner.png" alt="banner">
        <div class="gradient"></div>
        <div class="play-btn box-shadow text-white bg-theme h-12 w-42 absolute text-center flex items-center justify-center text-xl font-mono font-bold">
          观看教程&nbsp;
          <SvgIcon name="play-fill" class="hidden md:block" width="18"/>
  
        </div>
      </div>
    </a>

    <!-- <LoginBanner /> -->
    <div class="w-full md:mt-0 mt-40 h-full flex">
      <div class="content">
        <div class="content-inner bg-white">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录" name="login">
              <LoginForm />
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <SignIn @toggle="toggle" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
  <!-- <Footer /> -->
</template>

<script setup>
  import LoginForm from './components/login-form.vue';
  import SignIn from './components/sign-in.vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import Footer from '@/components/footer/index.vue';
  import LoginBanner from './components/banner.vue'

  const theme = localStorage.getItem('theme');

  const activeName = ref('login');

  if (theme == 'dark') {
    document.documentElement.classList.add('dark');
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.body.removeAttribute('arco-theme');
  }
  function handleClick() {}
  function toggle() {
    activeName.value = 'login';
  }
</script>

<style lang="less" scoped>
  // .container {
  //   display: flex;
  //   height: 100vh;
  //   width: 100vw !important;
  //   max-width: 100vw;

    .banner {
      position: relative;
      img{
        height: 100vh;
      }
      .gradient{
        position: absolute;
        background:
    // radial-gradient(circle at 0% 0%, #ff5200 0%, transparent 50%),
    // radial-gradient(circle at 100% 100%, #ff5200 0%, transparent 50%),
    linear-gradient(to top, #ff5200 50%, transparent 100%);
    // radial-gradient(circle at 100% 0%, #ff5200 0%, transparent 50%);
        opacity: .1;
        z-index: 2;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .play-btn{
        left: 50%;
        top: 40%;
        transform: translate(-50%,-50%);
        border-radius: 28px;
      }
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }

  //   .footer {
  //     position: absolute;
  //     right: 0;
  //     bottom: 0;
  //     width: 100%;
  //   }

    .content-inner {
      padding: 30px;
      box-shadow: 0 20px 50px 0 hsl(0deg 0% 64% / 10%);
    }
  // }

  .logo {
    // position: absolute;
    // // top: 24px;
    // z-index: 1;
    // display: inline-flex;
    // align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>
