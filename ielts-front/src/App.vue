<template>
  <Main />
</template>
<script setup lang="ts">
  import Main from '@/layout/layout.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const hostname = window.location.hostname;
  const isDesiredDomain = hostname === 'idictation.cn';
  // const isDesiredDomain = hostname === 'localhost';

  if (isDesiredDomain) {
    router.replace('/stop');
  }
</script>

<style>
  html,
  body {
    height: 100%;
    background-color: #fffaf7;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    /* background-color: var(--color-bg-1); */
    background-color: #fffaf7;
    height: 100%;
  }
</style>
