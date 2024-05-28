<template>
  <div>
    <el-dialog v-model="dialogVisible" title="温馨提示" width="500">
      <p style="line-height: 26px">
        hi！尊敬的用户<br />爱听写因为网址备案转移，现网址从 5月31日 开始停止访问 2-3 周<br />即日起你可以通过
        <a href="//www.dictation.top">www.dictation.top</a>
        访问<a href="//www.dictation.top"> 爱听写</a><br />请及时保存新网址，从新网址访问
      </p>
      <template #footer>
        <div class="flex justify-end">
          <el-checkbox v-model="checked" label="不再弹出" @change="checkChange" />
          <el-button type="primary" @click="close" class="ml-5"> 关闭 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
  const checked = ref(false);
  const dialogVisible = ref(false);

  const checkChange = (checked) => {
    window.localStorage.setItem('isHideNotice', checked);
  };
  onMounted(() => {
    const isHideNotice = window.localStorage.getItem('isHideNotice');
    const isHideNotice2 = window.sessionStorage.getItem('isHideNotice');

    if (!isHideNotice && !isHideNotice2) {
      setTimeout(() => {
        dialogVisible.value = true;
      }, 1000);
    }
  });
  const close = () => {
    window.sessionStorage.setItem('isHideNotice', true);
    dialogVisible.value = false;
  };
</script>
