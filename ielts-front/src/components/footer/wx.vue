<template>
  <el-dialog title="联系我们" v-model="dialogVisible" width="380px">
    <div class="flex items-center flex-col">
      <p class="text-center">爱听写正在不断优化，我们将尽快解决您的问题</p>
      <p>期待您的反馈</p>
      <p class="text-center mt-6">添加微信 <span class="font-bold">请一定备注：爱听写</span></p>
      <img class="w-33" src="@/assets/images/wx.png" alt="微信二维码" />
    </div>
  </el-dialog>
</template>
<script setup>
  const dialogVisible = ref(false);

  function open() {
    dialogVisible.value = true;
  }
  defineExpose({
    open,
  });
</script>
