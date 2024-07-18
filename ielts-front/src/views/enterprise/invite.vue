<template>
  <div class="container mx-auto flex h-screen items-center justify-center">
    <div class="card md:w-120 w-4/5 p-6 rounded-lg bg-white card-info">
      <div class="card-content">
        <h2 class="card-title text-xl font-bold text-left leading-10">邀请同事共同体验爱听写</h2>
        <span class="card-text text-gray-500 text-center text-df leading-5">大家可通过下方链接轻松加入你的企业或组织</span>
      </div>
      <div class="card-info-get mt-7">
        <el-input placeholder="请输入企业或组织名称" size="large" />
        <el-button class="w-full mt-10" type="primary" size="large">复制邀请链接</el-button>
        <el-button class="w-full mt-6" type="" size="large">进入企业</el-button>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
  .card-info {
    border: 1px solid var(#eaecf0);
    box-shadow: rgba(22, 14, 45, 0.02) 0px 0px 40px, rgba(22, 14, 45, 0.06) 0px 0px 104px;
  }
  .el-button {
    margin-left: 0;
  }
</style>
