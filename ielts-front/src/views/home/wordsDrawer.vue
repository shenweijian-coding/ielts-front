<template>
  <el-drawer v-model="state.drawer" :title="appStore?.dictationInfo?.booInfo.remarks">
    <div class="min-width: 100%; display: table;">
      <div class="flex h-full w-full flex-col gap-1">
        <div
          v-for="item in state.list"
          :key="item.id"
          class="mb-2 flex cursor-pointer select-text items-center rounded-xl py-2 px-4 shadow focus:outline-none dark:bg-opacity-20"
          :class="state.current == item ? 'bg-theme_hover current' : ''"
          :id="state.current == item ? 'current' : ''"
          ><div class="flex-1"
            ><p class="select-all font-mono text-xl font-normal leading-6 dark:text-gray-50 mb-2">{{ item.word }}</p
            ><div class="mt-2 max-w-sm font-sans text-sm text-gray-400">{{ item.translate }}</div></div
          >
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
  import { useAppStore } from '@/store';
  import { nextTick } from 'vue';

  const appStore = useAppStore();

  const state = reactive({
    drawer: false,
    list: [],
    current: null,
  });

  const open = (list, current) => {
    state.drawer = true;
    state.list = list;
    state.current = current;
    nextTick(() => {
      document.getElementById('current').scrollIntoView();
    });
  };

  defineExpose({
    open,
  });
</script>
