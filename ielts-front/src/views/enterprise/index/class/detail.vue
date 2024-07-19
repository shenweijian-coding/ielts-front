<template>
  <div>
    <el-tabs v-model="state.activeTab" @tab-click="handleTabClick" class="flex h-12 w-full items-center justify-between">
      <el-tab-pane label="学生数据" :name="1" />
      <el-tab-pane label="班级词书" :name="2" />
    </el-tabs>
    <div v-if="state.activeTab == 1" class="mt-4">
      <el-form :model="state.form" size="small" label-width="70" :inline="true">
        <el-form-item>
          <el-radio-group v-model="state.form.type" size="small">
            <el-radio-button label="听写时长" :value="1" />
            <el-radio-button label="听写正确率" :value="2" />
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="state.form.type == 2">
          <el-select
            v-model="state.form.c_id"
            placeholder="书籍"
            style="width: 180px"
            @change="getErrorWords"
            clearable
            filterable
            size="small"
          >
            <el-option v-for="item in []" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="state.form.type == 2">
          <el-select
            v-model="state.form.c_id"
            placeholder="章节"
            style="width: 180px"
            @change="getErrorWords"
            clearable
            filterable
            size="small"
          >
            <el-option v-for="item in []" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="state.activeTab == 1" class="flex justify-between">
      <div class="flex-1 px-4 bg-white">
        <el-table size="small" :data="state.students" highlight-current-row @row-click="rowClick">
          <el-table-column prop="name" label="姓名" width="" align="center" />
          <el-table-column prop="remark" label="备注" width="" align="center">
            <template #default="scope">
              <div class="flex items-center justify-center">
                <span v-if="!scope.row.isEdit">1</span>
                <el-input
                  v-else
                  size="small"
                  v-model="scope.row.remark"
                  @enter="editRowFinish(scope.row)"
                  style="width: 100px"
                  placeholder="请输入备注"
                />&nbsp;
                <el-icon v-if="!scope.row.isEdit" class="cursor-pointer" @click="editRow(scope.row)" size="12"><EditPen /></el-icon>
                <el-icon v-else class="cursor-pointer" @click="editRowFinish(scope.row)" size="14"><CircleCheck /></el-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="today" label="今日时长" width="" align="center" />
          <el-table-column prop="count" label="累计时长" width="" align="center" />
          <!-- <el-table-column prop="error_num" label="听写数量" width="110" align="center" />
          <el-table-column prop="error_num" label="第一次完成正确率" width="110" align="center" />
          <el-table-column prop="error_num" label="最近一次正确率" width="110" align="center" /> -->
        </el-table>
      </div>
      <div class="w-2/7 ml-4 px-4 bg-white pt-2">
        <el-button :icon="Download" plain @click="handleDownloadExcel" size="small" class="float-right" />

        <el-table>
          <el-table-column prop="error_num" label="易错单词" width="" align="center" />
          <el-table-column prop="error_num" label="释义" width="110" align="center" />
          <el-table-column prop="error_num" label="错误次数" width="110" align="center" />
        </el-table>
      </div>
    </div>
    <div v-if="state.activeTab == 2">
      <div class="flex mt-8 px-1 pb-4 flex-wrap justify-between lg:justify-initial md:justify-initial">
        <div
          v-for="item in state.booksList"
          :key="item.id"
          class="group flex lg:h-36 w-[46%] lg:w-74 cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4"
          @click="openChapter(item)"
        >
          <div class="relative ml-1 lg:mt-2 flex h-full w-full flex-col items-start justify-start"
            ><h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:color-theme dark:text-gray-200">{{ item.name }}</h1>
            <p class="mb-2 font-bold text-gray-600 dark:text-gray-200">{{ item.word_total }} 词</p>
            <p class="mb-0.5 font-bold text-gray-600 dark:text-gray-200" v-if="item.chapter_total">{{ item.chapter_total }} 章</p>
            <div class="flex w-full items-center"><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20" /></div
          ></div>
        </div>
        <div
          class="group flex lg:h-36 w-[46%] lg:w-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4 flex-col"
          @click="openCustomDialog"
        >
          <el-icon size="40" color="gray"><Plus /></el-icon>
          <div class="mt-4">添加自定义词书</div>
        </div>
      </div>
    </div>
    <booksDialog ref="booksDialogRef" />
  </div>
</template>
<script setup>
  import { EditPen, CircleCheck, Plus, Download } from '@element-plus/icons-vue';
  import { getGroupBooks } from '@/api/book/index';
  import booksDialog from './components/booksDialog.vue';

  const state = reactive({
    activeTab: 1,
    form: {
      type: 1,
      bookId: 1,
      chapterId: 1,
    },
    students: [
      {
        name: '神伟建',
        remark: '11',
        today: 11,
        count: 11,
      },
    ],
    booksList: [],
  });
  const booksDialogRef = ref(null);

  const handleTabClick = () => {};
  const editRow = (row) => {
    row.isEdit = true;
  };
  const editRowFinish = (row) => {
    row.isEdit = false;
  };
  const rowClick = (row) => {
    console.log(row);
  };
  const getBooks = () => {
    getGroupBooks({ s_id: 2 })
      .then((res) => {
        state.booksList = res;
      })
      .catch(() => {});
  };
  const openCustomDialog = () => {
    booksDialogRef.value.open();
  };
  getBooks();
</script>
<style lang="less">
  /*去掉el-tab-pane底部灰色线条*/
  .el-tabs__nav-wrap::after {
    height: 0;
  }
</style>
