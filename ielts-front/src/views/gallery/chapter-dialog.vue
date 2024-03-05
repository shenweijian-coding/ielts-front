<template>
  <el-dialog v-model="state.dialogVisible" title="CET-4" width="40%" :before-close="handleClose">
    <div class="text relative flex h-40 flex-col gap-2">
      <p class="mt-1">131 章节</p><p>共 2607 词</p><p>大学英语四级词库</p>
      <div class="absolute bottom-5 right-4">
        <div role="group" dir="ltr" class="flex items-center justify-center gap-1" tabindex="0" style="outline: none"></div>
      </div>
    </div>
    <div class="flex pl-0">
      <div class="h-[30rem] w-full">
        <div class="flex w-full flex-wrap gap-3">
          <div
            class="relative flex h-16 w-40 cursor-pointer flex-col items-start justify-center overflow-hidden rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800"
            ><h1>第 1 章</h1><p class="pt-[2px] text-xs text-slate-600">未练习</p
            ><svg
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              class="absolute -bottom-4 -right-4 h-18 w-18 text-6xl text-green-500 opacity-40 dark:text-green-300"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              /></svg
          ></div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { reactive } from 'vue';

  const state = reactive({
    dialogVisible: false,
  });

  const open = () => {
    state.dialogVisible = true;
  };
  const handleClose = () => {
    state.dialogVisible = false;
  };
  defineExpose({
    open,
  });
</script>
