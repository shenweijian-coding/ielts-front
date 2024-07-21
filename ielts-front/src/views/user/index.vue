<template>
  <div class="px-30">
    <div class="info-pc-header hidden lg:block">
      <p class="text-center text-lg text-white mt-10"> :) Hi~ {{ userStore.$state.id }}，新的一天又开始了，祝你过得快乐! </p>
    </div>
    <div class="lg:hidden h-16"></div>
    <div class="info-pc-header-info">
      <div class="flex justify-between items-center md:px-20">
        <div>
          <div class="user-info flex justify-start items-center border">
            <div class="user-img h-18 w-18 border bg-theme rounded-full flex justify-center items-center text-white">
              {{ userStore.$state.id }}
            </div>
            <div class="ml-4 flex flex-col">
              <div class="info-name">id：{{ userStore.$state.id }}</div>
              <div class="mt-2">phone：{{ userStore.$state.phone_number }}</div>
            </div>
          </div>
        </div>

        <el-button size="small">切换企业版</el-button>
      </div>
      <div class="bg-white md:px-20 px-2 w-full m-auto mt-4">
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">单词本</span></div>
          <div class="right" @click="handleToBook">
            <span class="text-gray cursor-pointer flex items-center hover-text-theme"
              >（共 {{ state.list.length }} 本）查看<el-icon><ArrowRight /></el-icon
            ></span>
          </div>
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">修改密码</span></div>
          <div class="right"
            ><span class="text-gray cursor-pointer flex items-center hover-text-theme"
              >去修改<el-icon><ArrowRight /></el-icon></span
          ></div>
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">新手教学视频</span></div>
          <div class="right" @click="openTeaching"
            ><span class="text-gray flex items-center cursor-pointer hover-text-theme"
              >查看<el-icon><ArrowRight /></el-icon></span
          ></div>
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">企业账号</span></div>
          <div class="right" @click="toNewRoute('/company/applicat')"
            ><span class="text-gray cursor-pointer flex items-center hover-text-theme"
              >申请<el-icon><ArrowRight /></el-icon></span
          ></div>
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">注册时间</span></div>
          <div class="right"
            ><span class="cursor-pointer flex items-center hover-text-theme text-gray">{{ userStore.$state.created_at }}</span></div
          >
        </div>
        <div class="menu-item flex items-center py-6 justify-between border-bottom">
          <div class="left"><span class="menu-title font-bold text-sm">退出登陆</span></div>
          <div class="right" @click="handleLogout"
            ><span class="text-gray flex items-center cursor-pointer"
              >登陆新的账号 <el-icon><ArrowRight /></el-icon></span
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
  import tabbar from '@/components/tabBar/index.vue';
  import { useRouter } from 'vue-router';
  import { getGroupBooks } from '@/api/book/index';
  import { ElMessage } from 'element-plus';
  import Teach from '@/components/teaching/index.vue';
  import { ArrowRight } from '@element-plus/icons-vue';

  const userStore = useUserStore();
  const router = useRouter();

  const state = reactive({
    list: [],
  });
  const teachRef = ref(null);
  const handleLogout = () => {
    userStore.logout();
  };
  const handleToBook = () => {
    if (!state.list.length) {
      ElMessage.warning('无单词本');
      return;
    }
    router.push('/main/vocabularyBook');
  };
  const openTeaching = () => {
    console.log(teachRef.value);
    teachRef.value && teachRef.value.open();
  };

  const toNewRoute = (newRoute) => {
    router.push(newRoute);
  };
  const getBooks = (s_id) => {
    getGroupBooks({ s_id: s_id })
      .then((res) => {
        state.list = res;
      })
      .catch(() => {});
  };
  getBooks(2);
</script>
<style lang="less" scoped>
  .el-button + .el-button {
    margin-left: 0;
    margin-right: 0;
  }
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
