<template>
  <div>
    <div class="info-pc-header">
      <!-- <p style="text-align: center; font-size: 18px; color: rgba(255, 255, 255, 0.84); padding-top: 24px">
        :) Hi~ 猿小申，新的一天又开始了，祝你过得快乐!
      </p> -->
    </div>
    <div class="info-pc-header-info h-100"> </div>
    <tabbar />
  </div>
</template>
<script setup>
  import tabbar from '@/components/tabBar/qy-tabbar.vue';
</script>
<style lang="less" scoped>
  .info-pc-header {
    background-image: url(/src/assets/images/header_bg_user.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    padding: 24px;
    margin-top: 24px;
    height: 200px;
    width: 100%;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 8px 0 #9d9d9d;
    box-shadow: 0 0 8px 0 #9d9d9d;
  }
  .info-pc-header-info {
    -webkit-box-align: start !important;
    -ms-flex-align: start !important;
    align-items: flex-start !important;
    width: 95%;
    background-color: hsla(0, 0%, 100%, 0.5686274509803921);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border-radius: 4px;
    padding: 24px;
    -webkit-box-shadow: 0 0 8px 0 hsla(0, 0%, 61.6%, 0.09019607843137255);
    box-shadow: 0 0 8px 0 hsla(0, 0%, 61.6%, 0.09019607843137255);
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: -50px auto 24px;
  }
</style>
