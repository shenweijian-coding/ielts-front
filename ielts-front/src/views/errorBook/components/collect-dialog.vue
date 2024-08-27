<template>
  <el-dialog v-model="state.dialogVisible" title="将单词书收藏至" :width="({1:'90%',2: '70%',3: '360px'})[deviceSize]" :before-close="handleClose" center>
    <div class="overflow-y-auto max-h-60">
      <div v-for="(item, index) in state.list" :key="item.id" class="book-item">
        <div class="flex items-center justify-evenly px-10 py-2">
          <div class="w-80 flex items-center">
            <img v-if="index == 0" src="@/assets/images/word2.png" class="w-6 h-8 mr-3" />
            <img v-else src="@/assets/images/word1.png" class="w-6 h-8 mr-3" />
            <div>{{ item.name }}</div>
          </div>
          <span class="cursor-pointer">
            <SvgIcon name="collect" color="grey" width="20" height="20" @click="handleCollect(item)" />
          </span>
        </div>
      </div>
    </div>
    <div class="px-10 pt-2 flex items-center" @click="handleAdd">
      <div class="book-add flex items-center justify-center mr-4">
        <el-icon><Plus /></el-icon>
      </div>
      <el-button type="text" class="">新建词书</el-button>
    </div>
    <div class="py-4"></div>
    <div class="flex justify-center text-sm">
      <el-checkbox @change="collectAuto" :model-value="!!userStore.getConfig.default_collection_book"
        >自动收藏至上次添加单词的词书</el-checkbox
      >
    </div>
  </el-dialog>
</template>
<script setup lang="jsx">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { Plus } from '@element-plus/icons-vue';
  
  import { wordLabel, getGroupBooks } from '@/api/book/index';
  
  import { ElMessage, ElNotification } from 'element-plus';
  import { useUserStore } from '@/store';
  import { h } from 'vue';
  import { useDrawerWith } from '@/views/home/useLogic.js'

  const { deviceSize, countWidth } = useDrawerWith()

  const state = reactive({
    list: [],
    dialogVisible: false,
    ids: [],
    isAdd: false,
    message: null,
    lastBookId: 0, // 上一本书ID
  });

  const emits = defineEmits(['addBook', 'ok']);

  const userStore = useUserStore();
  let flag = false; // 去修改打开的

  const handleClose = () => {
    flag = false;
    state.dialogVisible = false;
  };

  const handleAdd = () => {
    state.dialogVisible = false;
    emits('addBook');
  };

  const collectAuto = (val) => {
    userStore.handleConfig('default_collection_book', Number(val));
  };

  const getBooks = async (s_id) => {
    const res = await getGroupBooks({ s_id: s_id });
    state.list = res;
  };

  const open = async (ids, lastBookId) => {
    await getBooks(2);
    state.message && state.message.close();
    state.ids = ids;
    state.lastBookId = lastBookId;
    if (userStore.getConfig.default_collection_book && !flag) {
      if (userStore.getConfig.recent_collection_book_id) {
        const bookInfo = state.list.find((o) => o.id == userStore.getConfig.recent_collection_book_id);
        if (bookInfo) {
          handleCollect(bookInfo);
          return;
        }
      } else {
        ElMessage.warning('首次收藏，无法自动收藏至上次单词本，请先手动收藏');
      }
    }
    state.dialogVisible = true;
  };

  const handleCollect = (item) => {
    // 通过去修改进来的
    if (flag) {
      handleCancelCollect();
    }
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
                  open(state.ids, item.id);
                }}
              >
                去修改
              </el-button>
            </div>
          ),
        });
        emits('ok', state.ids);
        userStore.info();
        handleClose();
      })
      .catch((err) => {
        handleClose();
      });
  };

  const handleCancelCollect = () => {
    wordLabel({
      type: 'update_collection',
      lexicon_ids: JSON.stringify(state.ids),
      book_id: state.lastBookId,
    }).then((res) => {});
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
