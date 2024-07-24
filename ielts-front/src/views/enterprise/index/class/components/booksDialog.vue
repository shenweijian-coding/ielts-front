<template>
  <el-dialog v-model="state.visable" width="500" :before-close="handleClose">
    <div>
      <el-tabs v-model="state.activeTab" @tab-click="handleTabClick" class="flex h-12 w-full items-center justify-between">
        <el-tab-pane label="企业资源库" :name="1" />
        <el-tab-pane label="爱听写词库" :name="2" />
        <el-tab-pane label="自定义添加" :name="3" />
      </el-tabs>

      <!-- <div v-if="state.activeTab == 1" class="h-100"> 企业资源库 </div> -->
      <div v-if="state.activeTab == 2 || state.activeTab == 1" class="h-100">
        <div>
          <template v-if="state.activeTab == 2">
            <el-select
              v-model="state.form.l_id"
              placeholder="请选择"
              style="width: 100px"
              filterable
              size="small"
              @change="(c_id) => getScene(1, c_id)"
            >
              <el-option v-for="item in state.categoryList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-select
              v-model="state.form.c_id"
              placeholder="请选择"
              style="width: 180px"
              filterable
              size="small"
              class="ml-2"
              @change="(s_id) => getBooks(s_id)"
            >
              <el-option v-for="item in state.sceneList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </template>
          <el-table class="mt-2" size="small" :data="state.booksList" height="320" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="30" />
            <el-table-column prop="name" label="书籍名" width="" align="center" />
            <el-table-column prop="chapter_total" label="章节数" align="center" width="90" />
            <el-table-column prop="word_total" label="总计词数" align="center" width="90" />
          </el-table>
          <div class="flex justify-end items-center mt-4">
            <el-button type="primary" size="small" @click="submit">确认</el-button>
          </div>
        </div>
      </div>

      <div v-if="state.activeTab == 3" class="h-100">
        <div class="">
          <el-form ref="formRef" :model="state.form2" label-width="90" :rules="state.rules" size="small">
            <el-form-item label="单词书名称" prop="title">
              <el-input placeholder="最多输入9个字" v-model="state.form2.title" />
            </el-form-item>
            <el-form-item label="每章节单词数" prop="word_count">
              <el-radio-group v-model="state.form2.word_count">
                <el-radio-button v-for="item in state.numOption" :key="item" :label="item" :value="item">{{ item }}个</el-radio-button>
              </el-radio-group>
              <br />
              <!-- <div>若上传1000个单词，选中【50个】，将自动为您划分20个章节</div> -->
            </el-form-item>
            <el-form-item label="单词" prop="data">
              <el-input
                placeholder="一行一个，不用输入中文释义，示例如下&#13;apple&#13;ablity&#13;air"
                type="textarea"
                v-model="state.form2.data"
                :rows="14"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="flex justify-end items-center mt-4">
          <el-button type="primary" size="small">确认</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { getSceneList, getGroupBooks, getChapterList, getLanguageList, getCategoryList } from '@/api/book/index';
  import { uploadClassBook } from '@/api/company/index';
  import { ElMessage } from 'element-plus';

  const emits = defineEmits(['ok'])
  const state = reactive({
    activeTab: 2,
    visable: false,
    categoryList: [],
    sceneList: [],
    booksList: [],
    form: {
      l_id: '',
      c_id: '',
    },
    form2: {
      title: '',
      word_count: 15,
      data: '',
    },
    numOption: [15, 30, 50, 100, 200],
    selBooks: [],
    selWords: [],
    class_id: '',
  });

  const open = (class_id) => {
    getCategory();
    state.class_id = class_id;
    state.visable = true;
  };
  const handleTabClick = ({ paneName }) => {
    console.log(paneName);
    if (paneName == 1) {
      getBooks(4);
    } else {
      getBooks(state.form.c_id);
    }
  };

  const getCategory = (l_id = 1) => {
    getCategoryList({
      l_id: l_id,
    }).then((res) => {
      state.categoryList = res;
      state.form.l_id = res[0].id;
      if (res.length) {
        getScene(l_id, res[0].id);
      } else {
        state.booksList = [];
      }
    });
  };

  const getScene = (l_id, c_id) => {
    getSceneList({
      l_id: l_id,
      c_id: c_id,
    }).then((res) => {
      state.sceneList = res;
      if (res.length) {
        state.form.c_id = res[0].id;
        getBooks(res[0].id);
      } else {
        state.booksList = [];
      }
    });
  };

  const getBooks = (s_id) => {
    getGroupBooks({ s_id: s_id })
      .then((res) => {
        state.booksList = res;
      })
      .catch(() => {});
  };

  const handleClose = () => {
    state.visable = false;
    state.selBooks = [];
  };
  const submit = () => {
    const typeMap = {
      1: 'enterprise',
      2: 'idictation',
      3: 'custom',
    };
    const ids = state.selBooks.map((book) => book.id);
    uploadClassBook({
      type: typeMap[state.activeTab],
      class_id: +state.class_id,
      group_ids: JSON.stringify(ids),
    }).then((res) => {
      handleClose();
      emits('ok')
    });
  };
  // getCompanyBooks();
  const handleSelectionChange = (val) => {
    state.selBooks = val;
  };
  defineExpose({
    open,
  });
</script>
