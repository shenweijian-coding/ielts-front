<template>
  <el-dialog v-model="state.dialogVisible" :title="state.book?.name" :width="({1: '90%',2: '70%',3: '50%'})[deviceSize]" :before-close="handleClose">
    <div class="text relative flex h-10 flex-col gap-2">
      <p class="mt-1">{{ state.book.chapter_total }} 章节 &nbsp;&nbsp;{{ state.book.word_total }} 词</p>
      <div class="absolute bottom-6 right-2">
        <div role="group" dir="ltr" class="flex items-center justify-center gap-1" tabindex="0" style="outline: none">
          <!-- <el-button @click="handleErrorBook">查看错题</el-button> -->
          <el-button v-if="state.book.s_id == 2" @click="deleteBookClick" :icon="Delete" size="small">删除</el-button>
        </div>
      </div>
    </div>
    <div class="flex pl-0">
      <div class="lg:h-[30rem] w-full">
        <div class="mt-2 focus:outline-none h-full">
          <div class="relative overflow-hidden h-[30rem] overflow-y-auto">
            <div class="h-full w-full rounded-[inherit]">
              <div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                <div
                  v-for="item in state.list"
                  :key="item.id"
                  @click="handleClickChapter(item)"
                  class="relative flex h-16 lg:w-40 xl:w-30 w-40 w-[88%] cursor-pointer flex-col items-start justify-center overflow-hidden rounded-xl bg-slate-100 px-3 dark:bg-slate-800"
                >
                  <div class="flex justify-between w-full">
                    <h4 class="text-nowrap text-ellipsis truncate" :alt="item.name">{{ item.name }}</h4>
                  </div>
                  <div class="flex w-full text-xs items-center" :class="item.id == appStore.chapterId ? '' : 'justify-between'">
                    <span v-if="item?.accuracy">
                      {{ `${item.accuracy.toFixed(2)}%` }}
                    </span>
                    <span v-else class="text-slate-600">
                      {{ item.is_practiced ? (item.is_incomplete ? '未完成' : `${item.accuracy.toFixed(2)}%`) : '未练习' }} </span
                    >&nbsp;
                    <span class="text-nowrap">共{{ item.word_total }}词</span>
                  </div>
                  <SvgIcon
                    v-if="item.id == appStore.chapterId"
                    name="tick"
                    color="#ff5c00"
                    hoverColor="#ff5c00"
                    class="absolute -bottom-1 -right-1 text-8xl"
                    size="default"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
  import { reactive } from 'vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useAppStore } from '@/store';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { Delete } from '@element-plus/icons-vue';
  import { deleteBook } from '@/api/book/index';
  import { useDrawerWith } from '@/views/home/useLogic.js'

  const { deviceSize, countWidth } = useDrawerWith()

  const emits = defineEmits(['ok']);

  const appStore = useAppStore();

  const router = useRouter();

  const state = reactive({
    list: [],
    book: null,
    dialogVisible: false,
  });

  const open = (book, list) => {
    state.list = list;
    state.book = book;
    state.dialogVisible = true;
  };
  const handleClose = () => {
    state.dialogVisible = false;
  };

  const setChapterInfo = (item) => {
    appStore.setChapterInfo({
      currentChapter: item,
      chapterList: state.list,
      booInfo: state.book,
      // last_id: item?.last_id,
    });
  };

  const handleClickChapter = (item) => {
    setChapterInfo(item)
    router.push('/main/vocabularyBookDetail?id='+ item.id);
  };

  const handleErrorBook = () => {
    setChapterInfo('');
    router.push('/errorBook?from=gallery');
  };

  const deleteBookClick = () => {
    ElMessageBox.confirm('删除后无法恢复', `要删除 “${state.book?.name}” 吗?`, {
      confirmButtonText: '不删除',
      cancelButtonText: '删除',
      type: 'warning',
      distinguishCancelAndClose: true,
      closeOnClickModal: false
    })
      .then(() => {
      })
      .catch((action) => {
        if (action == 'cancel') {
          deleteBook({ g_id: state.book.id }).then((res) => {
            state.dialogVisible = false;
            ElMessage.success('删除成功');
            emits('ok');
          });
        }
      });
  };

  defineExpose({
    open,
  });
</script>
