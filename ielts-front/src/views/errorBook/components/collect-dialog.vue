<template>
  <el-dialog v-model="state.dialogVisible" title="将单词书收藏至" :width="dialogWidth" :before-close="handleClose" center>
    <div v-for="(item, index) in state.list" :key="item.id">
      <div class="flex items-center justify-evenly px-10">
        <div class="w-80 flex items-center">
          <!-- <img src="@/assets/images/book.png" class="w-10 h-10 mr-6" /> -->
          <div>{{ item.name }}</div>
        </div>
        <span class="cursor-pointer">
          <!-- <SvgIcon name="collect" color="grey" width="20" height="20" @click="handleCollect" />
          <SvgIcon name="collect-active" width="21" height="21" @click="handleCollect" /> -->
          <el-button size="small" @click="handleCollect(item)">收藏</el-button>
        </span>
      </div>
      <div class="bottom-border"></div>
    </div>
    <div class="px-10 flex items-center">
      <!-- <div class="book-add flex items-center justify-center mr-4">
        <el-icon><Plus /></el-icon>
      </div> -->
      <el-button type="text" @click="handleAdd" class="">新建单词本</el-button>
    </div>
    <div class="py-3"></div>
    <div class="flex justify-center text-sm">
      <el-checkbox @change="collectAuto" :value="!!userStore.default_collection_book">自动收藏至上次添加单词的单词本</el-checkbox>
    </div>
  </el-dialog>
</template>
<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { wordLabel, getGroupBooks } from '@/api/book/index';
  import { Plus } from '@element-plus/icons-vue';
  import { ElMessage, ElNotification } from 'element-plus';
  import { useUserStore } from '@/store';
  import { h } from 'vue'

  const state = reactive({
    list: [],
    dialogVisible: false,
    ids: [],
    isAdd: false,
  });

  const emits = defineEmits(['addBook']);
  const dialogWidth = ref('400px');
  const userStore = useUserStore();

  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '90%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '70%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '500px'; // 在大屏幕下设置Dialog宽度为50%
    }
  };
  windowSize();
  const handleClose = () => {
    state.dialogVisible = false;
  };

  const handleCollect = (item) => {
    wordLabel({
      type: 'collection',
      lexicon_ids: JSON.stringify(state.ids),
      book_id: item.id,
    })
      .then((res) => {
        handleClose()
      })
      .catch((err) => {
      });
  };
  const handleAdd = () => {
    state.dialogVisible = false;
    emits('addBook');
  };
  const collectAuto = (val) => {
    userStore.handleConfig('default_collection_book', Number(val));
    if (val) {
      userStore.handleConfig('recent_collection_book_id', val);
    }
  };
  const getBooks = (s_id) => {

    getGroupBooks({ s_id: s_id })
      .then((res) => {
        state.list = res;
      })
      .catch(() => {
      });
  };
  const open = (ids) => {
    state.ids = ids;
    if(userStore.default_collection_book) {
      if(userStore.recent_collection_book_id) {
        handleCollect({ id: userStore.recent_collection_book_id })
        return
      }else {
        ElMessage.warning('首次收藏，无法自动收藏至上次单词本，请先手动收藏')
      }
    }
    state.dialogVisible = true;
    getBooks(3)
  };
  defineExpose({
    open,
  });
</script>
<style lang="less" scoped>
  .bottom-border {
    background-color: #f5f5f5;
    height: 1px;
    margin: 10px 0;
  }
  .book-add {
    height: 46px;
    width: 30px;
    border: 1px solid #d3d3d3;
    padding: 10px 4px;
  }
</style>
