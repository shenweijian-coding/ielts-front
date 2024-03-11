<template>
  <el-dialog v-model="state.dialogVisible" width="26%" :before-close="handleClose">
    <div class="text-center p-6">
      <div class="text-theme-color text-6xl">82.00%</div>
      <div class="mt-4 text-2xl text-black">本次正确听写率</div>
      <div class="text-grey mt-4">上次正确听写率：80%</div>
      <div class="flex space-x-10 justify-center mt-8">
        <el-button size="large">查看错词</el-button>
        <el-button type="primary" size="large">继续听写下一章</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { reactive } from 'vue';

  const state = reactive({
    dialogVisible: false,
  });

  const open = () => {
    state.dialogVisible = true;
  };
  const handleClose = () => {
    state.dialogVisible = false;
  };
  defineExpose({
    open,
  });
</script>
