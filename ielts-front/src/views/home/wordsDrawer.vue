<template>
  <el-drawer v-model="state.drawer" :title="appStore?.dictationInfo?.booInfo.remarks" :size="({1:'96%',2: '70%',3: '50%'})[deviceSize]" custom-class="dialogstyle">
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
              >{{ item.word }}&nbsp;<span v-if="item.phonetic_transcription" class="text-gray lg:text-l text-m"
                >/{{ item.phonetic_transcription }}/</span
              ></p
            ><div class="mt-2 max-w font-sans text-m text-gray-400" v-html="replaceWithBr(item.translate || '')"></div>
          </div>
          <div class="lg:space-x-2 space-x-1 flex justify-center items-center">
            <button
              @click.stop="play(item)"
              class="focus:outline-none dark:fill-gray-400 dark:opacity-80 cursor-pointer text-gray-600 h-8 w-7"
              type="button"
            >
              <SvgIcon name="sound" prefix="icon-svg" width="20" height="20" />
            </button>
            <el-icon size="18" v-if="item.is_proficient" class="mr-1" @click.stop="handleProficientCancel([item.id], signFinish)"
              ><DeleteFilled
            /></el-icon>
            <el-icon class="h-8 w-8" v-else size="18" color="#2c3e50" @click.stop="handleProficient([item.id], signFinish)"><Delete /></el-icon>
            <el-icon class="h-8 w-8" v-if="item.is_collection" @click.stop="handleWordCancelCollect({ids: [item.id], callback: collectFinish})" size="24"
              ><StarFilled
            /></el-icon>
            <el-icon class="h-8 w-8" v-else size="24" @click.stop="handleWordCollect([item.id])" color="#2c3e50"
              ><Star style="transform: scale(0.8)"
            /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <collectDialog ref="collectRef" @addBook="addBook" @ok="collectFinish" />
    <ImportDialog ref="addBookRef" @ok="handleWordCollect" />
  </el-drawer>
</template>
<script setup lang="jsx">
  import { useAppStore, useUserStore } from '@/store';
  import { nextTick } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { DeleteFilled, StarFilled, Star, Delete, Headset, Download } from '@element-plus/icons-vue';
  import { useRoute, useRouter } from 'vue-router';
  import * as XLSX from 'xlsx';

  import { wordLabel } from '@/api/book/index';
  import { replaceWithBr } from '@/utils/index'

  import SvgIcon from '@/components/SvgIcon/index.vue';
  import collectDialog from '../errorBook/components/collect-dialog.vue';
  import ImportDialog from '../errorBook/components/import-dialog.vue';
  import { useCollect, useDrawerWith } from './useLogic.js'
  import { useProficient } from './useProficient.jsx'

  const appStore = useAppStore();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const { handleWordCancelCollect, collectRef, handleWordCollect, addBookRef, addBook} = useCollect()
  const { deviceSize, countWidth } = useDrawerWith()
  const { handleProficientCancel, handleProficient } = useProficient()

  const emit = defineEmits(['download', 'skip']);

  const state = reactive({
    drawer: false,
    list: [],
    list2: [],
    current: null,
    from: 'home',
  });

  var audio = new Audio();

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

  const handleClick = (row) => {
    if (state.from == 'home') {
      play(row);
    } else if (state.from == 'walkman') {
      emit('skip', row);
    }
  };

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

  const collectFinish = (ids, is_collection = true) => {
    ids.forEach((id) => {
      state.list.find((o) => o.id == id).is_collection = is_collection;
      state.list2.find((o) => o.id == id).is_collection = is_collection;
    });
  };

  const towalkman = async () => {
    router.push(route.query?.source ? '/walkman?source=err' : '/walkman');
  };

  const download = () => {
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
    
    const fileName = appStore?.dictationInfo?.currentChapter?.name
      ? `${appStore?.dictationInfo?.booInfo.name}_${appStore?.dictationInfo.currentChapter.name}.xlsx`
      : '错词练习.xlsx';
    XLSX.writeFile(workBook, fileName, {
      bookType: 'xlsx',
    });
  };

  onUnmounted(() => {
    audio.pause();
    audio.src = '';
    audio.remove();
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
