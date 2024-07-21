<template>
  <div class="px-30">
    <div class="info-pc-header hidden lg:block">
      <p class="text-center text-lg text-white mt-10"> :) Hi~ 新的一天又开始了，祝你过得快乐! </p>
    </div>
    <div class="lg:hidden h-16"></div>
    <div class="info-pc-header-info">
      <div class="flex justify-between items-center md:px-20">
        <div>
          <div class="user-info flex justify-start items-center border">
            <div class="user-img h-18 w-18 border bg-theme rounded-full flex justify-center items-center text-white"> 伟建 </div>
            <div class="ml-4 flex flex-col">
              <div class="info-name">猿小申</div>
              <div class="mt-2">QID：1834638245</div>
            </div>
          </div>
        </div>

        <el-button size="small">切换个人版</el-button>
      </div>
      <div class="bg-white md:px-20 px-2 w-full m-auto mt-4">
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">人员管理</span></div>
          <div class="right" @click="toNewRoute">
            <span class="tips text-theme cursor-pointer">查看</span>
          </div>
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">邀请同事加入</span></div>
          <div class="right"><span class="tips text-theme cursor-pointer">复制邀请链接</span></div>
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">退出登陆</span></div>
          <div class="right"
            ><span class="tips flex items-center cursor-pointer"
              >登陆新的账号 <el-icon><ArrowRight /></el-icon></span
          ></div>
        </div>
      </div>
    </div>
    <tabbar />
  </div>
</template>
<script setup>
  import tabbar from '@/components/tabBar/qy-tabbar.vue';
  import { ArrowRight } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const toNewRoute = () => {
    router.push('/company/index/memberlist');
  };
</script>
<style lang="less" scoped>
  .info-pc-header {
    background-image: url(https://c.wallhere.com/photos/55/03/abstract_digital_art_minimalism_Windows_11_dark_background_violet_color_simple_background-2234736.jpg!d);
    background-size: cover;
    background-repeat: no-repeat;
    padding: 24px;
    margin-top: 24px;
    height: 200px;
    width: 100%;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 8px 0 #9d9d9d;
    box-shadow: 0 0 8px 0 #9d9d9d;
    background-position: bottom;
  }
  .info-pc-header-info {
    -webkit-box-align: start !important;
    -ms-flex-align: start !important;
    align-items: flex-start !important;
    width: 85%;
    background-color: hsla(0, 0%, 100%, 0.5686274509803921);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border-radius: 4px;
    padding: 24px 24px 40px;
    -webkit-box-shadow: 0 0 8px 0 hsla(0, 0%, 61.6%, 0.09019607843137255);
    box-shadow: 0 0 8px 0 hsla(0, 0%, 61.6%, 0.09019607843137255);
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: -50px auto 24px;
  }
  .menu-item {
    border-bottom: 1px solid #f7f7f7;
  }
</style>
