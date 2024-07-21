<template>
  <div class="container mx-auto flex h-screen items-center justify-center">
    <div class="card md:w-120 w-4/5 p-6 rounded-lg bg-white card-info">
      <div class="card-content">
        <h2 class="card-title text-xl font-bold text-left leading-10">设置企业信息</h2>
        <span class="card-text text-gray-500 text-center text-df leading-5"
          >注册新企业或组织，并填写真实信息在爱听写轻松掌握学生学习情况</span
        >
      </div>
      <div class="card-info-get mt-7">
        <el-input placeholder="请输入企业或组织名称" size="large" v-model="state.enterprise_name" />
        <el-input placeholder="请输入姓名" class="mt-6" size="large" v-model="state.name" />
        <el-button class="w-full mt-10" type="primary" size="large" @click="apply">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { addEnterpriseInfo } from '@/api/company/index';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const state = reactive({
    enterprise_name: '',
    name: '',
  });
  const apply = () => {
    if (!state.enterprise_name || !state.name) {
      ElMessage.warning('请填写信息');
      return;
    }
    addEnterpriseInfo({
      enterprise_name: state.enterprise_name,
      name: state.name,
    }).then((res) => {
      ElMessage.success('申请成功');
      router.push('/company/invite');
    });
  };
</script>
<style lang="less" scoped>
  .card-info {
    border: 1px solid var(#eaecf0);
    box-shadow: rgba(22, 14, 45, 0.02) 0px 0px 40px, rgba(22, 14, 45, 0.06) 0px 0px 104px;
  }
</style>
