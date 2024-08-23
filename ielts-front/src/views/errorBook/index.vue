<template>
  <div class="flex w-full flex-1 select-text items-start justify-center overflow-hidden">
    <div class="flex h-full w-full flex-col">
      <div class="pt-2">
        <el-form :model="state.form" :size="formSize" label-width="70" :inline="true">
          <div class="hidden lg:block">
            <el-form-item label="">
              <el-select v-model="state.form.error_dates" :placeholder="'日期筛选'" style="width: 140px" clearable filterable
                multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="0">
                <el-option label="最近1次听写" :value="1" :key="1" />
                <el-option v-for="item in state.optionsByDate" :key="item.date"
                  :label="item.date + ' (' + item.lexicon_count + '词)'" :value="item.date" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="state.form.c_ids" :placeholder="'章节筛选'" style="width: 140px" clearable filterable
                multiple collapse-tags :max-collapse-tags="0" collapse-tags-tooltip>
                <el-option v-for="item in state.optionsByChapter" :key="item.c_id"
                  :label="item.name + ' (' + item.lexicon_count + '词)'" :value="item.c_id" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="state.form.error_nums" :placeholder="'错误次数'" style="width: 140px" clearable filterable
                multiple collapse-tags :max-collapse-tags="0" collapse-tags-tooltip>
                <el-option v-for="item in state.optionsByNum" :key="item.error_num"
                  :label="'错误 ' + item.error_num + ' 次' + ' (' + item.lexicon_count + '词)'" :value="item.error_num" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-button @click="
                state.page.currentPage = 1;
              getErrorWords(false, false);
              " type="primary">搜索</el-button>
            </el-form-item>
          </div>
          <div class="lg:hidden block pl-4">
            <el-form-item>
              <el-button :type="state.form.error_dates.length ? 'primary' : ''"
                @click="handleSelOption('error_dates', !state.form.error_dates.length)">{{ state.form.error_dates.length ?
                  '清除' : '按照' }}日期筛选</el-button>
              <el-button :type="state.form.c_ids.length ? 'primary' : ''"
                @click="handleSelOption('c_ids', !state.form.c_ids.length)">{{ state.form.c_ids.length ? '清除' : '按照'
                }}章节筛选</el-button>
              <el-button :type="state.form.error_nums.length ? 'primary' : ''"
                @click="handleSelOption('error_nums', !state.form.error_nums.length)">{{ state.form.error_nums.length ?
                  '清除' : '按照' }}错误次数筛选</el-button>
              <!-- <el-checkbox-group v-model="state.mobileForm">
                <el-checkbox border value="error_dates" @click="handleSelOption('error_dates')">日期筛选</el-checkbox>
                <el-checkbox border value="c_ids" @click="handleSelOption('c_ids')">章节筛选</el-checkbox>
                <el-checkbox border value="error_nums" @click="handleSelOption('error_nums')">次数筛选</el-checkbox>
              </el-checkbox-group> -->
            </el-form-item>
          </div>
          <!-- <el-form-item label="">
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
          </el-form-item> -->
        </el-form>
      </div>
      <div class="px-4 bg-white py-2 flex items-center justify-between">
        <span>
          <!-- <el-checkbox @change="wordAllChange"></el-checkbox> -->
          <span v-if="selWordCount" class="pl-4">已选中 <b class="text-theme">{{selWordCount}}</b> 词</span>
        </span>
        <span>
          <el-button size="small" @click="state.hideProps.translate = !state.hideProps.translate">{{state.hideProps.translate ? '隐藏' : '显示'}}释义</el-button>
          <el-button size="small" @click="state.hideProps.word = !state.hideProps.word">{{!state.hideProps.word ? '隐藏' : '显示'}}单词</el-button>
        </span>
      </div>
      <div class="px-4 bg-white relative py-3" :style="`height: ${tableHeight}px;overflow:auto;`">
        <div v-for="(item, index) in state.tableData" :key="index">
          <div class="flex items-center text-l text-base date-item">
            <el-checkbox v-model="item.checked" :indeterminate="item.checked ? false : item.indeterminate"
              @change="(checked) => wordCheckedChange(item, checked)"></el-checkbox>
            <span class="pl-4 text-l text-gray-400">
              {{ item.updated_at }}
            </span>
            <span class="pl-4 text-l text-gray-400 text-base">{{ item.child.length }}词</span>
          </div>
          <div v-for="word in item.child" :key="word.id" class="text-l pl-4 word-item">
            <div class="flex items-center py-1">
              <el-checkbox v-model="word.checked"
                @change="(checked) => wordItemCheckedChange(item, checked)"></el-checkbox>
              <span class="text-lg pl-4 text-black">{{ state.hideProps.word ? "***" : word?.lexicon?.word }}</span>
              <span v-if="word.lexicon?.phonetic_transcription" class="text-gray-400 pl-4">/{{
                word.lexicon?.phonetic_transcription }}/</span><span class="text-red-300 pl-4">{{ word?.error_word
  }}</span>
            </div>
            <template v-if="word.lexicon?.translate && state.hideProps.translate">
              <div class="text-left pl-8 text-xs text-gray-400" v-html="replaceWithBr(word.lexicon?.translate || '')">
              </div>
            </template>
          </div>
        </div>
        <!-- <div class="lg:flex justify-end pb-1 items-center">
          <div class="space-x-2">
            <el-button :icon="Download" plain @click="handleDownloadExcel" size="small" />
            <el-button type="" :icon="Delete" plain @click="handleWordSign" size="small" />
            <el-button type="" :icon="Star" plain @click="handleWordCollect" size="small" />
            <el-button size="small" @click="handleSelWords" type="primary">听写已选中错词</el-button>
          </div>
        </div> -->
        <!-- <el-table
          ref="tableRef"
          :data="state.tableData"
          style="width: 100%"
          @selection-change="handleSelectionXChange"
          @sort-change="sortChange"
          :maxHeight="tableHeight"
          row-class-name="rowClassName"
          :default-expand-all="true"
        >
          <el-table-column type="selection" width="30" />
          <el-table-column type="expand">
            <template #default="scopeX">
              <el-table ref="tableRefChild" :data="scopeX.row.child" style="width: 100%" @row-click="rowClick" :show-header="false" fit>
                <el-table-column>
                  <template #default="scope">
                    <div class="flex items-center cursor-pointer ml-4 text-xs"
                      ><span class="">{{ scope.row?.lexicon.word }}</span>&nbsp;&nbsp;&nbsp;
                      <span v-if="scope.row.lexicon?.phonetic_transcription" class="text-gray-400"
                        >/{{ scope.row.lexicon?.phonetic_transcription }}/</span
                      >&nbsp;&nbsp; &nbsp;<span class="text-red-300">{{ scope.row?.error_word }}</span>
                      <el-button
                        class="absolute right-5"
                        :type="scope.row.lexicon?.is_collection ? 'primary' : ''"
                        :icon="Star"
                        :plain="!scope.row.lexicon?.is_collection"
                        round
                        @click.stop="handleWordCollect(scope.row)"
                        size="small"
                      />
                      <el-button
                        class="absolute right-15"
                        :type="scope.row.lexicon?.is_proficient ? 'primary' : ''"
                        :icon="Delete"
                        :plain="!scope.row.lexicon?.is_proficient"
                        round
                        @click.stop="handleWordSign(scope.row)"
                        size="small"
                      />
                    </div>
                    <template v-if="scope.row.lexicon?.translate">
                      <div class="text-left ml-4 text-xs leading-4 mt-2" v-html="replaceWithBr(scope.row.lexicon?.translate || '')"> </div>
                    </template>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="updated_at">
            <template #header>
              <span class="text-gray-400 text-sm" v-if="state.selWords.length"
                >已选中 <span class="color-theme">{{ state.selWords.length }}</span> 词</span
              >
            </template>
            <template #default="scope">
              <span class="text-gray-400">{{ scope.row.updated_at }}</span
              >&nbsp;&nbsp;<span class="text-gray-400">{{ scope.row?.child?.length }}词</span>
            </template>
          </el-table-column>
        </el-table> -->
      </div>
      <!-- <div class="pt-2 flex justify-center items-center">
        <el-pagination
          background
          size="small"
          :pager-count="4"
          v-model:current-page="state.page.currentPage"
          layout="prev,next"
          :total="state.page.total"
          :page-size="state.page.pageSize"
          :page-sizes="[20, 50, 100]"
          @current-change="getErrorWords"
        />
      </div> -->
    </div>
    <!-- <LastPage /> -->
    <Loading :loading="loading" />
    <tabbar />
    <collectDialog ref="collectRef" @addBook="addBook" />
    <ImportDialog ref="ImportDialogRef" @ok="addBookComplete" />
    <div
      class="tools-box absolute flex bg-white px-3 py-1 bottom-30 transition-colors duration-300 space-x-2 lg:space-x-4 rounded-xl">
      <div class="flex flex-col items-center cursor-pointer hover:bg-theme px-3 py-2 hover:text-white rounded"
        @click="handleSelWords">
        <el-icon class="mb-1" size="16">
          <EditPen />
        </el-icon>
        <span>听写</span>
      </div>
      <div class="flex flex-col items-center cursor-pointer hover:bg-theme px-3 py-2 hover:text-white rounded"
        @click="handleWalkman">
        <el-icon class="mb-1" size="16">
          <Headset />
        </el-icon>
        <span>随身听</span>
      </div>
      <div class="flex flex-col items-center cursor-pointer hover:bg-theme px-3 py-2 hover:text-white rounded"
        @click="handleDownloadExcel">
        <el-icon class="mb-1" size="16">
          <Download />
        </el-icon>
        <span>下载</span>
      </div>
      <div v-show="!state.showMore"
        class="flex flex-col items-center cursor-pointer hover:bg-theme px-3 py-2 hover:text-white rounded"
        @click="handleMore">
        <el-icon class="mb-1" size="16">
          <More />
        </el-icon>
        <span>更多</span>
      </div>
      <div v-show="state.showMore"
        class="flex flex-col items-center cursor-pointer hover:bg-theme px-3 py-2 hover:text-white rounded"
        @click="handleWordCollect('')">
        <el-icon class="mb-1" size="16">
          <Star />
        </el-icon>
        <span>收藏</span>
      </div>
      <div v-show="state.showMore"
        class="flex flex-col items-center cursor-pointer hover:bg-theme px-3 py-2 hover:text-white rounded"
        @click="handleWordSign('')">
        <el-icon class="mb-1" size="16">
          <Delete />
        </el-icon>
        <span>标熟</span>
      </div>
    </div>

    <el-drawer v-model="state.optionVisable" size="100%" @close="drawerClose">
      <div>
        <el-checkbox-group v-if="state.currentEditType == 'error_dates'" v-model="state.form.error_dates"
          class="flex flex-col" size="large">
          <el-checkbox v-model="state.form.recently">最近一次听写</el-checkbox>

          <el-checkbox v-for="item in state.optionsByDate" :label="item.date + ' (' + item.lexicon_count + '词)'"
            :value="item.date" :key="item.lexicon_count" />
        </el-checkbox-group>
        <el-checkbox-group v-if="state.currentEditType == 'c_ids'" v-model="state.form.c_ids" class="flex flex-col"
          size="large">
          <el-checkbox v-for="item in state.optionsByChapter" :label="item.name + ' (' + item.lexicon_count + '词)'"
            :value="item.c_id" :key="item.lexicon_count" />
        </el-checkbox-group>
        <el-checkbox-group v-if="state.currentEditType == 'error_nums'" v-model="state.form.error_nums"
          class="flex flex-col" size="large">
          <el-checkbox v-for="item in state.optionsByNum"
            :label="'错误 ' + item.error_num + ' 次' + ' (' + item.lexicon_count + '词)'" :value="item.error_num"
            :key="item.lexicon_count" />
        </el-checkbox-group>
        <div class="py-6"></div>
        <div class="fixed bottom-0 bg-white left-0 right-0 p-4 z-99 top-border flex justify-between shadow">
          <el-button type="" @click="drawerClose">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="jsx">
import { getErrorWordList, wordLabel, errorListSearch } from '@/api/book/index';
import { useAppStore, useUserStore } from '@/store';
import { Headset, Download, Hide, View, Delete, Star, EditPen, More } from '@element-plus/icons-vue';
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
// const screenHeight = ref(window.innerHeight); // 获取当前屏幕宽度
const tableHeight = ref(0);
const formSize = computed(() => {
  if (screenWidth.value < 768) {
    return 'small';
  } else {
    return 'default';
  }
});
const selWordCount = computed(() => {
  return state.tableData.reduce((pre,next)=> {
    return pre += next.child.filter(o => o.checked).length
  }, 0)
})
const handleHeight = () => {
  tableHeight.value = window.innerHeight - 116;
};
handleHeight();
window.onresize = function () {
  handleHeight();
};
const state = reactive({
  optionVisable: false,
  mobileForm: {
    error_dates: false,
    c_ids: false,
    error_nums: false,
  },
  currentEditType: '',
  form: {
    errTime: 0,
    error_num: 0,
    c_id: undefined,
    sort: undefined,
    sort_type: undefined,
    error_dates: [],
    c_ids: [],
    error_nums: [],
    recently: false
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
    pageSize: 50,
    currentPage: 1,
  },
  hideProps: {
    word: false,
    translate: false,
  },
  optionsByDate: [],
  optionsByNum: [],
  optionsByChapter: [],
  showMore: false,
});

const getParams = () => {
  const params = {};
  // if (state.form.errTime == 0) {
  //   params.error_end_date = dayjs().format('YYYY-MM-DD HH:mm:ss');
  //   params.error_start_date = dayjs('2024-01-01 00:00:00').format('YYYY-MM-DD HH:mm:ss');
  // } else if (state.form.errTime == 1) {
  //   params.error_end_date = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
  //   params.error_start_date = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
  // } else if (state.form.errTime == 2) {
  //   const currentTime = dayjs();
  //   params.error_end_date = currentTime.endOf('day').format('YYYY-MM-DD HH:mm:ss');
  //   params.error_start_date = currentTime.subtract(6, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
  // } else if (state.form.errTime == 3) {
  //   params.recently = true;
  // }
  params.error_num = null;
  params.c_id = state.form.c_id;
  params.recently = state.form.recently
  // console.log(state.form.c_id, 'state.form.c_id');

  if (state.form.sort) {
    params.sort = state.form.sort;
  }
  if (state.form.sort_type) {
    params.sort_type = state.form.sort_type;
  }
  if(state.form.error_dates.includes('1')) {
    params.recently = true;
  } else {
    params.error_dates = state.form.error_dates.filter(o => o != '1');
  }

  params.c_ids = state.form.c_ids;
  params.error_nums = state.form.error_nums;
  return params;
};
const getErrorWords = (noRefresh = false, isAdd = true) => {
  const params = getParams();
  params.page = state.page.currentPage;
  params.pagesize = state.page.pageSize;

  setLoading(true);
  getErrorWordList(params)
    .then((res) => {
      // 处理错误数据
      // 转换数据结构
      const transformedData = res.data.reduce((acc, item) => {
        const date = item.updated_at.split(' ')[0];
        item.checked = false
        // 检查acc中是否已经存在该日期的条目
        let dateItem = acc.find((i) => i.updated_at.split(' ')[0] === date);

        // 如果不存在，则创建一个新的条目
        if (!dateItem) {
          dateItem = { updated_at: date, child: [], checked: false, indeterminate: false };
          acc.push(dateItem);
        }

        // 将原始数据项添加到child数组中
        dateItem.child.push({ ...item });

        return acc;
      }, []);

      if (isAdd) {
        transformedData.forEach((it) => {
          const currentRow = state.tableData.find((o) => o.updated_at == it.updated_at);
          if (currentRow) {
            currentRow.child.push(...it.child);
          } else {
            state.tableData.push(it);
          }
        });
      } else {
        state.tableData = transformedData;
      }

      state.page.total = res.total;
      //还有更多数据的话
      if (res.last_page > res.current_page) {
        state.page.currentPage = state.page.currentPage + 1;
        getErrorWords(false, true);
      }
      // if (!noRefresh && res.total) {
      //   setTimeout(() => {
      //     tableRef.value.toggleAllSelection();
      //   });
      // }

      if (res.chapters?.length) {
        state.chapterList = res.chapters;
      }

      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
};

const wordCheckedChange = (row, checked) => {
  row.child.forEach(word => word.checked = checked)
  row.indeterminate = checked
}
const wordItemCheckedChange = (row, checked) => {
  row.checked = row.child.every(word => word.checked)
  row.indeterminate = row.child.some(word => word.checked)
}
const handleSelectionXChange = (val) => {
  // console.log(val);
  state.selWords = val.map((item) => item.child).flat(1);
  console.log(state.selWords);
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
  const errWords = []
  state.tableData.forEach(row => {
    row.child.forEach(word => {
      if (word.checked && word.lexicon) {
        errWords.push({
          c_id: word?.c_id || 0,
          g_id: word?.g_id || 0,
          id: word?.lexicon?.id || word.lexicon_id || 0,
          word: word?.lexicon?.word,
          translate: word.lexicon?.translate,
          phonetic_transcription: word.lexicon?.phonetic_transcription,
          'phonetic-y': word?.lexicon?.['phonetic-y'],
          'phonetic-m': word?.lexicon?.['phonetic-m'],
        })
      }
    })
  })
  if (!errWords.length) {
    ElMessage.error('请选择错词');
    return;
  }

  await appStore.setErrWords(errWords);
  await appStore.toggleCurrentChapter(null);
  setTimeout(() => {
    router.push('/home?source=err');
  });
};

// 导出excel
const handleDownloadExcel = () => {
  const params = getParams();
  params.page = 1;
  params.pagesize = 9999;

  setLoading(true);
  getErrorWordList(params)
    .then((res) => {
      const exportData = res.data.map((item) => {
        return {
          单词: item?.lexicon?.word,
          释义: item?.lexicon?.translate,
          错误次数: item?.error_num,
          错误拼写: item?.error_word,
          词典: item?.lexicon_group?.name,
          章节: item?.chapter?.name,
          错误时间: item?.updated_at,
        };
      });
      const workBook = XLSX.utils.book_new();
      const workSheet = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(workBook, workSheet);
      XLSX.writeFile(workBook, `错题本.xlsx`, {
        bookType: 'xlsx',
      });
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
};

const handleWalkman = async () => {
  const errWords = []
  state.tableData.forEach(row => {
    row.child.forEach(word => {
      if (word.checked && word.lexicon) {
        errWords.push({
          c_id: word?.c_id || 0,
          g_id: word?.g_id || 0,
          id: word?.lexicon?.id || word.lexicon_id || 0,
          word: word?.lexicon?.word,
          translate: word.lexicon?.translate,
          phonetic_transcription: word.lexicon?.phonetic_transcription,
          'phonetic-y': word?.lexicon?.['phonetic-y'],
          'phonetic-m': word?.lexicon?.['phonetic-m'],
        })
      }
    })
  })
  if (!errWords.length) {
    ElMessage.error('请选择错词');
    return;
  }
  await appStore.setErrWords(errWords);
  await appStore.toggleCurrentChapter(null);
  router.push('/walkman?source=err');
};

function replaceWithBr(str = '') {
  return str.replace(/([^\s&])\s([A-Za-z]+)\./g, function (match, p1, p2) {
    if (p1 !== '&') {
      return p1 + '<br>' + p2 + '.';
    }
    return match;
  });
}
// 单词标熟
const handleWordSign = (row) => {
  let ids = [];

  if (row) {
    ids = [row.lexicon_id];
  } else {
    if (!state.selWords.length) {
      ElMessage.error('请选择需要表熟的错词');
      return;
    }
    ids = state.selWords.map((o) => o.lexicon_id);
  }

  let checked = false;

  const requestWordLabel = () => {
    setLoading(true);
    wordLabel({
      type: 'proficient',
      lexicon_ids: JSON.stringify(ids),
    })
      .then((res) => {
        ElMessage.success('单词标熟成功');
        state.page.currentPage = 1;
        getErrorWords(true, false);
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
      title: ``,
      message: () => (
        <div>
          <p style="fontSize: 22px">确定将选中的{state.selWords.length}个单词标为熟词吗？</p>
          <p style="fontSize: 22px">
            单词标熟后<b>错词本不再展示</b>，听写时<b>自动跳过</b>
          </p>
          <br />
          <el-checkbox onChange={(check) => (checked = check)} size="small">
            不再提醒
          </el-checkbox>
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
const handleWordCollect = (row) => {
  if (row) {
    collectRef.value.open([row.lexicon_id]);
  } else {
    if (!state.selWords.length) {
      ElMessage.error('请选择需要收藏的错词');
      return;
    }
    collectRef.value.open(state.selWords.map((o) => o.lexicon_id));
  }
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

const addBook = () => {
  setTimeout(() => {
    ImportDialogRef.value.open();
  }, 200);
};

const addBookComplete = () => {
  handleWordCollect();
};

const handleMore = () => {
  state.showMore = true;
};

const handleSelOption = (val, type) => {
  if (type) {
    state.optionVisable = true;
    state.mobileForm[val] = !state.mobileForm[val];
    state.currentEditType = val;
  } else {
    state.form[val] = [];
    state.page.currentPage = 1
    getErrorWords(false, false);
  }
};

const drawerClose = () => {
  state.optionVisable = false;
  // if (!state.form[state.currentEditType].length) {
  //   state.mobileForm[state.currentEditType] = false;
  // }
};
const submit = () => {
  state.optionVisable = false;
  state.page.currentPage = 1;
  getErrorWords(false, false);
};
onUnmounted(() => {
  audio.pause(); // 先暂停播放
  audio.src = ''; // 清空src
  audio.remove(); // 移除音频对象

  // 或者将音频对象赋值为null
  audio = null;
});

const getSearchOptions = () => {
  errorListSearch().then((res) => {
    if (!state.optionsByDate?.length) {
      state.optionsByDate = res.error_date.sort((a, b) => {
        // 将日期字符串转换为日期对象
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);

        // 比较日期，返回值决定排序
        return dateB - dateA; // 倒序排列
      });
    }
    if (!state.optionsByNum?.length) {
      state.optionsByNum = res.error_number.sort((a, b) => a.error_num - b.error_num);
    }
    if (!state.optionsByChapter?.length) {
      state.optionsByChapter = res.chapter_lexicons;
    }
  });
};
getSearchOptions();
// getAllChapter();
</script>
<style lang="less" scoped>
/deep/.el-form-item--default {
  margin-bottom: 6px;
}

/deep/.el-table__cell .cell {
  padding: 0 6px;
}

.tools-box {
  z-index: 99;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.date-item {
  border-bottom: 1px solid #ecececf6;
}

.word-item {
  border-bottom: 1px solid #f5f5f5f5;
}
</style>
