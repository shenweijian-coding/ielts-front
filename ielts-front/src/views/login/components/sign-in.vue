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
      <el-form-item prop="code" :rules="[{ required: true, message: '验证码不能为空' }]" :validate-trigger="['change', 'blur']" hide-label>
        <el-input v-model="userFormData.code" placeholder="验证码" allow-clear>
          <template #append>
            <span class="cursor-pointer" @click="senYzm" :disabled="countingDown">{{
              countingDown ? `${countdown} 秒` : '发送验证码'
            }}</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <el-input v-model="userFormData.password" placeholder="密码" allow-clear type="password" />
      </el-form-item>
      <el-button type="primary" @click="handleSubmit(ruleFormRef)">注册</el-button>
      <el-button type="text" class="forget-pwd" @click="handleToChangePwd" />
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  // import { useUserStore } from '@/store';
  import { sendyzm, signup } from '@/api/user/index';

  const router = useRouter();
  const errorMessage = ref('');
  // const userStore = useUserStore();

  const emit = defineEmits(['toggle']);
  const countdown = ref(60);
  const countingDown = ref(false);

  const userFormData = reactive({
    phone_number: '',
    code: '12345',
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
      if (valid) {
        signup({
          phone_number: +userFormData.phone_number,
          code: userFormData.code,
          password: userFormData.password,
        }).then(() => {
          emit('toggle');
          ElMessage.success('恭喜您，注册成功！');
        });
      } else {
        ElMessage.error('错误信息:请填写手机号、验证码、密码');
      }
    });
  };

  const handleToChangePwd = () => {
    router.push('/#/forgetPassword');
  };

  let timer;
  // 发送验证码
  const senYzm = () => {
    if (countingDown.value) {
      return;
    }
    if (!userFormData.phone_number) {
      ElMessage.error('错误信息：请补充手机号');
      return;
    }
    sendyzm({
      phone_number: userFormData.phone_number,
      action: 'code',
    })
      .then(() => {
        ElMessage.success('发送成功，请注意查看');
        countingDown.value = true;
        countdown.value = 60;

        timer = setInterval(() => {
          countdown.value--;
          if (countdown.value === 0) {
            countingDown.value = false;
            clearInterval(timer);
          }
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
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
