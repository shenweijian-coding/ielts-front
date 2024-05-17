// 权限问题后期增加
import { get, post } from '@/utils/http/axios';

const getBookList = async () => get({ url: '/book/getBookList' });

// const getWordList = async (data) => post({ url: '/book/getWordList', data });

const getSceneList = async (data) => post({ url: '/api/study/lexicon/v1/scene/list', data });

const getGroupBooks = async (data) => post({ url: '/api/study/lexicon/v1/group/list', data });

const getChapterList = async (data) => post({ url: '/api/study/lexicon/v1/chapter/list', data });

const getLanguageList = async (data) => post({ url: '/api/study/lexicon/v1/language/list', data });

const getWordList = async (data) => post({ url: '/api/study/lexicon/v1/list', data });

const reportLexiRes = async (data) => post({ url: '/api/study/lexicon/v1/practice/result', data });

const getErrorWordList = async (data) => post({ url: '/api/study/lexicon/v1/error/list', data });

const uploadBook = async (data) => post({ url: '/api/study/lexicon/v1/upload/book', data });

const getAnalysisData = async (data) => post({ url: '/api/study/lexicon/v1/data/analysis', data });
export {
  getBookList,
  getSceneList,
  getGroupBooks,
  getChapterList,
  getLanguageList,
  getWordList,
  reportLexiRes,
  getErrorWordList,
  uploadBook,
  getAnalysisData,
};
