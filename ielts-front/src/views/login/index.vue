<template>
  <div class="container">
    <div class="logo">
      <img :src="logo" width="240" />
    </div>
    <LoginBanner />
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
</template>

<script setup>
  import LoginBanner from './components/banner.vue';
  import LoginForm from './components/login-form.vue';
  import logo from '@/assets/images/logo.png';
  import SignIn from './components/sign-in.vue';

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
      background-image: url(https://pic.imgdb.cn/item/6545aeb9c458853aef9b1bba.png);
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
      box-shadow: 0 20px 50px 0 hsla(0, 0%, 64%, 0.1);
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>
