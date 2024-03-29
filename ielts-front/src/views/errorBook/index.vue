<template>
  <div class="flex w-full flex-1 select-text items-start justify-center overflow-hidden bg-white">
    <div class="flex h-full lg:w-5/6 w-full flex-col lg:pt-10 pt-4">
      <div>
        <el-form :model="state.form" :size="formSize" label-width="80">
          <el-form-item label="错误时间">
            <el-radio-group v-model="state.form.errTime" @change="getErrorWords">
              <el-radio-button v-for="o in state.errTimeOption" :key="o.id" :value="o.id" :label="o.id">{{ o.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="错误次数">
            <el-radio-group v-model="state.form.error_num" @change="getErrorWords">
              <el-radio-button v-for="o in state.errNumOption" :key="o.num" :value="o.num" :label="o.num">{{ o.name }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="章节">
            <el-select v-model="state.form.c_id" placeholder="全部章节" style="width: 180px" @change="getErrorWords">
              <el-option v-for="item in chapterList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="px-4">
        <div class="flex justify-end pb-3 items-center space-x-4">
          <span
            >共{{ state.page.total }}条，当前已选 <span class="color-theme">{{ state.selWords.length }}</span> 个</span
          >
          <el-button @click="handleSelWords" type="primary">听写已选中错词</el-button>
        </div>
        <el-table
          ref="tableRef"
          :data="state.tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          :maxHeight="tableHeight"
        >
          <el-table-column type="selection" width="30" />
          <el-table-column prop="lexicon" label="单词" minWidth="100">
            <template #default="scope">
              <span
                >{{ scope.row.lexicon.word }}
                <span v-if="scope.row.lexicon?.phonetic_transcription" class="flex items-center cursor-pointer" @click="play(scope.row)"
                  >{{ scope.row.lexicon?.phonetic_transcription }} <el-icon class="ml-2"><Headset /></el-icon
                ></span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="lexicon.translate" label="释义" align="center" minWidth="280" />
          <!-- <el-table-column prop="lexicon.phonetic_transcription" label="音标" width="180">

          </el-table-column> -->
          <el-table-column prop="error_num" label="错误次数" sortable="custom" width="110" align="center" />
          <el-table-column prop="error_word" label="错误拼写" width="180" align="center" />
          <el-table-column prop="lexicon_group.name" label="词典" width="90" align="center" />
          <el-table-column prop="chapter.name" label="章节" width="80" align="center" />
          <el-table-column prop="updated_at" label="错误时间" sortable="custom" width="110" align="center" />
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
    <LastPage />
    <Loading :loading="loading" />
  </div>
</template>
<script setup>
  import { getErrorWordList } from '@/api/book/index';
  import { useAppStore } from '@/store';
  import { Headset } from '@element-plus/icons-vue';
  import LastPage from '@/components/lastPage/index.vue';
  import { ElMessage } from 'element-plus';
  import dayjs from 'dayjs';
  import { useRouter } from 'vue-router';
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';

  const appStore = useAppStore();
  const router = useRouter();
  const { loading, setLoading } = useLoading();

  const tableRef = ref(null);
  const screenWidth = ref(window.innerWidth); // 获取当前屏幕宽度
  const screenHeight = ref(window.innerHeight); // 获取当前屏幕宽度

  const formSize = computed(() => {
    if (screenWidth.value < 768) {
      return 'small';
    } else {
      return 'large';
    }
  });
  const tableHeight = computed(() => {
    if (screenWidth.value < 768) {
      // return 'small';
      return screenHeight.value - 200;
    } else {
      return screenHeight.value - 310;
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
      { name: '今天', id: 1 },
      { name: '近七天', id: 2 },
    ],
    errNumOption: [
      { name: '全部', num: 0 },
      { name: '2次及以上', num: 2 },
      { name: '3次及以上', num: 3 },
    ],
    chapterList: ['全部', '滴滴'],
    tableData: [],
    selWords: [],
    page: {
      total: 0,
      pageSize: 9999,
      currentPage: 1,
    },
  });
  const chapterList = computed(() => {
    return appStore?.dictationInfo?.chapterList || [];
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
    }
    params.error_num = state.form.error_num;
    params.c_id = state.form.c_id;
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
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleSelectionChange = (val) => {
    console.log(val);
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
    audio.src = row.lexicon['phonetic-m'];
    audio.play();
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
        id: word.id,
        word: word.lexicon.word,
        translate: word.lexicon?.translate,
        phonetic_transcription: word.lexicon?.phonetic_transcription,
        'phonetic-y': word.lexicon['phonetic-y'],
        'phonetic-m': word.lexicon['phonetic-m'],
      };
    });
    await appStore.setErrWords(errWords);
    setTimeout(() => {
      router.push('/home?source=err');
    });
  };
  getErrorWords();
  // getAllChapter();
</script>
<style lang="less" scoped>
  /deep/.el-table__cell .cell {
    padding: 0 6px;
  }
</style>
