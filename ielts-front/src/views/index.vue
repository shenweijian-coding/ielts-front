<template>
  <div class="dark:text-slate-400 dark:bg-slate-900">
    <Header />

    <!-- 主体区域 写单词 -->
    <div class="p-12">
      <el-table :data="tableData.data" border style="width: 100%" :height="tableData.maxHeight" stripe
        :max-height="tableData.maxHeight">
        <el-table-column prop="idx" label="序号" width="80" />
        <el-table-column prop="user_input" label="听写输入" width="280">
          <template #default="scope">
            <el-input placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="word" label="正确拼写">
          <template #header>
            <span>正确拼写 </span>
            <span class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer">隐藏</span>
          </template>
        </el-table-column>
        <el-table-column prop="translate" label="中文翻译">
          <template #header>
            <span>中文翻译</span>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="结果">
          <template #header>
            <span>结果</span>
          </template>
        </el-table-column>
        <el-table-column prop="error_total" label="累计错误次数">
          <template #header>
            <span>累计错误次数</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useAppStore } from '@/store/modules/app';
import Header from '@/components/Header/index.vue';

const appStore = useAppStore();

const tableData = reactive({
  maxHeight: document.body.clientHeight - 184 + 'px',
  data: [],
  
})
console.log(document.body.clientHeight - 84);
const arr = []
for (let i = 0; i < 300; i++) {
  const item = {
    idx: i,
    user_input: '',
    word: Math.random(),
    translate: Math.random(),
    result: 0,
    error_total: 0
  }
  arr.push(item)
}
tableData.data = arr
</script>

<style lang="less" scoped></style>
