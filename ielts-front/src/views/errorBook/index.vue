<template>
  <div class="flex w-full flex-1 select-text items-start justify-center overflow-hidden">
    <div class="flex h-full w-5/6 flex-col pt-10">
      <div>
        <el-form :model="state.form" size="large" label-width="80">
          <el-form-item label="错误时间">
            <el-radio-group v-model="state.form.errTime">
              <el-radio-button v-for="o in state.errTimeOption" :key="o" :value="o" :label="o">{{ o }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="错误次数">
            <el-radio-group v-model="state.form.errNum" size="large">
              <el-radio-button v-for="o in state.errNumOption" :key="o" :value="o" :label="o">{{ o }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="章节">
            <el-select v-model="state.form.chapter" placeholder="章节">
              <el-option v-for="item in state.chapterList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="state.tableData" style="width: 100%" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="word" label="单词" width="180" />
          <el-table-column prop="paraphrase" label="释义" width="180" />
          <el-table-column prop="phonetic_symbol" label="音标" />
          <el-table-column prop="errNum" label="错误次数" />
          <el-table-column prop="errWord" label="错误拼写" />
          <el-table-column prop="dictionaries" label="词典" />
          <el-table-column prop="chapter" label="章节" />
          <el-table-column prop="errTime" label="最近错误时间" />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup>
  const state = reactive({
    form: {
      errTime: '全部',
      errNum: '全部',
      chapter: '全部',
    },
    errTimeOption: ['全部', '最近一次听写', '今天', '近七天'],
    errNumOption: ['全部', '2次及以上', '3次及以上'],
    chapterList: ['全部', '滴滴'],
    tableData: [],
    selWords: [],
  });

  const getErrorWords = () => {
    state.tableData = [
      {
        word: 'chinese',
        paraphrase: 'shiyi',
        phonetic_symbol: 'yinbiao',
        errNum: 2,
        errWord: 'chinara',
        dictionaries: '雅思资料库',
        chapter: '1-1',
        errTime: '2024-1-1',
      },
    ];
  };
  const handleSelectionChange = (val) => {
    console.log(val);
    state.selWords = val;
  };
  getErrorWords();
</script>
