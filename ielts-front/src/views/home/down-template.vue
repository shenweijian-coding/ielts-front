<template>
  <el-dialog title="选择模板" v-model="state.dialogVisible" :width="dialogWidth">
    <el-radio-group>
      <el-radio-button>中英词表</el-radio-button>
      <el-radio-button>Excel表格</el-radio-button>
    </el-radio-group>
    <el-button type="primary" size="large" @click="download">下载</el-button>
  </el-dialog>
</template>
<script setup>
  const dialogWidth = ref('40%');

  const state = reactive({
    dialogVisible: false,
  });
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
  windowSize();
  const open = () => {
    state.dialogVisible = true;
  };

  defineExpose({
    open,
  });
</script>
