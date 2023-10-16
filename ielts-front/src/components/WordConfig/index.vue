<template>
  <div>
    <el-form :model="config" label-width="120px">
      <el-form-item label="单词书">
        <el-radio-group v-model="config.id" size="default" @change="bookChange">
          <el-radio-button v-for="book in bookInfo.books" :key="book.id" :label="book.id">{{ book.name }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前章节">
        <el-radio-group v-model="config.chapter" size="default" @change="chapterChange">
          <el-radio-button v-for="item in bookInfo.chapters" :key="item" :label="item">{{ item }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前章节单词数">
        <span>{{ config.num }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
  import { getBookList } from '@/api/book/index';

  const emits = defineEmits(['currentChapter']);

  const bookInfo = reactive({
    books: [],
    chapters: [],
  });

  const config = reactive({
    id: 1,
    chapter: '1-1',
    num: 1,
  });

  // 切换书籍
  const bookChange = (id) => {
    bookInfo.chapters = bookInfo.books.find((o) => o.id == id).chapters;
  };
  // 切换章节
  const chapterChange = (chapter) => {
    emits('currentChapter', { bookId: config.id, chapter: chapter });
  };
  // 获取书籍及对应章节信息
  getBookList().then((res) => {
    bookInfo.books = res;
    bookInfo.chapters = res[0].chapters;
    config.chapter = res?.[0]?.chapters?.[0] || '1-1';
    setTimeout(() => {
      emits('currentChapter', { bookId: config.id, chapter: config.chapter });
    });
  });
</script>
