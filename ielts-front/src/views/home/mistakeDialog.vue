<template>
  <el-dialog v-model="state.dialogVisible" :width="dialogWidth" :before-close="handleClose">
    <div class="text-center p-6">
      <div class="text-theme-color text-6xl">{{ state.correctness }}%</div>
      <div class="mt-4 text-2xl text-black">本次正确听写率</div>
      <!-- <div class="text-grey mt-4">上次正确听写率：80%</div> -->
      <div class="flex space-x-10 justify-center mt-8">
        <a href="/#/errorBook?from=result">
          <el-button size="large">查看错词</el-button>
        </a>
        <el-button type="primary" size="large" @click="nextChapter">继续听写下一章</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { reactive } from 'vue';

  const dialogWidth = ref('40%');
  const emit = defineEmits(['next']);
  const state = reactive({
    dialogVisible: false,
    correctness: 0,
  });

  const open = (data) => {
    state.dialogVisible = true;
    state.correctness = data;
  };
  const handleClose = () => {
    state.dialogVisible = false;
    state.correctness = 0;
  };

  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '90%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '70%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '26%'; // 在大屏幕下设置Dialog宽度为50%
    }
  };

  const nextChapter = () => {
    emit('next');
    setTimeout(() => {
      handleClose();
    });
  };
  windowSize();
  defineExpose({
    open,
  });
</script>
