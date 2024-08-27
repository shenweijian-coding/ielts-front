<template>
  <el-dialog v-model="state.dialogVisible" :width="({1: '90%',2: '70%',3: '26%'})[deviceSize]" :before-close="handleClose">
    <div class="text-center p-6">
      <div class="text-theme-color text-6xl">{{ state.correctness }}%</div>
      <div class="mt-4 text-2xl text-black">本次正确听写率</div>
      <div class="text-grey mt-4" v-if="appStore?.currentChapter?.accuracy > 0"
        >上次正确听写率：{{ appStore.currentChapter.accuracy.toFixed(2) }}</div
      >
      <div class="flex space-x-10 justify-center mt-8">
        <a href="/#/main/errorbook?from=result">
          <el-button size="large">查看错词</el-button>
        </a>
        <el-button type="primary" size="large" @click="nextChapter">继续听写下一章</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { reactive } from 'vue';
  import { useAppStore } from '@/store';
  import { useDrawerWith } from '@/views/home/useLogic.js'

  const { deviceSize, countWidth } = useDrawerWith()
  const appStore = useAppStore();

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

  const nextChapter = () => {
    emit('next');
    setTimeout(() => {
      handleClose();
    });
  };
  defineExpose({
    open,
  });
</script>
