<template>
  <div>
    <el-dialog v-model="dialogVisible" title="温馨提示" width="400">
      <p style="line-height: 26px">
        hi！尊敬的用户<br />爱听写因备案原因，需要你换个网址登录。<br />即日起你可以通过
        <a href="//www.dictation.top">www.dictation.top</a>
        访问<br />当前账号的听写数据不会受影响。<br />现网址从5月31日开始停用。请及时保存新网址。
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
    const domain = window.location.hostname;
    console.log(domain, '1');
    if (!isHideNotice && !isHideNotice2 && domain == 'idictation.cn') {
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
