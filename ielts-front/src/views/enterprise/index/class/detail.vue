<template>
  <div>
    <div class="flex justify-between items-center">
      <el-tabs v-model="state.activeTab" @tab-click="handleTabClick" class="flex h-12 w-full items-center justify-between">
        <el-tab-pane label="学生数据" :name="1" />
        <el-tab-pane label="班级词书" :name="2" />
      </el-tabs>
      <div class="flex">
        <!-- <el-input size="small" style="width: 200px" readonly v-model="state.inviteUrl"/> -->
        <el-button size="small" type="primary" @click="getInviteClass(route.query.id)">复制邀请链接</el-button>
      </div>
    </div>
    <div v-if="state.activeTab == 1" class="mt-4">
      <el-form :model="state.form" size="small" label-width="70" :inline="true">
        <el-form-item>
          <el-radio-group v-model="state.form.type" size="small" @change="getStudentInfo">
            <el-radio-button label="听写时长" :value="1" />
            <el-radio-button label="听写正确率" :value="2" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="state.form.bookId"
            placeholder="选择书籍"
            style="width: 180px"
            @change="getChapter"
            clearable
            filterable
            size="small"
          >
            <el-option v-for="item in state.booksList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="state.form.chapterId"
            placeholder="先选择书籍，再选择章节"
            style="width: 180px"
            @change="getStudentInfo"
            clearable
            filterable
            size="small"
          >
            <el-option v-for="item in state.chapterList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="state.activeTab == 1" class="flex justify-between flex-col md:flex-row">
      <div class="md:flex-1 px-4 bg-white">
        <el-table size="small" :data="state.students" highlight-current-row @row-click="rowClick" :maxHeight="tableHeight">
          <el-table-column prop="name" label="" width="40" align="center">
            <template #default="scope">
              <el-icon class="cursor-pointer" @click.stop="deleteStu(scope.row)" size="12">
                <Delete />
              </el-icon>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="姓名" width="" align="left" /> -->
          <el-table-column prop="name" label="姓名" width="" align="left">
            <template #default="scope">
              <div class="flex items-center">
                <span v-if="!scope.row.isEdit">{{ scope.row.name }}</span>
                <el-input
                  v-else
                  size="small"
                  v-model="scope.row.name"
                  @enter="editRowFinish(scope.row)"
                  style="width: 100px"
                  placeholder="请输入备注"
                />&nbsp;
                <el-icon v-if="!scope.row.isEdit" class="cursor-pointer" @click.stop="editRow(scope.row)" size="12">
                  <EditPen />
                </el-icon>
                <el-icon v-else class="cursor-pointer" @click.stop="editRowFinish(scope.row)" size="14">
                  <CircleCheck />
                </el-icon>
              </div>
            </template>
          </el-table-column>
          <template v-if="state.form.type == 1">
            <el-table-column prop="today_time" label="今日时长(min)" width="" align="center">
              <template #default="scope">
                {{ Math.floor(scope.row.today_time / 60) }}
              </template>
            </el-table-column>
            <el-table-column prop="cumulative_time" label="累计时长(min)" width="" align="center">
              <template #default="scope">
                {{ Math.floor(scope.row.cumulative_time / 60) }}
              </template>
            </el-table-column>
          </template>
          <template v-if="state.form.type == 2">
            <el-table-column prop="complete_lexicon_count" label="听写数量" width="110" align="center" />
            <el-table-column prop="first_accuracy" label="第一次完成正确率" width="" align="center">
              <template #default="scope"> {{ scope.row.first_accuracy }}% </template>
            </el-table-column>
            <el-table-column prop="last_accuracy" label="最近一次正确率" width="110" align="center">
              <template #default="scope"> {{ scope.row.last_accuracy }}% </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="md:w-2/7 w-full md:ml-4 md:px-4 bg-white md:pt-2 pb-4 mt-10 md:mt-0">
        <template v-if="state.currentStuInfo">
          <el-button v-if="state.errorWords?.length" :icon="Download" plain @click="handleDownloadExcel" size="small" class="float-right" />

          <el-table size="small" :data="state.errorWords">
            <el-table-column prop="word" label="单词" width="" align="center" />
            <el-table-column prop="error_word" label="错误拼写" width="" align="center" />
            <el-table-column prop="translate" label="释义" width="110" align="center" />
            <el-table-column prop="error_num" label="错误次数" width="110" align="center" />
          </el-table>
        </template>
        <el-empty v-else description="请选择学生" :image-size="50" />
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
          <div class="relative ml-1 lg:mt-2 flex h-full w-full flex-col items-start justify-start">
            <h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:color-theme dark:text-gray-200">{{ item.name }}</h1>
            <p class="mb-2 font-bold text-gray-600 dark:text-gray-200">{{ item.word_total }} 词</p>
            <p class="mb-0.5 font-bold text-gray-600 dark:text-gray-200" v-if="item.chapter_total">{{ item.chapter_total }} 章</p>
            <div class="flex w-full items-center"
              ><img src="@/assets/images/book.png" class="absolute right-3 top-3 w-16 opacity-20"
            /></div>
          </div>
        </div>
        <div
          class="group flex lg:h-36 w-[46%] lg:w-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4 flex-col"
          @click="openCustomDialog"
        >
          <el-icon size="40" color="gray">
            <Plus />
          </el-icon>
          <div class="mt-4">添加词书</div>
        </div>
      </div>
    </div>
    <Loading :loading="loading" />
    <ChapterDialog ref="ChapterDialogRef" />

    <booksDialog ref="booksDialogRef" @ok="getBooks" />
  </div>
</template>
<script setup>
  import { EditPen, CircleCheck, Plus, Download, Delete } from '@element-plus/icons-vue';
  import { getGroupBooks, getChapterList } from '@/api/book/index';
  import booksDialog from './components/booksDialog.vue';
  import { getStudentList, updateStudentInfo, delStudent, getInviteCode, getStudenErrWords } from '@/api/company/index';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { useRoute } from 'vue-router';
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';
  import ChapterDialog from '@/views/gallery/book/chapter-dialog.vue';
  import { useInvite } from '../../useCommon.js';
  import * as XLSX from 'xlsx';

  const { getInviteClass } = useInvite();

  const { loading, setLoading } = useLoading();
  const ChapterDialogRef = ref(null);
  const screenWidth = ref(window.innerWidth); // 获取当前屏幕宽度
  const screenHeight = ref(window.innerHeight); // 获取当前屏幕宽度

  const route = useRoute();
  const state = reactive({
    activeTab: 1,
    form: {
      type: 1,
      bookId: '',
      chapterId: '',
    },
    students: [],
    booksList: [],
    chapterList: [],
    errorWords: [],
    currentStuInfo: null,
  });
  const booksDialogRef = ref(null);

  const tableHeight = computed(() => {
    if (screenWidth.value < 768) {
      // return 'small';
      return screenHeight.value - 250;
    } else {
      return screenHeight.value - 150;
      // return 'large';
    }
  });

  const handleTabClick = () => {};
  const editRow = (row) => {
    row.isEdit = true;
  };
  const editRowFinish = (row) => {
    updateStudentInfo({
      id: row.id,
      name: row.name,
    }).then((res) => {
      row.isEdit = false;
      getStudentInfo();
    });
  };
  const rowClick = (row) => {
    state.currentStuInfo = row;
    getStudenErrWords({
      user_id: row.user_id,
      c_id: state.form.chapterId,
    }).then((res) => {
      console.log(res);
      state.errorWords = res;
    });
  };
  const getBooks = () => {
    if (!route.query.id) {
      return;
    }
    getGroupBooks({ s_id: 5, class_id: +route.query.id })
      .then((res) => {
        state.booksList = res;
      })
      .catch(() => {});
  };

  const getStudentInfo = () => {
    setLoading(true);
    getStudentList({
      type: state.form.type,
      c_id: state.form.chapterId,
      class_id: +route.query.id,
      page: 1,
      pagesize: 9999,
    })
      .then((res) => {
        setLoading(false);
        state.students = res.data;
        state.currentStuInfo = null;
        if (res.data?.length) {
          rowClick(res.data[0]);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const getChapter = (id) => {
    setLoading(true);
    getChapterList({ g_id: id })
      .then((res) => {
        setLoading(false);
        state.chapterList = res;
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const openChapter = (item) => {
    setLoading(true);
    getChapterList({ g_id: item.id })
      .then((res) => {
        // galleryState.chapterList = res;
        if (res.length) {
          setLoading(false);
          ChapterDialogRef.value.open(item, res);
        } else {
          ElMessage.warning('未配置词库');
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const deleteStu = (item) => {
    ElMessageBox.confirm(`确定移除 ${item.name} 吗`, '提示', {
      confirmButtonText: '移除',
      cancelButtonText: '取消',
      type: 'warning',
      distinguishCancelAndClose: true,
    }).then((res) => {
      delStudent({
        id: item.id,
      }).then((res) => {
        getStudentInfo();
      });
    });
  };
  // const getInviteClass = () => {
  //   if (!route.query.id) {
  //     return;
  //   }
  //   getInviteCode({
  //     type: 'school_class',
  //     foreign_id: +route.query.id,
  //   }).then((res) => {
  //     console.log(res);
  //     state.inviteUrl = `${window.location.origin}/#/jc?code=${res.code}&sign=${res.sign}`;
  //   });
  // };
  // getInviteClass();
  const openCustomDialog = () => {
    booksDialogRef.value.open(route.query.id);
  };
  const handleDownloadExcel = () => {
    const exportData = [];
    state.errorWords.forEach((it) => {
      exportData.push({
        易错单词: it?.error_word,
        时间: it?.created_at,
        释义: it?.lexicon.phonetic_transcriptions,
        错误次数: it?.error_num,
      });
    });
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workBook, workSheet);
    XLSX.writeFile(workBook, `${state.currentStuInfo?.name}_错题记录.xlsx`, {
      bookType: 'xlsx',
    });
  };
  getStudentInfo();
  getBooks();
</script>
<style lang="less">
  /*去掉el-tab-pane底部灰色线条*/
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-empty {
    padding: 20px 0;
  }
</style>
