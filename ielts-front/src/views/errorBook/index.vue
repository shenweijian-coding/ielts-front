<template>
  <div class="flex w-full flex-1 select-text items-start justify-center overflow-hidden">
    <div class="flex h-full w-5/6 flex-col pt-10">
      <div>
        <el-form>
          <el-form-item label="错误时间">
            <el-radio-group>
              <el-radio-button v-for="o in state.errTimeOption" :key="o">{{ o }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="错误次数">
            <el-radio-group>
              <el-radio-button v-for="o in state.errNumOption" :key="o">{{ o }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="章节">
            <el-select>
              <el-option />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="state.tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="word" label="单词" width="180" />
          <el-table-column prop="paraphrase" label="释义" width="180" />
          <el-table-column prop="phonetic_symbol" label="音标" />
          <el-table-column prop="errNum" label="错误次数" />
          <el-table-column prop="address" label="错误拼写" />
          <el-table-column prop="address" label="词典" />
          <el-table-column prop="address" label="章节" />
          <el-table-column prop="address" label="最近错误时间" />
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup>
  const state = reactive({
    form: {
      errTime: '',
      errNum: '',
      chapter: '',
    },
    errTimeOption: ['全部', '最近一次听写', '今天', '近七天'],
    errNumOption: ['全部', '2次及以上', '3次及以上'],
    chapter: ['全部', '滴滴'],
    tableData: [],
  });
</script>
