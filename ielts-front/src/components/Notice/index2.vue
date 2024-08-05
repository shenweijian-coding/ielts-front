<template>
  <div>
    <el-dialog v-model="dialogVisible" title="" width="600" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" center>
      <p style="line-height: 26px" class="text-bold text-xl">
        您的 Safari浏览器版本过低，会导致功能无法使用。建议您使用最新版本的chrome浏览器或更新safari浏览器至最新版本。
      </p>
      <template #footer>
        <div class="flex justify-end">
          <el-button type="" @click="toUrl('https://www.google.cn/intl/zh-CN/chrome/')" class="ml-5"> 下载chrome </el-button>
          <el-button type="primary" @click="toUrl('https://support.apple.com/zh-cn/102665')" class="ml-5"> 更新safari </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
const dialogVisible = ref(false)
  const checkBrowserVersion = () => {
    const userAgent = window.navigator.userAgent;
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const safariVersion = userAgent.match(/version\/(\d+)/i);
    if (isSafari && safariVersion && parseInt(safariVersion[1], 10) <= 13) {
      dialogVisible.value = true
    }
  }
  onMounted(() => {
    checkBrowserVersion()
  });
  const toUrl = (url) => {
    window.location.href = url
  }
  const close = () => {

  };
</script>
