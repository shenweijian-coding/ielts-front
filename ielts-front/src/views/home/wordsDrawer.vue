<template>
  <el-drawer v-model="state.drawer" :title="appStore?.dictationInfo?.booInfo.remarks" :size="dialogWidth">
    <div class="min-width: 100%; display: table;">
      <div class="flex h-full w-full flex-col gap-1">
        <div
          v-for="item in state.list"
          :key="item.id"
          class="mb-2 flex cursor-pointer select-text items-center rounded-xl py-2 px-4 shadow focus:outline-none dark:bg-opacity-20"
          :class="state.current.id == item.id ? 'bg-theme_hover current' : ''"
          :id="state.current.id == item.id ? 'current' : ''"
          @click="play(item)"
        >
          <div class="flex-1"
            ><p class="select-all font-mono text-xl font-normal leading-6 dark:text-gray-50 mb-2"
              >{{ item.word }} &nbsp;&nbsp;{{ item.phonetic_transcription }}</p
            ><div class="mt-2 max-w font-sans text-sm text-gray-400">{{ item.translate }}</div>
          </div>
          <div class="space-x-2 flex justify-center items-center">
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
  import { DeleteFilled, StarFilled, Star, Delete } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { wordLabel } from '@/api/book/index';
  import collectDialog from '../errorBook/components/collect-dialog.vue';
  import ImportDialog from '../errorBook/components/import-dialog.vue';

  const appStore = useAppStore();
  const userStore = useUserStore();

  const state = reactive({
    drawer: false,
    list: [],
    list2: [],
    current: null,
  });
  const dialogWidth = ref('50%');
  const collectRef = ref(null);
  const ImportDialogRef = ref(null);

  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '90%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '70%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '50%'; // 在大屏幕下设置Dialog宽度为50%
    }
  };
  const open = (list, list2, current) => {
    state.drawer = true;
    state.list = list;
    state.list2 = list2;
    state.current = current;
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
          title: `确定将选中的单词标为熟词吗？`,
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
          1;
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
