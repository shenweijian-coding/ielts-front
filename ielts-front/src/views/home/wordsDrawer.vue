<template>
  <el-drawer v-model="state.drawer" :title="appStore?.dictationInfo?.booInfo.remarks" :size="dialogWidth">
    <div class="min-width: 100%; display: table;">
      <div class="flex h-full w-full flex-col gap-1">
        <div
          v-for="item in state.list"
          :key="item.id"
          class="mb-2 flex cursor-pointer select-text items-center rounded-xl py-2 px-4 shadow focus:outline-none dark:bg-opacity-20"
          :class="state.current == item ? 'bg-theme_hover current' : ''"
          :id="state.current == item ? 'current' : ''"
          @click="play(item)"
        >
          <div class="flex-1"
            ><p class="select-all font-mono text-xl font-normal leading-6 dark:text-gray-50 mb-2"
              >{{ item.word }} &nbsp;&nbsp;{{ item.phonetic_transcription }}</p
            ><div class="mt-2 max-w-sm font-sans text-sm text-gray-400">{{ item.translate }}</div>
          </div>
          <button
            @click="play(item)"
            class="focus:outline-none dark:fill-gray-400 dark:opacity-80 cursor-pointer text-gray-600 h-8 w-8"
            type="button"
          >
            <SvgIcon name="sound" prefix="icon-svg" width="20" height="20" />
          </button>&nbsp;
          <el-icon size="18" class="mr-1"><DeleteFilled /></el-icon>&nbsp;
          <el-icon size="24"><StarFilled /></el-icon>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
  import { useAppStore, useUserStore } from '@/store';
  import { nextTick } from 'vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { DeleteFilled, StarFilled } from '@element-plus/icons-vue';

  const appStore = useAppStore();
  const userStore = useUserStore();

  const state = reactive({
    drawer: false,
    list: [],
    current: null,
  });
  const dialogWidth = ref('40%');

  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '90%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '50%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '30%'; // 在大屏幕下设置Dialog宽度为50%
    }
  };
  const open = (list, current) => {
    state.drawer = true;
    state.list = list;
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
