<template>
  <div class="dark:text-slate-400 dark:bg-slate-900">
    <Header />

    <div class="flex p-8 ">
      <!-- 主体区域 写单词 -->
      <div class="w-6/8">
        <el-table :data="tableData.data" border style="width: 100%" :height="tableData.maxHeight" stripe
          :max-height="tableData.maxHeight">
          <el-table-column prop="idx" label="序号" width="80" />
          <el-table-column prop="user_input" label="听写输入" width="380">
            <template #default="scope">
              <el-input placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="word" label="正确拼写">
            <template #header>
              <span>正确拼写 </span>
              <span class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer"
                @click="tableData.headerShowToggle.word = !tableData.headerShowToggle.word">{{
                  tableData.headerShowToggle.word ? '隐藏' : '显示' }}</span>
            </template>
            <template #default="{ row }">
              <span>{{ tableData.headerShowToggle.word ? row.word : '***' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="translate" label="中文翻译">
            <template #header>
              <span>中文翻译</span>
              <span class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer"
                @click="tableData.headerShowToggle.translate = !tableData.headerShowToggle.translate">{{
                  tableData.headerShowToggle.translate ? '隐藏' : '显示' }}</span>
            </template>
            <template #default="{ row }">
              <span>{{ tableData.headerShowToggle.translate ? row.translate : '***' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="result" label="结果">
            <template #header>
              <span>结果</span>
              <span class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer"
                @click="tableData.headerShowToggle.result = !tableData.headerShowToggle.result">{{
                  tableData.headerShowToggle.result ? '隐藏' : '显示' }}</span>
            </template>
            <template #default="{ row }">
              <span>{{ tableData.headerShowToggle.result ? row.result : '***' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="error_total" label="累计错误次数">
            <template #header>
              <span>累计错误次数</span>
              <span class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer"
                @click="tableData.headerShowToggle.error_total = !tableData.headerShowToggle.error_total">{{
                  tableData.headerShowToggle.error_total ? '隐藏' : '显示' }}</span>
            </template>
            <template #default="{ row }">
              <span>{{ tableData.headerShowToggle.error_total ? row.error_total : '***' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
  
      <!-- 听写 配置区域 -->
      <div class="w-2/8">
        <DictationSetting></DictationSetting>
        <WordConfig></WordConfig>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue';
import { useAppStore } from '@/store/modules/app';
import Header from '@/components/Header/index.vue';
import DictationSetting from '@/components/DictationSetting/index.vue'
import WordConfig from '@/components/WordConfig/index.vue'

const appStore = useAppStore();

const tableData = reactive({
  maxHeight: '1080px',
  data: [],
  headerShowToggle: {
    word: true,
    translate: true,
    result: true,
    error_total: true
  }
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

// 获取设备宽高
const getWindowInfo = () => {
  tableData.maxHeight = document.body.clientHeight - 184 + 'px'
}
// 监听窗口大小变化
window.addEventListener('resize', getWindowInfo)
getWindowInfo()
</script>

<style lang="less" scoped></style>
