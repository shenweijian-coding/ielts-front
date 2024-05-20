<template>
  <div class="login-form-wrapper">
    <!-- <div class="login-form-title">欢迎登录</div>
    <div class="login-form-sub-title">爱听写·让语言学习更高效</div> -->
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <el-form ref="ruleFormRef" :model="userFormData" class="login-form" layout="vertical" :rules="rules" size="large">
      <el-form-item
        prop="phone_number"
        :rules="[{ required: true, message: '手机号不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <el-input v-model="userFormData.phone_number" placeholder="手机号" />
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <el-input v-model="userFormData.password" placeholder="密码" allow-clear type="password" />
      </el-form-item>
      <el-button type="primary" @click="handleSubmit(ruleFormRef)">登录</el-button>
      <el-button type="text" class="forget-pwd" @click="handleToChangePwd">忘记密码?</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { useUserStore } from '@/store';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const errorMessage = ref('');
  const userStore = useUserStore();
  const userFormData = reactive({
    phone_number: '',
    password: '',
  });
  const ruleFormRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    phone_number: [
      {
        required: true,
        message: '手机号不能为空',
      },
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
      },
    ],
  });

  const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
      console.log(valid);
      if (valid) {
        await userStore.login(userFormData);
        ElMessage.success('登录成功');
        router.push('/main');
      } else {
        ElMessage.error('错误信息:请填写手机号和密码');
      }
    });
  };

  const handleToChangePwd = () => {
    router.push('/forgetPassword');
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 300px;
    }

    &-title {
      color: var(--color-text-1);
      font-size: 30px;
      font-weight: bold;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 20px;
      line-height: 30px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }

  :deep(.el-button) {
    display: block;
    width: 100%;
    margin-bottom: 10px;

    & + .el-button {
      margin-left: 0;
    }
  }

  .forget-pwd {
    float: right;
    width: auto;
    margin: 0;
    padding: 0;
  }
</style>
