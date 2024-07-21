<template>
  <div class="lg:px-100 px-4">
    <div class="flex items-center justify-between lg:mt-10 mt-4">
      <div>2名项目成员</div>
      <div class="flex items-center">
        <div class="mr-4 flex cursor-pointer">
          <el-icon><Search /></el-icon>
        </div>
        <el-button type="primary" size="small">添加项目成员</el-button>
      </div>
    </div>
    <div class="font-bold flex justify-between mt-6 mb-2">
      <span>成员</span>
      <span>邮箱</span>
      <span>项目角色</span>
    </div>
    <div class="flex justify-between lg:py-3 py-2 text-xs items-center" v-for="item in state.managerList">
      <div class="h-8 w-8 bg-theme rounded-full text-white flex justify-center items-center">{{ item.name && item.name.slice(0, 1) }}</div>
      <div>{{ item.name }}</div>
      <div>
        <el-dropdown size="small" trigger="click" @command="(sign) => permissionChange(item, sign)">
          <span>
            {{ item.role.name }}
            <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="管理">可管理</el-dropdown-item>
              <el-dropdown-item command="编辑">可编辑</el-dropdown-item>
              <el-dropdown-item command="阅读">可阅读</el-dropdown-item>
              <el-dropdown-item command="移除" class="text-red">移除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { Search, ArrowDown } from '@element-plus/icons-vue';
  import { getManagerList, updateManagerRole, delManager } from '@/api/company/index';
  import { ElMessage } from 'element-plus';

  const state = reactive({
    managerList: [],
  });
  const getManager = () => {
    getManagerList().then((res) => {
      console.log(res);
      state.managerList = res;
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
        abilities: JSON.stringify([sign]),
      }).then((res) => {
        getManager();
        console.log(res);
        ElMessage.success('修改成功');
      });
    }
  };
  getManager();
</script>
