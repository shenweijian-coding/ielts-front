<template>
  <div class="container flex-col">
    <div class="logo flex justify-center lg:justify-start lg:ml-30 items-center mt-5">
      <a class="text-theme" href="/">
        <SvgIcon name="atx" width="120" height="80" />
      </a>
    </div>
    <!-- <LoginBanner /> -->
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
  <Footer />
  <check/>

</template>

<script setup>
  import LoginForm from './components/login-form.vue';
  import SignIn from './components/sign-in.vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import Footer from '@/components/footer/index.vue';
  import check from '@/components/Notice/index2.vue'

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
  .container {
    display: flex;
    height: 100vh;
    width: 100vw !important;
    max-width: 100vw;

    .banner {
      width: 550px;
      background-image: url('');
      background-position: center;
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }

    .content-inner {
      padding: 30px;
      box-shadow: 0 20px 50px 0 hsl(0deg 0% 64% / 10%);
    }
  }

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
