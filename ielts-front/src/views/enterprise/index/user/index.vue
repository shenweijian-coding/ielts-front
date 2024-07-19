<template>
  <div>
    <div class="info-pc-header hidden lg:block">
      <p style="text-align: center; font-size: 18px; color: rgba(255, 255, 255, 0.84); padding-top: 24px">
        :) Hi~ 猿小申，新的一天又开始了，祝你过得快乐!
      </p>
    </div>
    <div class="lg:hidden h-16"></div>
    <div class="info-pc-header-info h-100">
      <div class="flex justify-between items-center lg:px-30">
      <div>
        <div class="user-info flex justify-start items-center border">
          <div class="user-img h-18 w-18 border bg-theme rounded-full flex justify-center items-center text-white">
            伟建
          </div>
          <div class="ml-4 flex flex-col">
            <div class="info-name">猿小申</div> 
            <div class="mt-2">QID：1834638245</div>
          </div>
        </div>
      </div>

        <el-button size="small">切换个人版</el-button>
      </div>
      <div class="bg-white md:px-30 px-2 w-full m-auto mt-4">
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">人员管理</span></div> 
          <div class="right">
            <span class="tips text-theme cursor-pointer">查看</span>
          </div>
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">邀请同事加入</span></div> 
          <div class="right"><span class="tips text-theme cursor-pointer">复制邀请链接</span></div>
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">退出登陆</span></div> 
          <div class="right "><span class="tips flex items-center cursor-pointer">登陆新的账号 <el-icon><ArrowRight /></el-icon></span></div>
        </div>
      </div>

    </div>
    <tabbar />
  </div>
</template>
<script setup>
  import tabbar from '@/components/tabBar/qy-tabbar.vue';
  import { ArrowRight } from '@element-plus/icons-vue';

</script>
<style lang="less" scoped>
  .info-pc-header {
    background-image: url(https://youimg1.c-ctrip.com/target/100n0b0000005wf0b8106.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    padding: 24px;
    margin-top: 24px;
    height: 200px;
    width: 100%;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 8px 0 #9d9d9d;
    box-shadow: 0 0 8px 0 #9d9d9d;
    background-position: center;
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
  .menu-item{
    border-bottom: 1px solid #f7f7f7;
  }
</style>
