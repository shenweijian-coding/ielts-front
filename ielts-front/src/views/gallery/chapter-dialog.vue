<template>
  <el-dialog v-model="state.dialogVisible" title="CET-4" width="40%" :before-close="handleClose">
    <div class="text relative flex h-30 flex-col gap-2">
      <p class="mt-1">{{ state.book.chapter_total }} 章节</p><p>共 {{ state.book.word_total }} 词</p><p>{{ state.book.remarks }}</p>
      <div class="absolute bottom-6 right-4">
        <div role="group" dir="ltr" class="flex items-center justify-center gap-1" tabindex="0" style="outline: none">
          <a href="/#/errorBook">
            <el-button>查看错题</el-button>
          </a>
        </div>
      </div>
    </div>
    <div class="flex pl-0">
      <div class="h-[30rem] w-full">
        <div class="mt-2 focus:outline-none h-full">
          <div class="relative overflow-hidden h-[30rem]">
            <div class="h-full w-full rounded-[inherit]">
              <div class="flex w-full flex-wrap gap-3">
                <div
                  v-for="item in state.list"
                  :key="item.id"
                  @click="handleClickChapter(item)"
                  class="relative flex h-16 w-40 cursor-pointer flex-col items-start justify-center overflow-hidden rounded-xl bg-slate-100 px-3 pt-3 dark:bg-slate-800"
                >
                  <div class="flex justify-between w-full">
                    <h3>{{ item.name }}</h3
                    ><span>共{{ item.word_total }}词</span>
                  </div>
                  <p class="pt-[2px] text-xs text-slate-600">{{ item.accuracy ? `${item.accuracy.toFixed(2)}%` : '未练习' }}</p>
                  <SvgIcon
                    v-if="item.id == appStore.chapterId"
                    name="tick"
                    color="#ff5c00"
                    hoverColor="#ff5c00"
                    class="absolute -bottom-1 -right-1 text-8xl"
                    size="70"
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
  const handleClickChapter = (item) => {
    if (!item.word_total) {
      ElMessage.warning('当前章节下无词库');
      return;
    }
    if (item.is_incomplete) {
      ElMessageBox.confirm('上次有未听写完成的单词，要从中断的单词继续听写吗', '', {
        confirmButtonText: '继续听写',
        cancelButtonText: '重新开始',
        type: 'info',
        distinguishCancelAndClose: true,
      })
        .then(() => {
          appStore.setChapterInfo({
            currentChapter: item,
            chapterList: state.list,
            booInfo: state.book,
            last_id: item.last_id,
          });
          router.push('/home');
        })
        .catch((action) => {
          if (action == 'cancel') {
            appStore.setChapterInfo({
              currentChapter: item,
              chapterList: state.list,
              booInfo: state.book,
            });
            router.push('/home');
          }
        });
    } else {
      appStore.setChapterInfo({
        currentChapter: item,
        chapterList: state.list,
        booInfo: state.book,
      });
      router.push('/home');
    }
  };
  defineExpose({
    open,
  });
</script>
