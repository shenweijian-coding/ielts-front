<template>
  <footer class="mb-1 pt-2 md:flex w-full items-center justify-center gap-2.5 text-sm ease-in hidden">
    <span class="text-center text-m">
      <!-- <a class="text-gray-700" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=备案编号" target="_blank"
        >渝ICP备2024025496号</a> -->
      <span class="cursor-pointer" @click="showDialog"> 有任何使用问题/建议？请联系我们 </span>
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
