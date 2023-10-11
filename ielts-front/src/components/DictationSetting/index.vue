
<template>
  <div>
    <el-form :model="config" label-width="120px">
      <el-form-item label="当前播放速度">
        <el-input-number v-model="config.speed" :min="0.1" :max="10" />
      </el-form-item>
      <el-form-item label="单词播放间隔">
        <el-input-number v-model="config.interval" :min="0.1" :max="10"/>
      </el-form-item>
      <el-form-item label="单词重复播放">
        <el-input-number v-model="config.repeat" :min="1" :max="10" :precision="1"/>
      </el-form-item>
      <el-form-item label="发音">
        <el-radio-group v-model="config.pronounce" size="default">
          <el-radio-button label="1">英音</el-radio-button>
          <el-radio-button label="2">美英</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="听写方式">
        <el-radio-group v-model="config.mode" size="default">
          <el-radio-button label="1">连续播放音频</el-radio-button>
          <el-radio-button label="2">单个单词播放</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>

const config = reactive({
  speed: 1,
  interval: 1,
  repeat: 1,
  pronounce: 1, // 英音-1 美英-2
  mode: 1 // 连续播放-1 单个播放-2
})
</script>