<template>
  <el-drawer v-model="state.drawer" :title="appStore?.dictationInfo?.booInfo.remarks" :size="dialogWidth" custom-class="dialogstyle">
    <div v-if="state.from == 'home'" class="absolute right-20 top-5">
      <el-button type="" :icon="Headset" size="small" round @click="towalkman">随身听</el-button>
      <el-button type="" :icon="Download" size="small" round @click="download">下载</el-button>
    </div>
    <div class="min-width: 100%; display: table;">
      <div class="flex h-full w-full flex-col gap-1">
        <div
          v-for="item in state.list"
          :key="item.id"
          class="mb-2 flex cursor-pointer select-text items-center rounded-xl py-2 lg:px-4 px-2 shadow focus:outline-none dark:bg-opacity-20"
          :class="state.current.id == item.id ? 'bg-theme_hover current' : ''"
          :id="state.current.id == item.id ? 'current' : ''"
          @click="handleClick(item)"
        >
          <div class="flex-1"
            ><p class="text-sm select-all font-mono lg:text-lg font-normal leading-6 dark:text-gray-50 mb-2"
              >{{ item.word }}&nbsp;<span v-if="item.phonetic_transcription" class="text-gray lg:text-l text-m">/{{ item.phonetic_transcription }}/</span></p
            ><div class="mt-2 max-w font-sans text-m text-gray-400" v-html="replaceWithBr(item.translate || '')"></div>
          </div>
          <div class="lg:space-x-2 space-x-1 flex justify-center items-center">
            <button
              @click="play(item)"
              class="focus:outline-none dark:fill-gray-400 dark:opacity-80 cursor-pointer text-gray-600 h-8 w-7"
              type="button"
            >
              <SvgIcon name="sound" prefix="icon-svg" width="20" height="20" />
            </button>
            <el-icon size="18" v-if="item.is_proficient" class="mr-1" @click.stop="handleWordSign(item, 'cancel_proficient')"
              ><DeleteFilled
            /></el-icon>
            <el-icon class="h-8 w-8" v-else size="18" color="#2c3e50" @click.stop="handleWordSign(item, 'proficient')"><Delete /></el-icon>
            <el-icon class="h-8 w-8" v-if="item.is_collection" @click.stop="handleWordCollect(item, 'update_collection')" size="24"
              ><StarFilled
            /></el-icon>
            <el-icon class="h-8 w-8" v-else size="24" @click.stop="handleWordCollect(item, 'collection')" color="#2c3e50"
              ><Star style="transform: scale(0.8)"
            /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <collectDialog ref="collectRef" @addBook="addBook" @ok="collectFinish" />
    <ImportDialog ref="ImportDialogRef" @ok="addBookComplete" />
  </el-drawer>
</template>
<script setup lang="jsx">
  import { useAppStore, useUserStore } from '@/store';
  import { nextTick } from 'vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { DeleteFilled, StarFilled, Star, Delete, Headset, Download } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { wordLabel } from '@/api/book/index';
  import collectDialog from '../errorBook/components/collect-dialog.vue';
  import ImportDialog from '../errorBook/components/import-dialog.vue';
  import { useRouter } from 'vue-router';
  import * as XLSX from 'xlsx';

  const appStore = useAppStore();
  const userStore = useUserStore();
  const router = useRouter();

  const emit = defineEmits(['download', 'skip']);
  const state = reactive({
    drawer: false,
    list: [],
    list2: [],
    current: null,
    from: 'home',
  });
  const dialogWidth = ref('50%');
  const collectRef = ref(null);
  const ImportDialogRef = ref(null);

  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '96%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '70%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '50%'; // 在大屏幕下设置Dialog宽度为50%
    }
  };
  const open = (list, list2, current, from = 'home') => {
    state.drawer = true;
    state.list = list;
    state.list2 = list2;
    state.current = current;
    state.from = from;
    nextTick(() => {
      document.getElementById('current').scrollIntoView();
    });
  };
  onMounted(() => {
    window.addEventListener('resize', () => {
      windowSize();
    });
    windowSize();
  });
  var audio = new Audio();

  const handleClick = (row) => {
    if(state.from == 'home') {
      play(row)
    } else if(state.from == 'walkman') {
      emit('skip', row)
    }
  }

  const play = (row) => {
    const type = userStore.getConfig.phonetic_type == 1 ? 'phonetic-y' : 'phonetic-m';
    audio.src = row[type];
    audio.play();
  };
  const signFinish = (ids, is_proficient = true) => {
    ids.forEach((id) => {
      state.list.find((o) => o.id == id).is_proficient = is_proficient;
      state.list2.find((o) => o.id == id).is_proficient = is_proficient;
    });
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
  const handleWordSign = (item, type) => {
    const requestWordLabel = () => {
      const ids = [item.id];
      wordLabel({
        type: type,
        lexicon_ids: JSON.stringify(ids),
      })
        .then((res) => {
          ElMessage.success(type == 'proficient' ? '单词标熟成功' : '单词已取消标熟');
          signFinish(ids, type == 'proficient');
        })
        .catch((err) => {});
    };
    if (type == 'proficient') {
      let checked = false;
      if (userStore.getConfig.proficient_tip) {
        requestWordLabel();
      } else {
        ElMessageBox({
          title: ``,
          message: () => (
            <div>
              <p style="fontSize: 22px">确定将选中的单词标为熟词吗？</p>
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
    } else {
      requestWordLabel();
    }
  };
  const collectFinish = (ids, is_collection = true) => {
    ids.forEach((id) => {
      state.list.find((o) => o.id == id).is_collection = is_collection;
      state.list2.find((o) => o.id == id).is_collection = is_collection;
    });
  };
  // 收藏
  const handleWordCollect = (item, type) => {
    if (type == 'collection') {
      collectRef.value.open([item.id]);
    } else {
      wordLabel({
        type: 'update_collection',
        lexicon_ids: JSON.stringify([item.id]),
      })
        .then((res) => {
          collectFinish([item.id], false);
          ElMessage.success('取消收藏成功');
        })
        .catch((err) => {});
    }
  };
  const addBook = () => {
    setTimeout(() => {
      ImportDialogRef.value.open();
    }, 200);
  };
  const addBookComplete = () => {
    handleWordCollect();
  };
  const towalkman = () => {
    router.push('/walkman');
  };
  const download = () => {
    // state.drawer = false;
    const exportData = state.list.map((item) => {
      return {
        单词: item?.word,
        音标: item?.phonetic_transcription,
        释义: item?.translate,
      };
    });
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workBook, workSheet);
    XLSX.writeFile(workBook, `${appStore?.dictationInfo?.booInfo.name}_${appStore?.dictationInfo.currentChapter.name}.xlsx`, {
      bookType: 'xlsx',
    });
    // emit('download');
  };
  onUnmounted(() => {
    audio.pause(); // 先暂停播放
    audio.src = ''; // 清空src
    audio.remove(); // 移除音频对象

    // 或者将音频对象赋值为null
    audio = null;
  });
  defineExpose({
    open,
  });
</script>
<style lang="less" scoped>
  @media (max-width: 768px) {
    /* 屏幕宽度小于或等于600px时应用的样式 */
    .dialogstyle .el-drawer__body {
      padding-right: 4px !important;
    }
  }
</style>
