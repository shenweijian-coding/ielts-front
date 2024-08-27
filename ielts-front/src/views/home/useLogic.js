import { wordLabel } from '@/api/book/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue'

function useDictate() {
  function method() {}
  return method
}

// 收藏
function useCollect() {
  let collectRef = ref(null)
  let addBookRef = ref(null)

  // 收藏
  function handleWordCollect(ids) {
    collectRef.value.open(ids)
  }

  // 取消收藏
  function handleWordCancelCollect({ids, callback}) {
    wordLabel({
      type: 'update_collection',
      lexicon_ids: JSON.stringify(ids),
    })
      .then(() => {
        callback(ids, false);
        ElMessage.success('取消收藏成功');
      })
      .catch((err) => {});
  }

  // 打开新建书籍
  function addBook() {
    setTimeout(() => {
      addBookRef.value.open();
    }, 200);
  }

  return {
    collectRef,
    handleWordCancelCollect,
    handleWordCollect,
    addBookRef,
    addBook
  }
}

// 抽屉的宽度
function useDrawerWith() {
  let deviceSize = ref(1)

  function countWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      deviceSize.value = 1;
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      deviceSize.value = 2;
    } else {
      deviceSize.value = 3;
    }
  }
  countWidth()
  window.addEventListener('resize', () => {
    countWidth();
  });
  return {deviceSize, countWidth}
}

// 标熟

export { useDictate, useCollect, useDrawerWith };
