<template>
  <div class="flex w-full flex-1 select-text items-start justify-center overflow-hidden">
    <div class="flex h-full w-full flex-col">
      <div class="pt-2">
        <el-form :model="state.form" :size="formSize" label-width="70" :inline="true">
          <div class="hidden lg:block">
            <el-form-item label="">
              <el-select
                v-model="state.form.error_dates"
                :placeholder="'日期筛选'"
                style="width: 140px"
                clearable
                filterable
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="0"
              >
                <el-option label="最近1次听写" :value="1" :key="1" />
                <el-option
                  v-for="item in state.optionsByDate"
                  :key="item.date"
                  :label="item.date + ' (' + item.lexicon_count + '词)'"
                  :value="item.date"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="state.form.c_ids"
                :placeholder="'章节筛选'"
                style="width: 140px"
                clearable
                filterable
                multiple
                collapse-tags
                :max-collapse-tags="0"
                collapse-tags-tooltip
              >
                <el-option
                  v-for="item in state.optionsByChapter"
                  :key="item.c_id"
                  :label="item.name + ' (' + item.lexicon_count + '词)'"
                  :value="item.c_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select
                v-model="state.form.error_nums"
                :placeholder="'错误次数'"
                style="width: 140px"
                clearable
                filterable
                multiple
                collapse-tags
                :max-collapse-tags="0"
                collapse-tags-tooltip
              >
                <el-option
                  v-for="item in state.optionsByNum"
                  :key="item.error_num"
                  :label="'错误 ' + item.error_num + ' 次' + ' (' + item.lexicon_count + '词)'"
                  :value="item.error_num"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-button
                @click="
                  state.page.currentPage = 1;
                  getErrorWords(false, false);
                "
                type="primary"
                >搜索</el-button
              >
            </el-form-item>
          </div>
          <div class="lg:hidden block pl-4">
            <el-form-item>
              <el-button
                :type="state.form.error_dates.length || state.form.recently ? 'primary' : ''"
                @click="handleSelOption('error_dates', !state.form.error_dates.length && !state.form.recently)"
                >{{ state.form.error_dates.length || state.form.recently ? '清除' : '按照' }}日期筛选</el-button
              >
              <el-button :type="state.form.c_ids.length ? 'primary' : ''" @click="handleSelOption('c_ids', !state.form.c_ids.length)"
                >{{ state.form.c_ids.length ? '清除' : '按照' }}章节筛选</el-button
              >
              <el-button
                :type="state.form.error_nums.length ? 'primary' : ''"
                @click="handleSelOption('error_nums', !state.form.error_nums.length)"
                >{{ state.form.error_nums.length ? '清除' : '按照' }}错误次数筛选</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div v-if="state.tableData.length" class="px-4 bg-white py-2 flex items-center justify-between">
        <span>
          <el-button size="small" @click="allWordChange(state.page.total != selWordCount)"
            >{{ state.page.total != selWordCount ? '' : '取消' }}全选</el-button
          >
        </span>
        <span>
          <el-button size="small" @click="state.hideProps.translate = !state.hideProps.translate"
            >{{ state.hideProps.translate ? '隐藏' : '显示' }}释义</el-button
          >
          <el-button size="small" @click="state.hideProps.word = !state.hideProps.word"
            >{{ !state.hideProps.word ? '隐藏' : '显示' }}单词</el-button
          >
        </span>
      </div>

      <div v-if="state.tableData.length" class="px-4 bg-white relative py-3" :style="`height: ${tableHeight}px;overflow:auto;`">
        <div v-for="(item, index) in state.tableData" :key="index">
          <div class="flex items-center text-l text-base date-item">
            <el-checkbox
              v-model="item.checked"
              :indeterminate="item.checked ? false : item.indeterminate"
              @change="(checked) => wordCheckedChange(item, checked)"
            />
            <span class="pl-4 text-l text-gray-400">
              {{ item.updated_at }}
            </span>
            <span class="pl-4 text-l text-gray-400 text-base">{{ item.child.length }}词</span>
          </div>
          <div v-for="word in item.child" :key="word.id" class="text-l pl-4 word-item cursor-pointer relative" @click.stop="play(word)">
            <div class="flex items-center py-1">
              <el-checkbox v-model="word.checked" @change="(checked) => wordItemCheckedChange(item, checked)" @click.stop="" />
              <span class="text-lg pl-4 text-black">{{ state.hideProps.word ? '***' : word?.lexicon?.word }}</span>
              <el-icon @click="play(word)" class="ml-1"><Headset class="hidden play-icon" /></el-icon>
              <span v-if="word.lexicon?.phonetic_transcription && !state.hideProps.word" class="text-gray-400 pl-4"
                >/{{ word.lexicon?.phonetic_transcription }}/</span
              ><span class="text-red-300 pl-4">{{ !state.hideProps.word ? word?.error_word : '' }}</span>
            </div>
            <template v-if="word.lexicon?.translate && state.hideProps.translate">
              <div class="text-left pl-8 text-xs text-gray-400" v-html="replaceWithBr(word.lexicon?.translate || '')"> </div>
            </template>
          </div>
        </div>
      </div>
      <el-empty v-else description="无数据" />
    </div>
    <Loading :loading="loading" />
    <tabbar />
    <collectDialog ref="collectRef" @addBook="addBook" />
    <ImportDialog ref="addBookRef" @ok="handleWordCollect" />

    <!-- 工具栏 start -->
    <div
      ref="draggableElement"
      v-if="state.tableData.length"
      class="tools-box md:scale-80 absolute flex flex-col justify-center bg-white px-4 py-1 lg:px-2 lg:py-2 bottom-33 transition-colors duration-300 rounded-xl"
    >
      <p class="text-center text-base tracking-wide"
        >对已选中的 <b class="text-theme text-xl text-bold">{{ selWordCount }}</b> 个错词进行</p
      >
      <div class="flex lg:mt-2 space-x-3 md:space-x-2">
        <div
          class="flex flex-col items-center cursor-pointer hover:bg-gray-50 lg:px-6 px-2 py-2 text-theme rounded"
          @click="handleSelWords"
        >
          <el-icon class="mb-1 lg:mb-3" size="25">
            <EditPen />
          </el-icon>
          <span class="text-black">听写</span>
        </div>
        <div class="flex flex-col items-center cursor-pointer hover:bg-gray-50 lg:px-6 px-2 py-2 text-theme rounded" @click="handleWalkman">
          <el-icon class="mb-1 lg:mb-3" size="25">
            <Headset />
          </el-icon>
          <span class="text-black">随身听</span>
        </div>
        <div
          class="flex flex-col items-center cursor-pointer hover:bg-gray-50 lg:px-6 px-2 py-2 text-theme rounded"
          @click="handleDownloadExcel"
        >
          <el-icon class="mb-1 lg:mb-3" size="25">
            <Download />
          </el-icon>
          <span class="text-black">下载</span>
        </div>
        <div
          v-show="!state.showMore"
          class="flex flex-col items-center cursor-pointer hover:bg-gray-50 lg:px-6 px-2 py-2 text-theme rounded"
          @click="state.showMore = true"
        >
          <el-icon class="mb-1 lg:mb-3" size="25">
            <More />
          </el-icon>
          <span class="text-black">更多</span>
        </div>
        <div
          v-show="state.showMore"
          class="flex flex-col items-center cursor-pointer hover:bg-gray-50 lg:px-6 px-2 py-2 text-theme rounded"
          @click="handleCollect('')"
        >
          <el-icon class="mb-1 lg:mb-3" size="25">
            <Star />
          </el-icon>
          <span class="text-black">收藏</span>
        </div>
        <div
          v-show="state.showMore"
          class="flex flex-col items-center cursor-pointer hover:bg-gray-50 lg:px-6 px-2 py-2 text-theme rounded"
          @click="handleWordSign('')"
        >
          <el-icon class="mb-1 lg:mb-3" size="25">
            <Delete />
          </el-icon>
          <span class="text-black">标熟</span>
        </div>
      </div>
    </div>
    <!-- 工具栏 end -->

    <!-- 手机端的选择抽屉 -->
    <el-drawer v-model="state.optionVisable" size="100%" @close="state.optionVisable=false">
      <div>
        <el-checkbox v-model="state.form.recently">最近一次听写</el-checkbox>
        <el-checkbox-group
          v-if="state.currentEditType == 'error_dates'"
          v-model="state.form.error_dates"
          class="flex flex-col"
          size="large"
        >
          <el-checkbox
            v-for="item in state.optionsByDate"
            :label="item.date + ' (' + item.lexicon_count + '词)'"
            :value="item.date"
            :key="item.lexicon_count"
          />
        </el-checkbox-group>
        <el-checkbox-group v-if="state.currentEditType == 'c_ids'" v-model="state.form.c_ids" class="flex flex-col" size="large">
          <el-checkbox
            v-for="item in state.optionsByChapter"
            :label="item.name + ' (' + item.lexicon_count + '词)'"
            :value="item.c_id"
            :key="item.lexicon_count"
          />
        </el-checkbox-group>
        <el-checkbox-group v-if="state.currentEditType == 'error_nums'" v-model="state.form.error_nums" class="flex flex-col" size="large">
          <el-checkbox
            v-for="item in state.optionsByNum"
            :label="'错误 ' + item.error_num + ' 次' + ' (' + item.lexicon_count + '词)'"
            :value="item.error_num"
            :key="item.lexicon_count"
          />
        </el-checkbox-group>
        <div class="py-6"></div>
        <div class="fixed bottom-0 bg-white left-0 right-0 p-4 z-99 top-border flex justify-between shadow">
          <el-button type="" @click="state.optionVisable = false;">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="jsx">
  import { Headset, Download, Hide, CloseBold, View, Delete, Star, EditPen, More } from '@element-plus/icons-vue';
  import { useAppStore, useUserStore } from '@/store';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useRouter, useRoute } from 'vue-router';
  
  import dayjs from 'dayjs';
  import * as XLSX from 'xlsx';

  import { getErrorWordList, wordLabel, errorListSearch } from '@/api/book/index';
  
  import { replaceWithBr } from '@/utils/index'
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';
  import tabbar from '@/components/tabBar/index.vue';
  import collectDialog from './components/collect-dialog.vue';
  import ImportDialog from './components/import-dialog.vue';
  import { useCollect } from '@/views/home/useLogic.js'
  import { useProficient } from '@/views/home/useProficient.jsx'

  const appStore = useAppStore();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const { loading, setLoading } = useLoading();
  const { handleWordCancelCollect, collectRef, handleWordCollect, addBookRef, addBook } = useCollect()
  const { handleProficientCancel, handleProficient } = useProficient()

  const tableHeight = ref(0);

  const formSize = computed(() => {
    if (window.innerWidth < 768) {
      return 'small';
    } else {
      return 'default';
    }
  });

  // 计算选择的单词数量
  const selWordCount = computed(() => {
    return state.tableData.reduce((pre, next) => {
      return (pre += next.child.filter((o) => o.checked).length);
    }, 0);
  });

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
      recently: false,
    },
    // errTimeOption: [
    //   { name: '全部', id: 0 },
    //   { name: '最近听写错词', id: 3 },
    //   { name: '今日错词', id: 1 },
    //   { name: '近七天错词', id: 2 },
    // ],
    // errNumOption: [
    //   { name: '全部', num: 0 },
    //   { name: '错误2次及以上', num: 2 },
    //   { name: '错误3次及以上', num: 3 },
    // ],
    // chapterList: [],
    tableData: [],
    // selWords: [],
    page: {
      total: 0,
      pageSize: 50,
      currentPage: 1,
    },
    hideProps: {
      word: false,
      translate: true,
    },
    allIndeterminate: false,
    optionsByDate: [],
    optionsByNum: [],
    optionsByChapter: [],
    showMore: false,
    allChecked: false,
  });

  const getParams = () => {
    const params = {};
    params.error_num = null;
    params.c_id = state.form.c_id;
    params.recently = state.form.recently;
    // console.log(state.form.c_id, 'state.form.c_id');

    if (state.form.sort) {
      params.sort = state.form.sort;
    }
    if (state.form.sort_type) {
      params.sort_type = state.form.sort_type;
    }
    if (state.form.error_dates.includes(1)) {
      params.recently = true;
    } else {
      params.error_dates = state.form.error_dates.filter((o) => o != '1');
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
          item.checked = false;
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
        } else if (params.error_dates.length || params.error_nums.length || params.recently || params.c_ids.length) {
          allWordChange(true);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const wordCheckedChange = (row, checked) => {
    row.child.forEach((word) => (word.checked = checked));
    row.indeterminate = checked;
  };
  const wordItemCheckedChange = (row, checked) => {
    row.checked = row.child.every((word) => word.checked);
    row.indeterminate = row.child.some((word) => word.checked);
  };

  const allWordChange = (checked) => {
    state.tableData.forEach((it) => {
      it.checked = checked;
      it.indeterminate = state.allChecked;
      it.child.forEach((word) => {
        word.checked = checked;
      });
    });
  };

  // const handleSelectionXChange = (val) => {
  //   state.selWords = val.map((item) => item.child).flat(1);
  //   console.log(state.selWords);
  // };
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

  // const sortChange = ({ column, prop, order }) => {
  //   const sortMap = {
  //     ascending: 'asc',
  //     descending: 'desc',
  //   };
  //   state.form.sort = prop;
  //   state.form.sort_type = sortMap[order];
  //   getErrorWords();
  // };

  var audio = new Audio();

  const play = (row) => {
    const type = userStore.getConfig.phonetic_type == 1 ? 'phonetic-y' : 'phonetic-m';
    audio.src = row.lexicon[type];
    audio.play();
  };

  // const rowClick = (row) => {
  //   play(row);
  // };
  const handleSelWords = async () => {
    const errWords = [];
    state.tableData.forEach((row) => {
      row.child.forEach((word) => {
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
          });
        }
      });
    });
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

  // 选中的错词随身听
  const handleWalkman = async () => {
    const errWords = [];
    state.tableData.forEach((row) => {
      row.child.forEach((word) => {
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
          });
        }
      });
    });
    if (!errWords.length) {
      ElMessage.error('请选择错词');
      return;
    }
    await appStore.setErrWords(errWords);
    await appStore.toggleCurrentChapter(null);
    router.push('/walkman?source=err');
  };

  // 单词标熟
  const handleWordSign = () => {
    const ids = state.tableData.reduce((acc, item) => {
      const ids = item.child.reduce((innerAcc, child) => {
        if (child.checked) {
          innerAcc.push(child.lexicon_id);
        }
        return innerAcc;
      }, []);
      return acc.concat(ids);
    }, []);

    if (!ids.length) {
      ElMessage.error('请选择需要表熟的错词');
      return;
    }
    handleProficient(ids, () => {state.page.currentPage=1,getErrorWords(false,false)})
  };

  // 单词收藏
  const handleCollect = () => {
    const ids = state.tableData.reduce((acc, item) => {
      const ids = item.child.reduce((innerAcc, child) => {
        if (child.checked) {
          innerAcc.push(child.lexicon_id);
        }
        return innerAcc;
      }, []);
      return acc.concat(ids);
    }, []);

    if (!ids.length) {
      ElMessage.error('请选择需要收藏的错词');
      return;
    }
    handleWordCollect(ids)
  };

  onMounted(() => {
    if (route.query?.from == 'result') {
      state.form.error_dates = [1];
      state.form.recently = true;
    } 
    // else if (route.query?.from == 'gallery') {
    // } else if (route.query?.from == 'home') {
    // state.form.c_id = appStore?.dictationInfo?.currentChapter?.id;
    // }
    // console.log(appStore?.dictationInfo?.currentChapter?.id);
    // if (!state.form.c_id && appStore?.dictationInfo?.chapterList?.length) {
    //   state.form.c_id = appStore?.dictationInfo?.chapterList[0].id;
    // }

    getErrorWords();
  });

  // 处理筛选的参数
  const handleSelOption = (val, type) => {
    if (type) {
      state.optionVisable = true;
      state.mobileForm[val] = !state.mobileForm[val];
      state.currentEditType = val;
    } else {
      if (val == 'error_dates') {
        state.form.recently = false;
      }
      state.form[val] = [];
      state.page.currentPage = 1;
      getErrorWords(false, false);
    }
  };

  const submit = () => {
    state.optionVisable = false;
    state.page.currentPage = 1;
    getErrorWords(false, false);
  };

  onUnmounted(() => {
    audio.pause();
    audio.src = '';
    audio.remove();
    audio = null;
  });

  // 获取筛选条件
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
</script>
<style lang="less" scoped>

  .tools-box {
    z-index: 99;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .date-item {
    border-bottom: 1px solid #ecececf6;
  }

  .word-item {
    border-bottom: 1px solid #f5f5f5f5;
    &:hover {
      .play-icon {
        display: block !important;
      }
    }
  }
</style>
