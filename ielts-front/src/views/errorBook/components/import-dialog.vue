<template>
  <el-dialog v-model="state.dialogVisible" :width="({1: '90%', 2: '70%', 3: '500px'})[deviceSize]" :before-close="handleClose">
    <div class="pt-6">
      <el-form ref="formRef" :model="state.form" label-width="100" :rules="state.rules">
        <el-form-item label="单词书名称" prop="title">
          <el-input placeholder="最多输入9个字" v-model="state.form.title" />
        </el-form-item>
        <el-form-item label="单词数" prop="word_count">
          <el-radio-group v-model="state.form.word_count">
            <el-radio-button v-for="item in state.numOption" :key="item" :label="item" :value="item">{{ item }}个</el-radio-button>
          </el-radio-group>
          <br />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
  import { bookAdd } from '@/api/book/index';
  import { ElMessage } from 'element-plus';
  import { useDrawerWith } from '@/views/home/useLogic.js'

  const { deviceSize, countWidth } = useDrawerWith()

  const emits = defineEmits(['ok']);

  const formRef = ref(null);

  const state = reactive({
    dialogVisible: false,
    form: {
      title: '',
      word_count: 15,
    },
    numOption: [15, 30, 50, 100, 200],
    rules: {
      title: [{ required: true, message: '单词书名称', trigger: 'blur' }],
      word_count: [{ required: true, message: '数量', trigger: 'change' }],
    },
  });

  const open = () => {
    state.dialogVisible = true;
  };

  const handleClose = () => {
    // formRef.value && formRef.value.resetField()
    formRef.value && formRef.value.clearValidate();
    state.form = {
      title: '',
      word_count: 15,
      data: '',
    }
    state.dialogVisible = false
  };

  const handleConfirm = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit!');
        bookAdd({
          title: state.form.title,
          word_count: state.form.word_count,
        }).then(() => {
          // console.log(res);
          ElMessage.success(`操作成功`);
          emits('ok');
        });
        handleClose();
      }
    });
  };

  defineExpose({
    open,
  });
</script>
