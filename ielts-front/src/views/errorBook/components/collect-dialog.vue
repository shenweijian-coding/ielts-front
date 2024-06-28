<template>
  <el-dialog v-model="state.dialogVisible" title="将单词书收藏至" :width="dialogWidth" :before-close="handleClose" center>
    <div class="flex">
      <img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" />
      <span>生词本</span>
      <span>
        <SvgIcon @click="playAgain" name="collect" color="grey" />
      </span>
    </div>
  </el-dialog>
</template>
<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';

  const state = reactive({
    list: [],
    dialogVisible: true,
  });

  const dialogWidth = ref('40%');

  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '90%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '70%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '50%'; // 在大屏幕下设置Dialog宽度为50%
    }
  };
  const handleClose = () => {
    state.dialogVisible = false;
  };
</script>