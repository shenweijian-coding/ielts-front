<template>
  <div class="content-inner bg-white">
    <div v-if="step == 1" class="login-form-wrapper">
      <div class="text-bold">重置密码</div>
      <div class="login-form-error-msg">{{ errorMessage }}</div>
      <el-form ref="ruleFormRef" :model="userFormData" class="login-form" layout="vertical" :rules="rules" size="large">
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: '手机号不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <el-input v-model="userFormData.username" placeholder="手机号" />
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[{ required: true, message: '验证码不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <el-input v-model="userFormData.password" placeholder="验证码" allow-clear>
            <template #append>
              <el-button style="margin: 0; padding: 0" type="primary" @click="senYzm">发送验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="handleNuxt(ruleFormRef)">下一步</el-button>
        <el-button type="text" class="forget-pwd" @click="handleToChangePwd" />
      </el-form>
    </div>
    <div v-if="step == 2" class="login-form-wrapper">
      <div class="text-bold">重设您的账号密码</div>
      <div class="login-form-error-msg">{{ errorMessage }}</div>
      <el-form ref="ruleFormRef" :model="userFormData" class="login-form" layout="vertical" :rules="rules" size="large">
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: '手机号不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <el-input v-model="userFormData.username" placeholder="手机号" />
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[{ required: true, message: '验证码不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <el-input v-model="userFormData.password" placeholder="验证码" allow-clear>
            <template #append>
              <el-button style="margin: 0; padding: 0" type="primary" @click="senYzm">发送验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">提交</el-button>
        <el-button type="text" class="forget-pwd" @click="handleToChangePwd" />
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { useUserStore } from '@/store';

  const router = useRouter();
  const errorMessage = ref('');
  const userStore = useUserStore();
  const step = ref('1');

  const userFormData = reactive({
    username: '',
    password: '',
  });
  const ruleFormRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    username: [
      {
        required: true,
        message: '手机号不能为空',
      },
    ],
    password: [
      {
        required: true,
        message: '验证码不能为空',
      },
    ],
  });

  const handleNuxt = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
      console.log(valid);
      if (valid) {
        // await userStore.login(userFormData);
        step.value = 2;
        router.push('/');
      } else {
        ElMessage.error('错误信息:请填写手机号和验证码');
      }
    });
  };
  const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
      console.log(valid);
      if (valid) {
        await userStore.login(userFormData);
        await userStore.info();
        router.push('/');
      } else {
        ElMessage.error('错误信息:请填写手机号和验证码');
      }
    });
  };

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
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
      font-weight: 500;
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
  .content-inner {
    transform: translate(-50%, -50%);
    top: 40%;
    position: absolute;
    left: 50%;
    width: max-content;
    padding: 30px;
    box-shadow: 0 20px 50px 0 hsla(0, 0%, 64%, 0.1);
  }
</style>
