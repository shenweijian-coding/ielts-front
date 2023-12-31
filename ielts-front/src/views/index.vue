<template>
  <div class="dark:text-slate-400 dark:bg-slate-900">
    <Header />

    <div class="flex p-8">
      <!-- 主体区域 写单词 -->
      <div class="w-6/8">
        <el-table
          :data="tableData.data"
          border
          style="width: 100%"
          :height="tableData.maxHeight"
          :max-height="tableData.maxHeight"
          highlight-current-row
          ref="tableRef"
          @row-click="rowClick"
          :row-class-name="tableRowClassName"
          row-key="idx"
        >
          <el-table-column prop="idx" type="index" label="序号" width="80" />
          <el-table-column prop="user_input" label="听写输入" width="380">
            <template #default="{ row, $index }">
              <el-input
                v-model="row.user_input"
                placeholder="请输入"
                @keyup.enter="handleFocus(row, $index + 1)"
                :ref="getInputRef($index)"
                @keyup.up="handleFocus(row, $index - 1)"
                @keyup.down="handleFocus(row, $index + 1)"
                @blur="handleResult(row, $index)"
                @focus="handleFocusInit(row, $index)"
              />
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
              <span v-if="tableData.headerShowToggle.result">
                <el-icon v-if="row.result == undefined" color="gray"><SemiSelect /></el-icon>
                <el-icon v-else-if="row.result" color="green"><Select /></el-icon>
                <el-icon v-else color="red"><CloseBold /></el-icon>
              </span>
              <span v-else>***</span>
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
          <el-button v-if="!tableData.playStatus" type="primary" status="success" @click="start">开始听写</el-button>
          <el-button v-else-if="tableData.playStatus == 1" type="primary" status="success" @click="start">开始听写</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useAppStore } from '@/store/modules/app';
  import { useUserStore } from '@/store/modules/user';
  import Header from '@/components/Header/index.vue';
  import DictationSetting from '@/components/DictationSetting/index.vue';
  import WordConfig from '@/components/WordConfig/index.vue';
  import { getWordList } from '@/api/book';
  import { Select, CloseBold, SemiSelect } from '@element-plus/icons-vue';

  const appStore = useAppStore();
  const userStore = useUserStore();

  // 有道的翻译api
  const YDAPI = 'https://dict.youdao.com/dictvoice?le=en&audio=';

  const tableData = reactive({
    maxHeight: '1080px',
    data: [],
    headerShowToggle: {
      word: true,
      zh: true,
      result: true,
      error_total: true,
    },
    playStatus: 0, // 0-未开始 1-播放中 2-已暂停
    currentIndex: 0, // 目前输入框聚焦的
  });

  const refs = []; // 单词输入框ref
  const tableRef = ref(); // 表格ref

  const config = computed(() => userStore.config);

  // 获取输入框的ref
  const getInputRef = (i) => {
    refs[+i] = ref(`inputRef${i}`);
    return refs[+i];
  };

  const tableRowClassName = ({ row, rowIndex }) => {
    row.index = rowIndex;
  };

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

  var playSpeed = config.value.speed || 1;
  var interval = (config.value.interval || 3) * 1000; // 播放间隔（毫秒）
  var repeatTimes = config.value.repeat || 1;

  // 开始听写
  const start = () => {
    tableData.playStatus = 1;
    if (userStore.config.mode == 1) {
      // 连续播放
      playWords(tableData.data);
    } else {
      // 单个播放
      // manualPlay();
    }
  };

  // 单个单词播放 通过回车或者鼠标选择触发
  // const manualPlay = () => {
  //   playWords(tableData.data);
  // };

  // 处理失焦时的输入框的结果
  const handleResult = (row, i) => {
    row.result = row.user_input === row.word;
  };

  // 获得焦点开始播放
  const handleFocusInit = (row, i) => {
    if (userStore.config.mode == 2) {
      playWords([row]);
    }
  };

  // 焦点移动
  const handleFocus = (row, i) => {
    if (+i >= tableData.data.length || +i < 0) {
      return;
    }
    refs[i].value.focus();
    tableRef.value.setCurrentRow(row, false);
    tableRef.value.setCurrentRow(tableData.data[i], true);
    tableData.currentIndex = i;
  };

  // 点击表格行
  const rowClick = (row) => {
    handleFocus(tableData.data[row.index], row.index);
  };

  // 播放音频的方法
  const playWords = (words) => {
    var index = 0;
    var count = 0;
    var audio = new Audio();
    audio.playbackRate = playSpeed;
    audio.addEventListener(
      'ended',
      function () {
        count++;
        if (count < repeatTimes) {
          // 这里是播放
          audio.src = YDAPI + words[index].word;
          setTimeout(() => {
            audio.play();
          }, interval);
        } else {
          index++;
          count = 0;

          if (index < words.length) {
            audio.src = YDAPI + words[index].word;
            setTimeout(() => {
              audio.play();
            }, interval);
          } else {
            // 所有单词都已播放完毕，停止播放
            return;
          }
        }
      },
      false,
    );
    audio.src = YDAPI + words[index].word;
    setTimeout(() => {
      audio.play();
    }, interval);
  };
</script>

<style lang="less" scoped></style>
