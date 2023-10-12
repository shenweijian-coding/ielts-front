<template>
  <div class="dark:text-slate-400 dark:bg-slate-900">
    <Header />

    <div class="flex p-8">
      <!-- 主体区域 写单词 -->
      <div class="w-6/8">
        <el-table :data="tableData.data" border style="width: 100%" :height="tableData.maxHeight" stripe :max-height="tableData.maxHeight">
          <el-table-column prop="idx" type="index" label="序号" width="80" />
          <el-table-column prop="user_input" label="听写输入" width="380">
            <template #default="{ row }">
              <el-input v-model="row.user_input" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="word" label="正确拼写">
            <template #header>
              <span>正确拼写 </span>
              <span
                class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer"
                @click="tableData.headerShowToggle.word = !tableData.headerShowToggle.word"
                >{{ tableData.headerShowToggle.word ? '隐藏' : '显示' }}</span
              >
            </template>
            <template #default="{ row }">
              <span>{{ tableData.headerShowToggle.word ? row.word : '***' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="zh" label="中文翻译">
            <template #header>
              <span>中文翻译</span>
              <span
                class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer"
                @click="tableData.headerShowToggle.zh = !tableData.headerShowToggle.zh"
                >{{ tableData.headerShowToggle.zh ? '隐藏' : '显示' }}</span
              >
            </template>
            <template #default="{ row }">
              <span>{{ tableData.headerShowToggle.zh ? row.zh : '***' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="result" label="结果">
            <template #header>
              <span>结果</span>
              <span
                class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer"
                @click="tableData.headerShowToggle.result = !tableData.headerShowToggle.result"
                >{{ tableData.headerShowToggle.result ? '隐藏' : '显示' }}</span
              >
            </template>
            <template #default="{ row }">
              <span>{{ tableData.headerShowToggle.result ? row.result : '***' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="error_total" label="累计错误次数">
            <template #header>
              <span>累计错误次数</span>
              <span
                class="text-xs text-cyan-500 underline underline-offset-2 cursor-pointer"
                @click="tableData.headerShowToggle.error_total = !tableData.headerShowToggle.error_total"
                >{{ tableData.headerShowToggle.error_total ? '隐藏' : '显示' }}</span
              >
            </template>
            <template #default="{ row }">
              <span>{{ tableData.headerShowToggle.error_total ? row.error_total : '***' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 听写 配置区域 -->
      <div class="w-2/8">
        <DictationSetting />
        <WordConfig @current-chapter="getWords" />
        <div>
          <el-button type="primary" status="success" @click="start">开始听写</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useAppStore } from '@/store/modules/app';
  import Header from '@/components/Header/index.vue';
  import DictationSetting from '@/components/DictationSetting/index.vue';
  import WordConfig from '@/components/WordConfig/index.vue';
  import { getWordList } from '@/api/book';

  const appStore = useAppStore();

  const tableData = reactive({
    maxHeight: '1080px',
    data: [],
    headerShowToggle: {
      word: true,
      zh: true,
      result: true,
      error_total: true,
    },
  });

  // 获取设备宽高
  const getWindowInfo = () => {
    tableData.maxHeight = document.body.clientHeight - 184 + 'px';
  };
  // 监听窗口大小变化
  window.addEventListener('resize', getWindowInfo);
  getWindowInfo();

  // 获取某个章节的单词
  const getWords = (params) => {
    getWordList(params).then((res) => {
      tableData.data = res.words;
      console.log(res);
    });
  };

  // 开始听写
  const start = () => {};
</script>

<style lang="less" scoped></style>
