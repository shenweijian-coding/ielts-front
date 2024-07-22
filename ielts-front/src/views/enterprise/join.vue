<template>
  <div class="container mx-auto flex h-screen items-center justify-center">
    <div class="card md:w-120 w-4/5 p-6 rounded-lg bg-white card-info">
      <div class="card-content">
        <h2 class="card-title text-xl font-bold text-center leading-10">{{state.inviteInfo.manager_name}} 邀请你加入</h2>
        <h2 class="card-title text-xl font-bold text-center leading-10">{{state.inviteInfo.nickname}}</h2>
        <!-- <span class="card-text text-gray-500 text-center text-df leading-5">北京爱听写公司</span> -->
      </div>
      <div class="card-info-get mt-7">
        <el-input placeholder="请输入姓名" size="large" v-model="state.name" />
        <el-button class="w-full mt-10" type="primary" size="large" @click="join" :loading="state.loading">进入企业</el-button>
        <!-- <el-button class="w-full mt-6" type="" size="large">进入企业</el-button> -->
      </div>
    </div>
  </div>
</template>
<script setup>
  import { joinEnterprise, getInviteInfo } from '@/api/company/index';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';

  const state = reactive({
    name: '',
    loading: false,
    inviteInfo: {
      nickname: '',
      manager_name: ''
    }
  });
  const route = useRoute();
  const router = useRouter();
  const join = () => {
    console.log(route);
    const code = route.query.code;
    const sign = route.query.sign;
    if (!code || !sign) {
      ElMessage.warning('缺少邀请参数');
      return;
    }
    if (!state.name) {
      ElMessage.warning('请填写姓名');
      return;
    }
    state.loading = true
    joinEnterprise({
      name: state.name,
      code: code,
      sign: sign,
    }).then((res) => {
      state.loading = false
      router.replace('/main/book');
    }).catch(err => {
      state.loading = false
    });
  };
  const getInfo = (code) => {
    getInviteInfo({ code: route.query.code }).then(res => {
      state.inviteInfo = res
    })
  }
  getInfo()
</script>
<style lang="less" scoped>
  .card-info {
    border: 1px solid var(#eaecf0);
    box-shadow: rgba(22, 14, 45, 0.02) 0px 0px 40px, rgba(22, 14, 45, 0.06) 0px 0px 104px;
  }
  .el-button {
    margin-left: 0;
  }
</style>
