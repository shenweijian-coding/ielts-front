// 权限问题后期增加
import { get, post } from '@/utils/http/axios';

const getBookList = async () => get({ url: '/book/getBookList' });

const getWordList = async (data) => post({ url: '/book/getWordList', data });

export { getBookList, getWordList };
