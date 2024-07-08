<template>
  <div class="flex w-full flex-1 select-text items-start justify-center overflow-hidden">
    <div class="flex h-full w-full flex-col">
      <div class="pt-2">
        <el-form :model="state.form" :size="formSize" label-width="70" :inline="true">
          <el-form-item label="">
            <el-select
              v-model="state.form.c_id"
              :placeholder="appStore?.dictationInfo?.booInfo.name || '全部章节'"
              style="width: 180px"
              @change="getWords"
              filterable
            >
              <el-option v-for="item in chapterList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="px-4 bg-white pt-4">
        <div class="flex justify-end pb-1 items-center space-x-4">
          <span
            >共{{ state.page.total }}个，当前已选 <span class="color-theme">{{ state.selWords.length }}</span> 个</span
          >
          <el-button :icon="Download" plain @click="handleDownloadExcel" />
          <el-button @click="handleSelWords" type="primary">听写已选中单词</el-button>
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
          <el-table-column prop="word" label="单词" minWidth="140">
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
                  >{{ scope.row.word }}<el-icon @click="play(scope.row)" class="ml-2"><Headset /></el-icon>
                </span>
                <span v-if="scope.row?.phonetic_transcription" class="flex items-center cursor-pointer"
                  >{{ scope.row?.phonetic_transcription }}
                </span>
              </template>
              <span v-else>***</span>
            </template>
          </el-table-column>
          <el-table-column prop="translate" label="释义" align="center" minWidth="280">
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
                    scope.row?.translate.replace(/([A-Za-z]+)\./g, function (match, p1, offset) {
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
          <!-- <el-table-column prop="chapter.name" label="章节" width="80" align="center" /> -->
          <el-table-column prop="updated_at" label="添加时间" sortable="custom" width="100" align="center">
            <template #default="scope">
              {{ scope.row.updated_at.split(' ')[0] }}
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" label="操作" width="100" align="center">
            <template #default="scope">
              <el-button text type="danger" @click="handleCancelCollect(scope.row)">取消收藏</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <Loading :loading="loading" />
    <tabbar />
  </div>
</template>
<script setup>
  import { getErrorWordList, wordLabel, getWordList } from '@/api/book/index';
  import { useAppStore, useUserStore } from '@/store';
  import { Headset, Download, Hide, View, Delete, Star } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import dayjs from 'dayjs';
  import { useRouter, useRoute } from 'vue-router';
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';
  import * as XLSX from 'xlsx';
  import tabbar from '@/components/tabBar/index.vue';

  const appStore = useAppStore();
  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();
  const { loading, setLoading } = useLoading();

  const tableRef = ref(null);
  const collectRef = ref(null);
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

  const handleSelectionChange = (val) => {
    state.selWords = val;
  };

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
    audio.src = row[type];
    audio.play();
  };
  const rowClick = (row) => {
    play(row);
  };
  const handleSelWords = async () => {
    if (!state.selWords.length) {
      ElMessage.error('请选择单词');
      return;
    }
    const errWords = state.selWords.map((word) => {
      return {
        c_id: word.c_id,
        g_id: word.g_id,
        id: word.id,
        word: word.word,
        translate: word?.translate,
        phonetic_transcription: word?.phonetic_transcription,
        'phonetic-y': word['phonetic-y'],
        'phonetic-m': word['phonetic-m'],
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
      ElMessage.warning('未选择单词');
      return;
    }
    const exportData = [];
    state.selWords.forEach((item) => {
      exportData.push({
        单词: item.word,
        释义: item.translate,
        章节: item.chapter.name,
        添加时间: item.updated_at,
      });
    });
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workBook, workSheet);
    XLSX.writeFile(workBook, `错题本.xlsx`, {
      bookType: 'xlsx',
    });
  };
  const getWords = () => {
    setLoading(true);
    getWordList({
      c_id: state.form.c_id || appStore.dictationInfo.currentChapter.id,
      pagesize: 9999,
    })
      .then((res) => {
        state.tableData = res.data;
        state.page.total = res.total;
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  onMounted(() => {
    state.form.c_id = appStore?.dictationInfo?.currentChapter?.id;

    getWords();
  });
  const troggleView = (field) => {
    state.hideProps[field] = !state.hideProps[field];
  };
  const handleCancelCollect = (item) => {
    wordLabel({
      type: 'update_collection',
      lexicon_ids: JSON.stringify([item.lexicon_id]),
      book_id: item.g_id,
    }).then(res => {1
      ElMessage.success('取消收藏成功')
      getWords()
    }).catch(err => {})
  }
  onUnmounted(() => {
    audio.pause(); // 先暂停播放
    audio.src = ''; // 清空src
    audio.remove(); // 移除音频对象
    // 或者将音频对象赋值为null
    audio = null;
  });
</script>
<style lang="less" scoped>
  /deep/.el-table__cell .cell {
    padding: 0 6px;
  }
</style>
