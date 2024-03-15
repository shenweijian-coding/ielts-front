// 权限问题后期增加
import { get, post } from '@/utils/http/axios';

const getBookList = async () => get({ url: '/book/getBookList' });

// const getWordList = async (data) => post({ url: '/book/getWordList', data });

const getSceneList = async (data) => post({ url: '/api/study/lexicon/v1/scene/list', data });

const getGroupBooks = async (data) => post({ url: '/api/study/lexicon/v1/group/list', data });

const getChapterList = async (data) => post({ url: '/api/study/lexicon/v1/group/list', data });

const getLanguageList = async (data) => post({ url: '/api/study/lexicon/v1/language/list', data });

const getWordList = async (data) => post({ url: '/api/study/lexicon/v1/list', data });

const reportLexiRes = async (data) => post({ url: '/api/study/lexicon/v1/list', data });

export { getBookList, getSceneList, getGroupBooks, getChapterList, getLanguageList, getWordList, reportLexiRes };
