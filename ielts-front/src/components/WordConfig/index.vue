
<template>
  <div>
    <el-form :model="config" label-width="120px">
      <el-form-item label="单词书">
        <el-radio-group v-model="config.name" size="default">
          <el-radio-button label="1">托福红宝书</el-radio-button>
          <el-radio-button label="2">雅思语料库</el-radio-button>
          <el-radio-button label="3">大学六级</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前章节">
        <el-radio-group v-model="config.act" size="default">
          <el-radio-button label="1-1">1-1</el-radio-button>
          <el-radio-button label="1-2">1-2</el-radio-button>
          <el-radio-button label="1-3">1-3</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前章节单词数">
        <span>{{ config.num }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>

const config = reactive({
  name: 1,
  act: '1-1',
  num: 1
})
</script>