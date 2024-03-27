<template>
  <el-dialog v-model="state.dialogVisible" title="CET-4" :width="dialogWidth" :before-close="handleClose">
    <div class="text relative flex h-30 flex-col gap-2">
      <p class="mt-1">{{ state.book.chapter_total }} 章节</p><p>共 {{ state.book.word_total }} 词</p><p>{{ state.book.remarks }}</p>
      <div class="absolute bottom-6 right-2">
        <div role="group" dir="ltr" class="flex items-center justify-center gap-1" tabindex="0" style="outline: none">
          <el-button @click="handleErrorBook">查看错题</el-button>
        </div>
      </div>
    </div>
    <div class="flex pl-0">
      <div class="lg:h-[30rem] w-full">
        <div class="mt-2 focus:outline-none h-full">
          <div class="relative overflow-hidden lg:h-[30rem] overflow-y-auto">
            <div class="h-full w-full rounded-[inherit]">
              <div class="flex w-full flex-wrap gap-3 justify-between lg:justify-initial">
                <div
                  v-for="item in state.list"
                  :key="item.id"
                  @click="handleClickChapter(item)"
                  class="relative flex h-16 lg:w-40 w-[48%] cursor-pointer flex-col items-start justify-center overflow-hidden rounded-xl bg-slate-100 px-3 pt-3 dark:bg-slate-800"
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

  const appStore = useAppStore();

  const router = useRouter();

  const state = reactive({
    list: [],
    book: null,
    dialogVisible: false,
  });
  const dialogWidth = ref('40%');

  const windowSize = () => {
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度

    // 根据屏幕宽度计算Dialog的宽度
    if (screenWidth < 768) {
      dialogWidth.value = '90%'; // 在小屏幕下设置Dialog宽度为90%
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      dialogWidth.value = '70%'; // 在中等屏幕下设置Dialog宽度为70%
    } else {
      dialogWidth.value = '50%'; // 在大屏幕下设置Dialog宽度为50%
    }
  };
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
      last_id: item?.last_id,
    });
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
          // appStore.setChapterInfo({
          //   currentChapter: item,
          //   chapterList: state.list,
          //   booInfo: state.book,
          //   last_id: item.last_id,
          // });
          setChapterInfo(item);
          router.push('/home');
        })
        .catch((action) => {
          if (action == 'cancel') {
            // appStore.setChapterInfo({
            //   currentChapter: item,
            //   chapterList: state.list,
            //   booInfo: state.book,
            // });
            setChapterInfo(item);
            router.push('/home');
          }
        });
    } else {
      // appStore.setChapterInfo({
      //   currentChapter: item,
      //   chapterList: state.list,
      //   booInfo: state.book,
      // });
      setChapterInfo(item);

      router.push('/home');
    }
  };

  const handleErrorBook = () => {
    // setChapterInfo(state.list[0]);
    router.push('/errorBook');
  };
  onMounted(() => {
    window.addEventListener('resize', () => {
      windowSize();
    });
    windowSize();
  });
  defineExpose({
    open,
  });
</script>
