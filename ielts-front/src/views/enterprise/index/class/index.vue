<template>
  <div class="relative flex align-center pt-5 flex-col lg:flex-row">
    <div
      class="group flex lg:h-36 w-[46%] lg:w-74 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4"
      v-for="item in state.classList"
      :key="item.id"
      @click="handleToClassDetail(item)"
    >
      <div
        class="relative ml-1 px-3 lg:px-0 lg:mt-2 flex h-full w-full lg:flex-col lg:items-start items-center lg:justify-start justify-between"
      >
        <h1 class="mb-1.5 text-xl font-normal text-gray-800 group-hover:color-theme dark:text-gray-200">{{ item.name }}</h1>
        <p class="mb-2 font-bold text-gray-600 dark:text-gray-200">成员数量：{{ item.student_count }}</p>
        <div class="w-full items-center hidden lg:flex">
          <img src="@/assets/images/class.png" class="absolute right-0 top-0 w-26 opacity-40"/>
        </div>
      </div>
    </div>

    <div
      class="group flex lg:h-36 w-[46%] lg:w-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg lg:p-4 p-2 text-left shadow-lg focus:outline-none bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 lg:mr-6 md:mr-6 lg:mb-10 mb-4 flex-col"
      @click="handleNewClass"
    >
      <el-icon size="40" color="gray">
        <Plus />
      </el-icon>
      <div class="mt-4">新建班级</div>
    </div>

    <!-- 新建班级弹窗 -->
    <el-dialog title="新建班级" v-model="state.dialogVisible" width="380px">
      <div class="flex items-center flex-col">
        <el-input placeholder="请输入班级名称" v-model="state.className" />
      </div>
      <template #footer>
        <div class="flex justify-end">
          <el-button type="" @click="cancel" class="ml-5"> 取消 </el-button>
          <el-button type="primary" @click="addNewClass" class="ml-5"> 创建 </el-button>
        </div>
      </template>
    </el-dialog>

    <tabbar />
  </div>
</template>
<script setup>
  import tabbar from '@/components/tabBar/qy-tabbar.vue';
  import { Plus } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  import { getClassList, addClass } from '@/api/company/index';

  const router = useRouter();

  const state = reactive({
    dialogVisible: false,
    classList: [],
    className: '',
  });

  const handleNewClass = () => {
    state.dialogVisible = true;
  };

  const addNewClass = () => {
    addClass({
      name: state.className,
    }).then((res) => {
      getClassInfo();
      cancel();
    });
  };

  const getClassInfo = () => {
    getClassList().then((res) => {
      console.log(res);
      state.classList = res;
    });
  };
  getClassInfo();
  const cancel = () => {
    state.dialogVisible = false;
  };

  const handleToClassDetail = (item) => {
    router.push('/company/index/classDetail?id=' + item.id);
  };
</script>
