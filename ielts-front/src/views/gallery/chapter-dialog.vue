<template>
  <el-dialog v-model="state.dialogVisible" title="CET-4" width="40%" :before-close="handleClose">
    <div class="text relative flex h-30 flex-col gap-2">
      <p class="mt-1">131 章节</p><p>共 2607 词</p><p>大学英语四级词库</p>
      <div class="absolute bottom-6 right-4">
        <div role="group" dir="ltr" class="flex items-center justify-center gap-1" tabindex="0" style="outline: none">
          <a href="/errorBook">
            <el-button>查看错题</el-button>
          </a>
        </div>
      </div>
    </div>
    <div class="flex pl-0">
      <div class="h-[30rem] w-full">
        <div class="mt-2 focus:outline-none h-full">
          <div class="relative overflow-hidden h-[30rem]">
            <div class="h-full w-full rounded-[inherit]">
              <div class="flex w-full flex-wrap gap-3">
                <div
                  class="relative flex h-16 w-40 cursor-pointer flex-col items-start justify-center overflow-hidden rounded-xl bg-slate-100 px-3 pt-3 dark:bg-slate-800"
                  ><h3>第 1 章</h3><p class="pt-[2px] text-xs text-slate-600">未练习</p>
                  <SvgIcon
                    name="tick"
                    color="#ff5c00"
                    class="absolute -bottom-4 -right-4 h-18 w-18 text-6xl text-green-500 opacity-40 dark:text-green-300"
                    size="70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { reactive } from 'vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';

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
