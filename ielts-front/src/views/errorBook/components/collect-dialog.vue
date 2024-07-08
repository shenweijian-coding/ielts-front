<template>
  <el-dialog v-model="state.dialogVisible" title="将单词书收藏至" :width="dialogWidth" :before-close="handleClose" center>
    <div class="overflow-y-auto h-60">
      <div v-for="(item, index) in state.list" :key="item.id" class="book-item">
        <div class="flex items-center justify-evenly px-10 py-2">
          <div class="w-80 flex items-center">
            <img v-if="index == 0" src="@/assets/images/word2.png" class="w-6 h-8 mr-3" />
            <img v-else src="@/assets/images/word1.png" class="w-6 h-8 mr-3" />
            <div>{{ item.name }}</div>
          </div>
          <span class="cursor-pointer">
            <SvgIcon name="collect" color="grey" width="20" height="20" @click="handleCollect(item)" />
            <!-- <SvgIcon name="collect-active" width="21" height="21" @click="handleCollect(item)" /> -->
            <!-- <el-button size="small" @click="handleCollect(item)">收藏</el-button> -->
          </span>
        </div>
        <!-- <div class="bottom-border"></div> -->
      </div>
    </div>
    <div class="px-10 pt-2 flex items-center">
      <div class="book-add flex items-center justify-center mr-4">
        <el-icon><Plus /></el-icon>
      </div>
      <el-button type="text" @click="handleAdd" class="">新建单词本</el-button>
    </div>
    <div class="py-4"></div>
    <div class="flex justify-center text-sm">
      <el-checkbox @change="collectAuto" :model-value="!!userStore.getConfig.default_collection_book"
        >自动收藏至上次添加单词的单词本</el-checkbox
      >
    </div>
  </el-dialog>
</template>
<script setup lang="jsx">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { wordLabel, getGroupBooks } from '@/api/book/index';
  import { Plus } from '@element-plus/icons-vue';
  import { ElMessage, ElNotification } from 'element-plus';
  import { useUserStore } from '@/store';
  import { h } from 'vue';

  const state = reactive({
    list: [],
    dialogVisible: false,
    ids: [],
    isAdd: false,
    message: null,
  });

  const emits = defineEmits(['addBook']);
  const dialogWidth = ref('360px');
  const userStore = useUserStore();
  let flag = false; // 去修改打开的
  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '90%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '70%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '360px'; // 在大屏幕下设置Dialog宽度为50%
    }
  };
  windowSize();
  const handleClose = () => {
    state.dialogVisible = false;
  };

  const handleAdd = () => {
    state.dialogVisible = false;
    emits('addBook');
  };
  const collectAuto = (val) => {
    userStore.handleConfig('default_collection_book', Number(val));
    // if (val) {
    //   userStore.handleConfig('recent_collection_book_id', val);
    // }
  };
  const getBooks = async (s_id) => {
    const res = await getGroupBooks({ s_id: s_id })
        state.list = res;
  };
  const open = async (ids) => {
    await getBooks(3);
    state.message && state.message.close();
    state.ids = ids;
    if (userStore.getConfig.default_collection_book && !flag) {
      if (userStore.getConfig.recent_collection_book_id) {
        handleCollect(state.list.find((o) => o.id == userStore.getConfig.recent_collection_book_id));
        return;
      } else {
        ElMessage.warning('首次收藏，无法自动收藏至上次单词本，请先手动收藏');
      }
    }
    state.dialogVisible = true;
    flag = false;
  };
  const handleCollect = (item) => {
    wordLabel({
      type: 'collection',
      lexicon_ids: JSON.stringify(state.ids),
      book_id: item.id,
    })
      .then((res) => {
        state.message = ElMessage({
          icon: '',
          type: 'success',
          plain: true,
          customClass: 'msg-class',
          duration: 5000,
          message: () => (
            <div class="flex justify-between items-center" style="word-break:keep-all">
              <span>已收藏至&nbsp;{item.name}</span>&nbsp;&nbsp;
              <el-button
                size="small"
                plain
                text
                type="success"
                onClick={() => {
                  flag = true;
                  open();
                }}
              >
                去修改
              </el-button>
            </div>
          ),
        });
        handleClose();
      })
      .catch((err) => {});
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
    margin-left: 0rem;
    height: 2rem;
    width: 1.5rem;
    border: 1px solid #d3d3d3;
    padding: 10px 4px;
  }
  .msg-class {
    top: 90% !important;
  }
  .book-item {
    border-bottom: 1px solid #f5f5f5;
    &:hover {
      background-color: #f5f5f5;
    }
  }
</style>
