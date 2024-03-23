<template>
  <svg aria-hidden="true" class="svg-icon-spin" :height="props.height" :width="props.width">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon-svg',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    hoverColor: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: 32,
    },
    height: {
      type: [String, Number],
      default: 32,
    },
  });
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  // const calsses = computed(() => {
  //   return {
  //     [`sdms-size-${props.size}`]: props.size,
  //   };
  // });
  // const fontSize = reactive({ default: '32px', small: '20px', large: '48px' });
</script>
<style lang="less" scoped>
  svg:hover {
    fill: v-bind(hoverColor);
    color: v-bind(hoverColor);
  }
  .svg-icon-spin {
    fill: v-bind(color);
    vertical-align: middle;
    color: v-bind(color);
  }
</style>
