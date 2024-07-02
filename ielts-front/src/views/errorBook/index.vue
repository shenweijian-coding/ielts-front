<template>
  <div class="flex w-full flex-1 select-text items-start justify-center overflow-hidden">
    <div class="flex h-full w-full flex-col">
      <div class="pt-2">
        <el-form :model="state.form" :size="formSize" label-width="70" :inline="true">
          <el-form-item label="">
            <el-radio-group v-model="state.form.errTime" @change="getErrorWords">
              <el-radio-button v-for="o in state.errTimeOption" :key="o.id" :value="o.id" :label="o.id">{{ o.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <el-radio-group v-model="state.form.error_num" @change="getErrorWords">
              <el-radio-button v-for="o in state.errNumOption" :key="o.num" :value="o.num" :label="o.num">{{ o.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <el-select
              v-model="state.form.c_id"
              :placeholder="appStore?.dictationInfo?.booInfo.name || '全部章节'"
              style="width: 180px"
              @change="getErrorWords"
              clearable
              filterable
            >
              <el-option v-for="item in chapterList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="px-4 bg-white pt-4">
        <div class="lg:flex justify-end pb-1 items-center">
          <div
            >共{{ state.page.total }}个，当前已选 <span class="color-theme">{{ state.selWords.length }}</span> 个&nbsp;</div
          >
          <div class="space-x-4">
            <el-button :icon="Download" plain @click="handleDownloadExcel" />
            <el-button type="" :icon="Delete" plain @click="handleWordSign" />
            <el-button type="" :icon="Star" plain @click="handleWordCollect" />
            <el-button @click="handleSelWords" type="primary">听写已选中错词</el-button>
          </div>
        </div>
        <el-table
          ref="tableRef"
          :data="state.tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          :maxHeight="tableHeight"
          @row-click="rowClick"
        >
          <el-table-column type="selection" width="30" />
          <el-table-column prop="lexicon" label="单词" minWidth="140">
            <template #header="scope">
              <div class="flex items-center">
                单词&nbsp;
                <el-icon @click="troggleView('word')" class="cursor-pointer">
                  <View v-if="state.hideProps.word" />
                  <Hide v-else />
                </el-icon>
              </div>
            </template>
            <template #default="scope">
              <template v-if="!state.hideProps.word">
                <span class="flex items-center cursor-pointer"
                  >{{ scope.row.lexicon.word }}<el-icon @click="play(scope.row)" class="ml-2"><Headset /></el-icon>
                </span>
                <span v-if="scope.row.lexicon?.phonetic_transcription" class="flex items-center cursor-pointer"
                  >{{ scope.row.lexicon?.phonetic_transcription }}
                </span>
              </template>
              <span v-else>***</span>
            </template>
          </el-table-column>
          <el-table-column prop="lexicon" label="释义" align="center" minWidth="280">
            <template #header="scope">
              <div class="flex items-center">
                释义&nbsp;
                <el-icon @click="troggleView('translate')" class="cursor-pointer">
                  <View v-if="state.hideProps.translate" />
                  <Hide v-else />
                </el-icon>
              </div>
            </template>
            <template #default="scope">
              <template v-if="!state.hideProps.translate">
                <div
                  class="text-left"
                  v-html="
                    scope.row.lexicon?.translate?.replace(/([A-Za-z]+)\./g, function (match, p1, offset) {
                      if (offset) {
                        return '<br>' + p1 + '.';
                      }
                      return p1 + '.';
                    })
                  "
                >
                </div>
              </template>
              <span v-else>***</span>
            </template>
          </el-table-column>
          <el-table-column prop="error_num" label="错误次数" sortable="custom" width="110" align="center" />
          <el-table-column prop="error_word" label="错误拼写" width="180" align="center" />
          <!-- <el-table-column prop="lexicon_group.name" label="词典" width="90" align="center" /> -->
          <el-table-column prop="chapter.name" label="章节" width="80" align="center" />
          <el-table-column prop="updated_at" label="错误时间" sortable="custom" width="100" align="center">
            <template #default="scope">
              {{ scope.row.updated_at.split(' ')[0] }}
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="py-5 flex justify-end">
          <el-pagination
            background
            v-model:current-page="state.page.currentPage"
            layout="prev, pager, next, sizes"
            :total="state.page.total"
            :page-size="state.page.pageSize"
            :page-sizes="[20, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="getErrorWords"
          />
        </div> -->
      </div>
    </div>
    <!-- <LastPage /> -->
    <Loading :loading="loading" />
    <tabbar />
    <collectDialog ref="collectRef" @addBook="addBook" />
    <ImportDialog ref="ImportDialogRef" @ok="addBookComplete" />
  </div>
</template>
<script setup lang="jsx">
  import { getErrorWordList, wordLabel } from '@/api/book/index';
  import { useAppStore, useUserStore } from '@/store';
  import { Headset, Download, Hide, View, Delete, Star } from '@element-plus/icons-vue';
  import LastPage from '@/components/lastPage/index.vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import dayjs from 'dayjs';
  import { useRouter, useRoute } from 'vue-router';
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';
  import * as XLSX from 'xlsx';
  import tabbar from '@/components/tabBar/index.vue';
  import collectDialog from './components/collect-dialog.vue';
  import ImportDialog from './components/import-dialog.vue';

  const appStore = useAppStore();
  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();
  const { loading, setLoading } = useLoading();

  const tableRef = ref(null);
  const collectRef = ref(null);
  const ImportDialogRef = ref(null);
  const screenWidth = ref(window.innerWidth); // 获取当前屏幕宽度
  const screenHeight = ref(window.innerHeight); // 获取当前屏幕宽度

  const formSize = computed(() => {
    if (screenWidth.value < 768) {
      return 'small';
    } else {
      return 'default';
    }
  });
  const tableHeight = computed(() => {
    if (screenWidth.value < 768) {
      // return 'small';
      return screenHeight.value - 200;
    } else {
      return screenHeight.value - 210;
      // return 'large';
    }
  });
  const state = reactive({
    form: {
      errTime: 0,
      error_num: 0,
      c_id: undefined,
      sort: undefined,
      sort_type: undefined,
    },
    errTimeOption: [
      { name: '全部', id: 0 },
      { name: '最近听写错词', id: 3 },
      { name: '今日错词', id: 1 },
      { name: '近七天错词', id: 2 },
    ],
    errNumOption: [
      { name: '全部', num: 0 },
      { name: '错误2次及以上', num: 2 },
      { name: '错误3次及以上', num: 3 },
    ],
    chapterList: [],
    tableData: [],
    selWords: [],
    page: {
      total: 0,
      pageSize: 9999,
      currentPage: 1,
    },
    hideProps: {
      word: false,
      translate: false,
    },
  });
  const chapterList = computed(() => {
    let list = appStore?.dictationInfo?.chapterList || [];
    if (!list.length) {
      return state.chapterList;
    }
    return list;
  });

  const getErrorWords = () => {
    const params = {};
    if (state.form.errTime == 0) {
      params.error_end_date = dayjs().format('YYYY-MM-DD HH:mm:ss');
      params.error_start_date = dayjs('2024-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss');
    } else if (state.form.errTime == 1) {
      params.error_end_date = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
      params.error_start_date = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    } else if (state.form.errTime == 2) {
      const currentTime = dayjs();
      params.error_end_date = currentTime.endOf('day').format('YYYY-MM-DD HH:mm:ss');
      params.error_start_date = currentTime.subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    } else if (state.form.errTime == 3) {
      params.recently = true;
    }
    params.error_num = state.form.error_num;
    params.c_id = state.form.c_id;
    // console.log(state.form.c_id, 'state.form.c_id');
    params.page = state.page.currentPage;
    params.pagesize = state.page.pageSize;

    if (state.form.sort) {
      params.sort = state.form.sort;
    }
    if (state.form.sort_type) {
      params.sort_type = state.form.sort_type;
    }

    setLoading(true);
    getErrorWordList(params)
      .then((res) => {
        state.tableData = res.data;
        state.page.total = res.total;
        res.total &&
          setTimeout(() => {
            tableRef.value.toggleAllSelection();
          });

        if (!chapterList.length && !state.chapterList.length && res.data.length) {
          const list = [];
          res.data.forEach((item) => {
            if (!list.find((o) => o.id == item.c_id)) {
              list.push({
                id: item.c_id,
                name: item.lexicon_group.name + ' ' + item.chapter.name,
              });
            }
          });
          state.chapterList = list;
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleSelectionChange = (val) => {
    // console.log(val);
    state.selWords = val;
  };
  // const handleSizeChange = (size) => {
  //   console.log(size);
  //   state.page.pageSize = size;
  //   getErrorWordList();
  // };
  // const getAllChapter = () => {
  //   getChapterList().then((res) => {
  //     state.chapterList = res;
  //   });
  // };
  const sortChange = ({ column, prop, order }) => {
    const sortMap = {
      ascending: 'asc',
      descending: 'desc',
    };
    state.form.sort = prop;
    state.form.sort_type = sortMap[order];
    getErrorWords();
  };
  var audio = new Audio();

  const play = (row) => {
    const type = userStore.getConfig.phonetic_type == 1 ? 'phonetic-y' : 'phonetic-m';
    audio.src = row.lexicon[type];
    audio.play();
  };
  const rowClick = (row) => {
    play(row);
  };
  const handleSelWords = async () => {
    if (!state.selWords.length) {
      ElMessage.error('请选择错词');
      return;
    }
    const errWords = state.selWords.map((word) => {
      return {
        c_id: word.c_id,
        g_id: word.g_id,
        id: word.lexicon.id,
        word: word.lexicon.word,
        translate: word.lexicon?.translate,
        phonetic_transcription: word.lexicon?.phonetic_transcription,
        'phonetic-y': word.lexicon['phonetic-y'],
        'phonetic-m': word.lexicon['phonetic-m'],
      };
    });
    await appStore.setErrWords(errWords);
    await appStore.toggleCurrentChapter(null);
    setTimeout(() => {
      router.push('/home?source=err');
    });
  };

  // 导出excel
  const handleDownloadExcel = () => {
    if (!state.selWords.length) {
      ElMessage.warning('未选择错题');
      return;
    }
    const exportData = [];
    state.selWords.forEach((item) => {
      exportData.push({
        单词: item.lexicon.word,
        释义: item.lexicon.translate,
        错误次数: item.error_num,
        错误拼写: item.error_word,
        词典: item.lexicon_group.name,
        章节: item.chapter.name,
        错误时间: item.updated_at,
      });
    });
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workBook, workSheet);
    XLSX.writeFile(workBook, `错题本.xlsx`, {
      bookType: 'xlsx',
    });
  };
  // 单词标熟
  const handleWordSign = () => {
    if (!state.selWords.length) {
      ElMessage.error('请选择需要表熟的错词');
      return;
    }

    let checked = false;

    const requestWordLabel = () => {
      const ids = state.selWords.map((o) => o.lexicon_id);
      setLoading(true);
      wordLabel({
        type: 'proficient',
        lexicon_ids: JSON.stringify(ids),
      })
        .then((res) => {
          ElMessage.success('操作成功');
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    };
    if (userStore.getConfig.proficient_tip) {
      requestWordLabel();
    } else {
      ElMessageBox({
        title: `确定将选中的${state.selWords.length}个单词标为熟词吗？`,
        message: () => (
          <div style="fontSize: 22px">
            <br />
            <el-checkbox onChange={(check) => (checked = check)}>不再提醒</el-checkbox>
          </div>
        ),
        confirmButtonText: '标熟',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: '',
        distinguishCancelAndClose: true,
      }).then(() => {
        requestWordLabel();
        userStore.handleConfig('proficient_tip', Number(checked));
      });
    }
  };
  // 单词收藏
  const handleWordCollect = () => {
    if (!state.selWords.length) {
      ElMessage.error('请选择需要收藏的错词');
      return;
    }
    collectRef.value.open(state.selWords.map((o) => o.lexicon_id));
  };
  onMounted(() => {
    if (route.query?.from == 'result') {
      state.form.errTime = 3;
    } else if (route.query?.from == 'gallery') {
    } else if (route.query?.from == 'home') {
      state.form.c_id = appStore?.dictationInfo?.currentChapter?.id;
    }
    // console.log(appStore?.dictationInfo?.currentChapter?.id);
    // if (!state.form.c_id && appStore?.dictationInfo?.chapterList?.length) {
    //   state.form.c_id = appStore?.dictationInfo?.chapterList[0].id;
    // }

    getErrorWords();
  });
  const troggleView = (field) => {
    state.hideProps[field] = !state.hideProps[field];
  };
  const addBook = () => {
    setTimeout(() => {
      ImportDialogRef.value.open();
    }, 200);
  };

  const addBookComplete = () => {
    handleWordCollect();
  };

  onUnmounted(() => {
    audio.pause(); // 先暂停播放
    audio.src = ''; // 清空src
    audio.remove(); // 移除音频对象

    // 或者将音频对象赋值为null
    audio = null;
  });
  // getAllChapter();
</script>
<style lang="less" scoped>
  /deep/.el-table__cell .cell {
    padding: 0 6px;
  }
</style>
