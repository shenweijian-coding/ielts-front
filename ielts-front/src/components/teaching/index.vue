<template>
  <el-dialog title="1分钟了解爱听写功能" v-model="dialogVisible" :width="dialogWidth" destroy-on-close>
    <div class="flex justify-center items-center py-4">
      <video src="http://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/471307749512.mp4" controls autoplay></video>
    </div>
  </el-dialog>
</template>
<script setup>
  const dialogVisible = ref(false);

  function open() {
    dialogVisible.value = true;
  }
  const dialogWidth = ref('660px');

  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '90%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '70%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '660px'; // 在大屏幕下设置Dialog宽度为50%
    }
  };
  windowSize();
  defineExpose({
    open,
  });
</script>
<style lang="less" scoped>
  video {
    width: 100%;
    height: auto;
  }
</style>
