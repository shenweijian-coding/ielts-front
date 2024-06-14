<template>
  <div class="loading" v-show="props.loading">
    <div class="loader"></div>
  </div>
</template>
<script setup>
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
  });
</script>
<style lang="less" scoped>
  .loading {
    top: 0;
    left: 0;
    position: absolute;
    background-color: #fffaf7;
    opacity: 0.8;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    /* HTML: <div class="loader"></div> */
    .loader {
      top: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      --c: no-repeat linear-gradient(#ff5c00 0 0);
      background: var(--c) 0 0, var(--c) 0 50%, var(--c) 0 100%, var(--c) 50% 0, var(--c) 50% 50%, var(--c) 50% 100%, var(--c) 100% 0,
        var(--c) 100% 50%, var(--c) 100% 100%;
      background-size: 16px 16px;
      animation: l31 0.5s infinite alternate;
    }
    @keyframes l31 {
      0%,
      20% {
        width: 45px;
        height: 45px;
      }
      90%,
      100% {
        width: 65px;
        height: 65px;
      }
    }
  }
</style>
