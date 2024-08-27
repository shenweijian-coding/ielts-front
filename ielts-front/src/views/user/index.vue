<template>
  <div class="md:px-30">
    <div class="info-pc-header hidden lg:block">
      <p class="text-center text-lg text-white mt-10"> :) Hi~ {{ userStore.$state.id }}，新的一天又开始了，祝你过得快乐! </p>
    </div>
    <div class="lg:hidden h-16"></div>
    <div class="w-full md:w-4/5 info-pc-header-info p-2 pb-8">
      <div class="flex justify-between items-center md:px-20">
        <div>
          <div class="user-info flex justify-start items-center border">
            <div class="user-img h-18 w-18 rounded-full flex justify-center items-center text-white">
              <img src="@/assets/images/avatar.png" alt="" class="w-18 h-18 rounded-full" />
            </div>
            <div class="hidden ml-4 md:flex flex-col">
            </div>
          </div>
        </div>

        <el-button v-if="userStore.$state.is_enterprise" size="small" @click="toNewRoute('/company/index/user')">切换企业版</el-button>
      </div>
      <div class="bg-white md:px-20 px-2 w-full m-auto mt-4">
        <!-- <div class="menu-item flex items-center py-6 justify-between border-bottom" @click="handleToBook">
          <div class="left"><span class="menu-title font-bold text-sm">单词本</span></div>
          <div class="right">
            <span class="text-gray cursor-pointer flex items-center hover-text-theme"
              ><el-icon><ArrowRight /></el-icon
            ></span>
          </div>
        </div> -->
        <!-- <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">修改密码</span></div>
          <div class="right" @click="toNewRoute('/forgetPassword')"
            ><span class="text-gray cursor-pointer flex items-center hover-text-theme"
              >去修改<el-icon><ArrowRight /></el-icon></span
          ></div>
        </div> -->
        <div class="menu-item flex items-center py-6 justify-between border-bottom cursor-pointer" @click="openTeaching">
          <div class="left"><span class="menu-title font-bold text-sm">新手教学视频</span></div>
          <div class="right"
            ><span class="text-gray flex items-center hover-text-theme"
              ><el-icon><ArrowRight /></el-icon></span
          ></div>
        </div>

        <div
          v-if="!userStore.$state.is_enterprise"
          class="menu-item flex items-center py-6 justify-between border-bottom cursor-pointer"
          @click="toNewRoute('/company/applicat')"
        >
          <div class="left"><span class="menu-title font-bold text-sm">企业账号</span></div>
          <div class="right"
            ><span class="text-gray flex items-center hover-text-theme"
              ><el-icon><ArrowRight /></el-icon></span
          ></div>
        </div>

        <div
          v-if="userStore.$state.school_class.length"
          class="menu-item flex items-center py-6 justify-between border-bottom cursor-pointer"
          @click="handleloyoutClass"
        >
          <div class="left"><span class="menu-title font-bold text-sm">我的班级</span></div>
          <div class="right"
            ><span class="text-gray flex items-center hover-text-theme"
              >退出班级<el-icon><ArrowRight /></el-icon></span
          ></div>
        </div>

        <!-- <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">注册时间</span></div>
          <div class="right"
            ><span class="flex items-center text-gray">{{ userStore.$state.created_at }}</span></div
          >
        </div> -->
        <div class="menu-item flex items-center py-6 justify-between border-bottom cursor-pointer" @click="handleLogout">
          <div class="left"><span class="menu-title font-bold text-sm">退出登陆</span></div>
          <div class="right"
            ><span class="text-gray flex items-center"
              ><el-icon><ArrowRight /></el-icon></span
          ></div>
        </div>
      </div>
    </div>
    <tabbar />
  </div>
  <Teach ref="teachRef" />
</template>
<script setup>
  import { useUserStore } from '@/store';
  import { useRouter } from 'vue-router';
  import { ElMessageBox } from 'element-plus';
  import { ArrowRight } from '@element-plus/icons-vue';
  
  import tabbar from '@/components/tabBar/index.vue';
  import Teach from '@/components/teaching/index.vue';
  import { classLogout } from '@/api/company/index';

  const userStore = useUserStore();
  const router = useRouter();

  const teachRef = ref(null);

  const handleLogout = () => {
    ElMessageBox.confirm('确定退出登录吗', ``, {
      confirmButtonText: '确定退出',
      cancelButtonText: '取消',
      type: 'warning',
      distinguishCancelAndClose: true,
      closeOnClickModal: false,
    }).then(() => {
      userStore.logout();
    });
  };

  const openTeaching = () => {
    console.log(teachRef.value);
    teachRef.value && teachRef.value.open();
  };

  const toNewRoute = (newRoute) => {
    router.push(newRoute);
  };

  const handleloyoutClass = () => {
    ElMessageBox.confirm('确定退出班级吗', ``, {
      confirmButtonText: '确定退出',
      cancelButtonText: '取消',
      type: 'warning',
      distinguishCancelAndClose: true,
      closeOnClickModal: false,
    }).then(() => {
      classLogout({
        class_id: userStore.classInfo?.[0].class_id,
      }).then(() => {
        userStore.info();
      });
    });
  };
</script>
<style lang="less" scoped>
  .el-button + .el-button {
    margin-left: 0;
    margin-right: 0;
  }
  .info-pc-header {
    background-image: url(https://img.alicdn.com/imgextra/i3/2217137022381/O1CN01euhAbT1TSY0TBBDfw_!!2217137022381.jpg);
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
    // width: 85%;
    background-color: hsla(0, 0%, 100%, 0.5686274509803921);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border-radius: 4px;
    // padding: 24px 24px 40px;
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
