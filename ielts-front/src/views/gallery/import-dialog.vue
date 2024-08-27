<template>
  <el-dialog v-model="state.dialogVisible" :width="({1: '90%',2: '70%', 3: '40%'})[deviceSize]" :before-close="handleClose">
    <div class="pt-6">
      <el-form ref="formRef" :model="state.form" label-width="120" :rules="state.rules">
        <el-form-item label="单词书名称" prop="title">
          <el-input placeholder="最多输入9个字" v-model="state.form.title" />
        </el-form-item>
        <el-form-item label="每章节单词数" prop="word_count">
          <el-radio-group v-model="state.form.word_count">
            <el-radio-button v-for="item in state.numOption" :key="item" :label="item" :value="item">{{ item }}个</el-radio-button>
          </el-radio-group>
          <br />
        </el-form-item>
        <el-form-item label="单词" prop="data">
          <el-input
            placeholder="一行一个，不用输入中文释义，示例如下&#13;apple&#13;ablity&#13;air"
            type="textarea"
            v-model="state.form.data"
            :rows="6"
          />
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
  import { uploadBook, updateBook, getWordList } from '@/api/book/index';
  import { ElMessage } from 'element-plus';
  import { useDrawerWith } from '@/views/home/useLogic.js'

  const { deviceSize, countWidth } = useDrawerWith()

  const emits = defineEmits(['ok']);
  const formRef = ref(null);
  const state = reactive({
    book: {},
    dialogVisible: false,
    isEdit: false,
    form: {
      title: '',
      word_count: 15,
      data: '',
    },
    numOption: [15, 30, 50, 100, 200],
    rules: {
      title: [{ required: true, message: '单词书名称', trigger: 'blur' }],
      word_count: [{ required: true, message: '数量', trigger: 'change' }],
      data: [{ required: true, message: '输入单词', trigger: 'blur' }],
    },
  });

  const open = (info) => {
    if(info) {
      state.book = info.book
      state.isEdit = true
      state.form.title = info.book.name
      info.list.forEach(item => {
        getWordList({ s_id: info.book.id, c_id: item.id }).then(res => {
          state.form.data += res.data.map(word => word.word).join('\n')
        })
      });
    }
    state.dialogVisible = true;
  };

  const handleClose = () => {
    formRef.value && formRef.value.clearValidate()
    state.form = {
      title: '',
      word_count: 15,
      data: '',
    },
    state.isEdit = false
    state.dialogVisible = false;
  };

  const handleConfirm = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit!');
        const data = state.form.data.split('\n');
        const requestApi = state.isEdit ? updateBook : uploadBook
        requestApi({
          title: state.form.title,
          word_count: state.form.word_count,
          data: data,
        }, state.isEdit ? state.book.id : 0).then(() => {
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
