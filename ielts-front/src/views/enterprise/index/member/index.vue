<template>
  <div class="md:px-10 px-4 flex flex-col items-center">
    <div class="flex items-center justify-between lg:mt-10 mt-4 lg:w-200 w-full">
      <div class="text-m flex">
        {{ state.managerList?.length }}名项目成员&nbsp;&nbsp;
        <span class="text-gray flex items-center text-m"
          >项目成员角色&nbsp;
          <el-tooltip placement="bottom" effect="light">
            <template #content>
              <div class="text-m">
                <b>管理员</b>
                <p class="text-gray-400">可查看全部班级</p>
              </div>
              <div class="text-m">
                <b>教师</b>
                <p class="text-gray-400">仅可查看自己班级</p>
              </div>
            </template>
            <el-icon><Warning /></el-icon>
          </el-tooltip>
        </span>
      </div>
      <div class="flex items-center">
        <!-- <div class="mr-4 flex cursor-pointer items-center">
          <el-input size="small" placeholder="请输入姓名" v-model="state.searchName" @enter="search"/>&nbsp;&nbsp;
          <el-icon><Search /></el-icon>
        </div> -->
        <el-button type="primary" size="small" @click="getCode">复制邀请链接</el-button>
      </div>
    </div>
    <div class="font-bold flex justify-between mt-6 mb-2 lg:w-200 w-full">
      <div class="w-1/3">成员</div>
      <!-- <div class="w-1/3 text-center">进入时间</div> -->
      <div class="w-1/3 text-right">项目角色</div>
    </div>
    <div class="flex justify-between lg:py-3 py-2 text-xs items-center lg:w-200 w-full" v-for="(item, index) in state.managerList">
      <!-- <div class="w-1/3">
        <div class="h-8 w-8 bg-theme rounded-full text-white flex justify-center items-center">{{ item.name && item.name.slice(0, 1) }}</div>
      </div> -->
      <div class="w-1/3">{{ item.name }}</div>
      <!-- <div class="w-1/3 text-center">{{ item.created_at }}</div> -->
      <div class="w-1/3 flex justify-end">
        <span v-if="index == 0">{{ item.role.name }}</span>
        <el-dropdown v-else size="small" trigger="click" @command="(sign) => permissionChange(item, sign)">
          <span>
            {{ item.role.name }}
            <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in state.roleList" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
              <el-dropdown-item command="移除">移除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <tabbar />
    <Loading :loading="loading" />
  </div>
</template>
<script setup>
  import { Search, ArrowDown, Warning } from '@element-plus/icons-vue';
  import { getManagerList, updateManagerRole, delManager, getRoles } from '@/api/company/index';
  import { ElMessage } from 'element-plus';
  import tabbar from '@/components/tabBar/qy-tabbar.vue';
  import { useInvite } from '../../useCommon.js';
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';

  const { getCode } = useInvite();
  const { loading, setLoading } = useLoading();

  const state = reactive({
    managerList: [],
    roleList: [],
  });
  const getManager = () => {
    setLoading(true);
    getManagerList().then((res) => {
      setLoading(false);
      console.log(res);
      state.managerList = res;
    });
  };
  const getInitData = () => {
    getRoles().then((res) => {
      state.roleList = res;
    });
  };
  const permissionChange = (item, sign) => {
    if (sign == '移除') {
      delManager({
        manager_id: item.id,
      }).then((res) => {
        console.log(res);
        getManager();
      });
    } else {
      updateManagerRole({
        manager_id: item.id,
        role_id: sign,
      }).then((res) => {
        ElMessage.success('修改成功');
        getManager();
      });
    }
  };
  getManager();
  getInitData();
</script>
