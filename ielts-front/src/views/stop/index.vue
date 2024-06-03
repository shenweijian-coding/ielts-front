<template>
  <div class="w-full h-full bg-theme/.9">
    <div class="mx-auto max-w-lg p-4 text-center mt-30">
      <!-- 公告框，最大宽度为sm，内边距为4 -->
      <div class="bg-white rounded-lg shadow-lg p-4">
        <a class="flex items-center text-2xl font-bold text-theme no-underline hover:no-underline" href="/#/main/book">
          <SvgIcon name="atx" class="hidden md:block" width="100" height="40" />
        </a>
        <!-- 公告内容的容器，背景为白色，圆角，阴影，内边距为6 -->
        <h2 class="text-2xl font-bold mb-2">温馨提示</h2>
        <!-- 公告标题 -->
        <p class="text-gray-700 line-height-relaxed">
          hi！尊敬的用户 <br />爱听写因备案原因该网址暂时停用，需要你换个网址登录。 <br />即日起你可以通过
          <a href="//www.dictation.top">www.dictation.top</a> 访问<br />
          当前账号的听写数据不会受影响</p
        >
        <!-- 公告内容 -->
      </div>
    </div>
  </div>
</template>
<script setup></script>
