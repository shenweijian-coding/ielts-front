<template>
  <footer class="mb-1 pt-2 md:flex w-full items-center justify-center gap-2.5 text-sm ease-in hidden">
    <span class="text-center text-m text-gray-700">
      <span class="cursor-pointer" @click="showDialog"> 有任何使用问题/建议？请联系我们 </span>
      <a class="ml-4 text-gray-700" href="https://beian.miit.gov.cn/" target="_blank">京ICP备2024066748号-3</a>
    </span>
  </footer>
  <Wx ref="wxRef" />
</template>
<script setup>
  import Wx from './wx.vue';

  const wxRef = ref(null);

  function showDialog() {
    wxRef.value.open();
  }
</script>
