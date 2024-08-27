<template>
  <el-dialog title="1分钟了解爱听写功能" v-model="dialogVisible" :width="({1:'90%',2: '70%',3: '660px'})[deviceSize]" destroy-on-close>
    <div class="flex justify-center items-center py-4">
      <video src="http://cloud.video.taobao.com/play/u/null/p/1/e/6/t/1/471307749512.mp4" controls autoplay></video>
    </div>
  </el-dialog>
</template>
<script setup>
  import { useDrawerWith } from '@/views/home/useLogic.js'

  const { deviceSize, countWidth } = useDrawerWith()

  const dialogVisible = ref(false);

  function open() {
    dialogVisible.value = true;
  }
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
