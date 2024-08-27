<template>
  <header class="container z-20 mx-auto w-full lg:px-10 py-8 px-4">
    <div class="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0"
      ><a class="flex items-center text-2xl font-bold text-theme no-underline hover:no-underline lg:text-4xl" href="/#/main/book">
        <SvgIcon name="atx" class="hidden md:block" width="120" height="80" />
      </a>
      <nav
        class="my-card on element flex w-auto flex-col lg:flex-row content-center items-center justify-end space-x-3 rounded-xl bg-white lg:p-3 p-2 transition-colors duration-300 dark:bg-gray-800"
      >
        <div class="flex">
          <el-tooltip content="词典切换" placement="top" effect="light">
            <div class="relative">
              <div>
                <a
                  class="text-black block rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100"
                  href="/#/main"
                >
                  {{ appStore?.dictationInfo?.booInfo.remarks || '前往书籍页' }}
                </a>
              </div>
            </div>
          </el-tooltip>
          <el-tooltip content="章节切换" placement="top" effect="light">
            <div class="relative">
              <el-popover placement="bottom" :width="200" trigger="click">
                <template #reference>
                  <button
                    class="rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100"
                    id="headlessui-listbox-button-:rdb:"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    data-headlessui-state=""
                    >{{ errSource ? '错词练习' : appStore?.dictationInfo?.currentChapter?.name }}</button
                  >
                </template>
                <div class="h-50 overflow-y-auto">
                  <el-radio-group v-model="config.chapterId" size="default" @change="chapterChange">
                    <el-radio
                      v-for="chapter in chapterList"
                      :key="chapter.id"
                      :value="chapter.id"
                      :label="chapter.id"
                      border
                      class="w-full mb-2 mr-0"
                      >{{ chapter.name }}</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-popover>
            </div>
          </el-tooltip>
        </div>
        <div class="flex space-x-2 lg:space-x-1">
          <el-tooltip content="单词播放速度" placement="top" effect="light">
            <div class="relative" data-headlessui-state="">
              <el-popover placement="bottom" :width="100" trigger="click">
                <template #reference>
                  <button
                    class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                    type="button"
                    aria-expanded="false"
                  >
                    <div class="relative">
                      <div>x{{ config.play_speed }} 倍</div>
                    </div>
                  </button>
                </template>
                <div>
                  <el-radio-group v-model="config.play_speed" size="default" @change="(val) => handleConfigChange('play_speed', val)">
                    <el-radio
                      v-for="(speed, index) in config.speedList"
                      :key="index"
                      :value="speed"
                      :label="speed"
                      border
                      class="w-full mb-2 mr-0"
                      >{{ speed }} 倍</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-popover>
            </div>
          </el-tooltip>
          <el-tooltip content="单词重复次数" placement="top" effect="light">
            <div class="relative" data-headlessui-state="">
              <el-popover placement="bottom" :width="100" trigger="click">
                <template #reference>
                  <button
                    class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                    type="button"
                    aria-expanded="false"
                  >
                    <div class="relative">
                      <div>{{ config.repetitions }} 遍</div>
                    </div>
                  </button>
                </template>
                <div>
                  <el-radio-group v-model="config.repetitions" size="default" @change="(val) => handleConfigChange('repetitions', val)">
                    <el-radio
                      v-for="repeat in config.repeatList"
                      :key="repeat"
                      :value="repeat"
                      :label="repeat"
                      border
                      class="w-full mb-2 mr-0"
                      >{{ repeat }} 遍</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-popover>
            </div>
          </el-tooltip>
          <el-tooltip content="单词听写模式" placement="top" effect="light">
            <div class="relative" data-headlessui-state="">
              <button
                class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                type="button"
                aria-expanded="false"
                @click="handleMode"
              >
                <div class="relative">
                  <div :class="config.isSeries ? '' : 'line-through'">连听</div>
                </div>
              </button>
            </div>
          </el-tooltip>
          <el-tooltip v-if="+config.repetitions > 1 || config.isSeries" content="单词播放间隔" placement="top" effect="light">
            <div class="relative" data-headlessui-state="">
              <el-popover placement="bottom" :width="100" trigger="click">
                <template #reference>
                  <button
                    class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                    type="button"
                    aria-expanded="false"
                  >
                    <div class="relative">
                      <div>{{ config.play_interval }} 秒</div>
                    </div>
                  </button>
                </template>
                <div>
                  <el-radio-group v-model="config.play_interval" size="default" @change="(val) => handleConfigChange('play_interval', val)">
                    <el-radio v-for="gap in config.gapList" :key="gap" :value="+gap" border :label="+gap" class="w-full mb-2 mr-0"
                      >{{ gap }} 秒</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-popover>
            </div>
          </el-tooltip>

          <el-tooltip content="发音" placement="top" effect="light">
            <div class="relative" data-headlessui-state="">
              <el-popover placement="bottom" :width="100" trigger="click">
                <template #reference>
                  <button
                    class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                    type="button"
                    aria-expanded="false"
                  >
                    <div class="relative">
                      <div>{{ config.pronounceList.find((o) => o.id == config.phonetic_type).name }}</div>
                    </div>
                  </button>
                </template>
                <div>
                  <el-radio-group v-model="config.phonetic_type" size="default" @change="(val) => handleConfigChange('phonetic_type', val)">
                    <el-radio
                      v-for="pronounce in config.pronounceList"
                      :key="pronounce.id"
                      :value="pronounce.id"
                      :label="pronounce.id"
                      border
                      class="w-full mb-2 mr-0"
                      >{{ pronounce.name }}</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-popover>
            </div>
          </el-tooltip>

          <div class="flex items-center justify-center gap-2 space-x-2 lg:space-x-1">
            <el-tooltip content="当前播放词库" placement="top" effect="light" :visible="tooltipVisible">
              <div class="relative">
                <div>
                  <div class="relative"
                    ><button
                      class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out hover:text-white"
                      title="当前播放词库"
                      type="button"
                      @click="showWordsList"
                      @mouseenter="tooltipVisible = true"
                      @mouseleave="tooltipVisible = false"
                    >
                      <el-icon color="#2c3e50" :size="20">
                        <List />
                      </el-icon> </button
                  ></div>
                </div>
                <div
                  class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
                >
                  <span class="tooltip">当前播放词库</span>
                </div>
              </div>
            </el-tooltip>

            <el-tooltip content="设置" placement="top" effect="light">
              <div class="relative">
                <el-popover placement="bottom" :width="200" trigger="click">
                  <template #reference>
                    <button
                      class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out"
                      title="设置"
                      type="button"
                    >
                      <el-icon color="#2c3e50" :size="20">
                        <Tools />
                      </el-icon>
                    </button>
                  </template>
                  <div>
                    <div class="flex items-center justify-between">
                      <div>乱序播放</div>
                      <el-switch v-model="config.is_disorderly" @change="(val) => handleConfigChange('is_disorderly', val, true)" />
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <div>忽略大小写</div>
                      <el-switch v-model="config.ignore_case" />
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <div>拼写正确自动提交</div>
                      <el-switch
                        v-model="config.is_automatic_submit"
                        @change="(val) => handleConfigChange('is_automatic_submit', val, false)"
                      />
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <div>输入按键音效</div>
                      <el-switch v-model="config.error_sound" />
                    </div>
                  </div>
                </el-popover>
              </div>
            </el-tooltip>

            <el-tooltip content="返回主页" placement="top" effect="light">
              <div class="relative hidden sm:block">
                <a href="/#/main/book">
                  <button
                    class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out"
                    title="返回主页"
                    type="button"
                  >
                    <el-icon color="#2c3e50" :size="20">
                      <HomeFilled />
                    </el-icon>
                  </button>
                </a>
              </div>
            </el-tooltip>

            <el-tooltip v-if="false" content="错词本" placement="top" effect="light">
              <div class="relative">
                <div>
                  <a href="/#/errorBook?from=home">
                    <button
                      type="button"
                      class="flex items-center justify-center rounded p-[2px] text-lg outline-none transition-colors duration-300 ease-in-out"
                      title="查看错题本"
                    >
                      <el-icon>
                        <HomeFilled />
                      </el-icon>
                    </button>
                  </a>
                </div>
                <div
                  class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
                >
                  <span class="tooltip">错题本</span>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <div class="container mx-auto flex h-full flex-1 flex-col items-center justify-center pb-5">
    <div class="container relative mx-auto flex h-full flex-col items-center">
      <div class="container flex flex-grow items-center justify-center">
        <div class="container flex h-full w-full flex-col items-center justify-center">
          <div class="container flex h-24 w-full shrink-0 grow-0 justify-between px-12 pt-0">
            <el-tooltip content="快捷键 ctrl+j" placement="top" effect="light">
              <div class="relative" @click="handleMove(-1)">
                <div>
                  <div
                    v-if="nearWords.lastWord"
                    class="flex max-w-xs cursor-pointer select-none items-center text-gray-700 opacity-60 duration-200 ease-in-out hover:opacity-100 dark:text-gray-400"
                  >
                    <SvgIcon name="left" />
                    <div class="grow-1 flex w-full flex-col ml-2">
                      <p class="font-mono text-2xl font-normal tracking-normal mb-0">
                        <template v-if="nearWords.lastWord.isOk">
                          <span>{{ nearWords.lastWord.word }}</span>
                        </template>
                        <span
                          v-else
                          v-for="(item, index) in nearWords.lastWord.wordArr"
                          :key="index"
                          :class="{ 'text-red-600': nearWords.lastWord.inputWordArr[index] != item }"
                          >{{ item }}</span
                        >
                      </p>
                      <p class="line-clamp-2 max-w-full text-sm font-normal text-gray-600 dark:text-gray-500">{{
                        nearWords.lastWord.translate
                      }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-tooltip>

            <div class="relative" @click="handleMove(1)">
              <div>
                <div
                  v-if="nearWords.nextWord"
                  class="flex max-w-xs cursor-pointer select-none items-center text-gray-700 opacity-60 duration-200 ease-in-out hover:opacity-100 dark:text-gray-400"
                >
                  <div class="grow-1 flex w-full flex-col items-end text-right mr-2"> </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container flex flex-grow flex-col items-center justify-center">
            <div class="relative flex w-full justify-center">
              <div class="relative w-full" v-if="wordsData.words.length">
                <div lang="en" class="flex flex-col items-center justify-center pb-1 pt-4 w-full">
                  <div class="user-input text-center flex flex-col items-center w-full">
                    <input
                      :placeholder="!showPlaceholder ? '在此输入单词，点击Enter核对' : ''"
                      v-model="wordsData.currentWord.userInput"
                      :type="isMobile ? 'password' : 'text'"
                      ref="inputRef"
                      class="font-mono font-normal text-center"
                      autocomplete="off"
                      autocorrect="off"
                      spellcheck="false"
                      @keydown.enter="inputEnter"
                      @blur="stop"
                      @keydown="handleKeyDown"
                      @click="handleFocusClick"
                      @focus="handleFocus"
                    />
                    <div class="input-border w-4/5 lg:w-2/5"> </div>
                  </div>
                  <div class="text-2xl font-bold text-gray count-down-box">
                    <div v-if="countDown <= 2 && countDown > 0">
                      <span>{{ countDown }}</span
                      ><span class="text-m">s</span>
                    </div>
                  </div>
                </div>
                <div class="space-x-8 flex mt-10 duration-300 text-center justify-center transition-colors font-sans cursor-pointer">
                  <div>
                    <el-tooltip content="回退上一个单词，快捷键 ctrl+j" placement="top" effect="light">
                      <SvgIcon name="play-left" color="grey" @click="handleMove(-1)" />
                    </el-tooltip>
                  </div>
                  <div>
                    <el-tooltip content="暂停，快捷键ctrl+P" placement="top" effect="light">
                      <SvgIcon v-if="playStatus == 0 || playStatus == 2" @click="start" name="play-start" color="grey" />
                      <SvgIcon v-if="playStatus == 1" @click="stop" name="play-stop" color="grey" />
                    </el-tooltip>
                  </div>
                  <div>
                    <el-tooltip content="再读一遍，快捷键 ctrl+L" placement="top" effect="light">
                      <SvgIcon @click="playAgain" name="play-again" color="grey" />
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative w-1/4 pt-1 mb-10 mt-auto opacity-0">
            <div class="mb-4 flex h-2 overflow-hidden rounded-xl bg-indigo-100 text-xs transition-all duration-300 dark:bg-indigo-200">
              <div
                class="flex flex-col justify-center whitespace-nowrap rounded-xl text-center text-white shadow-none transition-all duration-300 bg-indigo-200 dark:bg-indigo-300"
                style="width: 0%"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="my-card flex lg:w-3/5 w-90 rounded-xl bg-white p-4 py-10 opacity-50 transition-colors duration-300 dark:bg-gray-800"
        v-if="wordsData.words.length"
      >
        <el-progress :percentage="(wordsData.currentIndex * 100) / (wordsData.words.length || 1)" class="w-full" :stroke-width="16">
          <span>{{ wordsData.currentIndex }}/{{ wordsData.words.length }}</span>
        </el-progress>
      </div>
    </div>
  </div>
  <mistakeDialog ref="mistakeRef" @next="handleNextChapter" />
  <Loading :loading="loading" />
  <WordsDrawer ref="wordslistRef" @download="downloadTemp" />
  <audio ref="audioPlayer" controls style="display: none"></audio>
  <canvas ref="canvasRef"></canvas>
  <downTemplate ref="downTemplateRef" />
</template>

<script setup>
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { List, HomeFilled, Tools } from '@element-plus/icons-vue';
  import { useRouter, useRoute } from 'vue-router';

  import { useAppStore, useUserStore } from '@/store';
  import { getWordList, reportLexiRes, getChapterList } from '@/api/book/index';

  import beep from '@/assets/beep.wav';
  import correct from '@/assets/correct.wav';
  import defaultAudio from '@/assets/Default.wav';

  import useLoading from '@/hooks/loading.ts';
  import mistakeDialog from './mistakeDialog.vue';

  import { shuffleArray, deepClone } from '@/utils/index';
  import confetti from 'canvas-confetti';
  import WordsDrawer from './wordsDrawer.vue';
  import downTemplate from './down-template.vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import Loading from '@/components/loading/index.vue';

  const appStore = useAppStore();
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const { loading, setLoading } = useLoading();

  const config = reactive({
    chapterId: appStore.chapterId,
    play_speed: userStore.getConfig.play_speed + '' || '1.0',
    play_interval: userStore.getConfig.play_interval || '5',
    repetitions: userStore.getConfig.repetitions + '' || '1',
    phonetic_type: userStore.getConfig.phonetic_type || 2,
    error_sound: userStore.getConfig.error_sound || false,
    ignore_case: userStore.getConfig.ignore_case || true,
    is_disorderly: userStore.getConfig.is_disorderly || false,
    is_automatic_submit: userStore.getConfig.is_automatic_submit || false,
    isSeries: false,
    speedList: ['0.8', '1.0', '1.2', '1.4', '1.6'],
    gapList: ['1', '2', '3', '4', '5', '6', '7'],
    repeatList: ['1', '2', '3', '无限'],
    pronounceList: [
      { name: '美音', id: 2 },
      { name: '英音', id: 1 },
    ],
  });

  const wordsData = reactive({
    words: [],
    wordsCopy: [],
    currentWord: { translate: '', word: '', phonetic_transcription: '', userInput: '' },
    currentIndex: 0,
    lastIndex: 0, // 上一个单词的ID
  });

  const errSource = ref(false); // 默认空，听写错词为true
  const isMobile = ref(window.innerWidth <= 768);
  const playStatus = ref(0); // 0-未开始 1-播放中 2-已暂停
  const inputRef = ref(null); // 输入框聚焦
  const beepRef = ref(new Audio(beep));
  const correctRef = ref(new Audio(correct));
  const defaultAudioRef = ref(new Audio(defaultAudio));
  const mistakeRef = ref(null);
  const wordslistRef = ref(null);
  const countDown = ref(0); // 倒计时
  const audioPlayer = ref(null);
  const canvasRef = ref(null);
  const tooltipVisible = ref(false);
  const downTemplateRef = ref(null);

  let myConfetti = null;
  let currentTestKey = Date.now();
  let audio = audioPlayer.value;
  let count = 0;
  let canSubmit = true;
  let timer = null;
  let countdownInterval = null;

  const nearWords = computed(() => {
    let lastWord = '';
    let nextWord = '';
    let index = wordsData.currentIndex;
    if (wordsData.currentIndex > 0) {
      let lastIndex = getNoProficientWordIndex(-1);
      if (lastIndex < 0) {
        // 没有找到上一个
      } else {
        lastWord = wordsData.words[lastIndex];

        lastWord.wordArr = config.ignore_case ? lastWord.word.toLowerCase().split('') : lastWord.word.split('');
        if (lastWord.userInput) {
          lastWord.inputWordArr = config.ignore_case ? lastWord.userInput.toLowerCase().split('') : lastWord.userInput.split('');
        } else {
          lastWord.inputWordArr = new Array(lastWord.word.length);
        }
      }
    }
    if (index < wordsData.words.length) {
      nextWord = wordsData.words[index + 1];
    }
    return {
      lastWord,
      nextWord,
    };
  });

  // 判断单词是否输入正确
  const checkWordsIsOk = () => {
    let { word, userInput = '', other_word = '' } = wordsData.currentWord;
    if (config.ignore_case) {
      // 忽略大小写
      word = word.toLowerCase();
      other_word = other_word?.toLowerCase();
      userInput = userInput ? userInput.toLowerCase() : '';
    }
    return word === userInput || (other_word && other_word == userInput);
  };

  const chapterList = computed(() => {
    return appStore?.dictationInfo?.chapterList || [];
  });

  const showPlaceholder = ref(window.localStorage.getItem('oldUser'));

  const getWords = () => {
    if (errSource.value) {
      const copyWords = JSON.parse(JSON.stringify(appStore.errWords));
      if (config.is_disorderly) {
        wordsData.words = shuffleArray(copyWords);
      } else {
        wordsData.words = copyWords;
      }
      wordsData.currentWord = copyWords[wordsData.currentIndex];
      initWordsList();
    } else {
      setLoading(true);
      getWordList({
        c_id: appStore.dictationInfo.currentChapter.id,
        pagesize: 9999,
        s_id: appStore?.dictationInfo?.isClass ? 5 : null,
      })
        .then((res) => {
          if (res.data.length) {
            // 是否开启乱序
            if (config.is_disorderly) {
              // 筛选出没有听写的单词
              const noRead = res.data.filter((o) => !res.existing_id.includes(o.id));
              const beanRead = res.data.filter((o) => res.existing_id.includes(o.id));
              if (noRead.length) {
                wordsData.words = [...beanRead, ...shuffleArray(noRead)];
              } else {
                wordsData.words = shuffleArray(beanRead);
              }
            } else {
              wordsData.words = res.data;
            }
            if (appStore.isContinuePlay) {
              if (res?.existing_id?.length) {
                wordsData.currentIndex = res?.existing_id.length || 0;
                wordsData.currentWord = wordsData.words[wordsData.currentIndex];
              } else {
                wordsData.currentWord = wordsData.words[wordsData.currentIndex > -1 ? wordsData.currentIndex : 0];
              }
              if (res.last_key) {
                currentTestKey = res.last_key;
              }
            } else {
              // 是否继续上次播放
              if (res?.existing_id?.length && !errSource.value) {
                ElMessageBox.confirm('上次有未听写完成的单词，要从中断的单词继续听写吗', '', {
                  confirmButtonText: '继续听写',
                  cancelButtonText: '重新开始',
                  type: 'info',
                  distinguishCancelAndClose: true,
                })
                  .then(() => {
                    if (res?.existing_id?.length) {
                      // 过滤一遍 防止有遗漏
                      if (res?.existing_id?.length != res.data.length) {
                        const noRead = res.data.filter((o) => !res.existing_id.includes(o.id));
                        const beanRead = res.data.filter((o) => res.existing_id.includes(o.id));
                        wordsData.words = [...beanRead, ...noRead];
                      }

                      wordsData.currentIndex = res?.existing_id.length || 0;
                      wordsData.currentWord = wordsData.words[wordsData.currentIndex];
                      initWordsList();
                    }
                    if (res.last_key) {
                      currentTestKey = res.last_key;
                    }
                  })
                  .catch((action) => {
                    if (action == 'cancel') {
                      wordsData.currentWord = wordsData.words[wordsData.currentIndex > -1 ? wordsData.currentIndex : 0];
                      initWordsList();
                    }
                  });
              } else {
                wordsData.currentWord = wordsData.words[wordsData.currentIndex > -1 ? wordsData.currentIndex : 0];
              }
            }

            initWordsList();
          } else {
            ElMessage.error('当前章节未配置词库');
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    canSubmit = true;
  };

  const initWordsList = () => {
    wordsData.wordsCopy = deepClone(wordsData.words);
    // 判断当前的单词有没有标熟 没有标熟可以听写 标熟的话 查找下一个
    if (wordsData.currentWord.is_proficient) {
      handleMove(1, false);
    }
  };

  // 重新播放
  const playAgain = () => {
    audio.src = config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y'];
    audio.playbackRate = +config.play_speed;
    audio.play();
  };

  // clear 播放
  const clearAudioCache = () => {
    clearTimeout(timer);
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countDown.value = 0;
    }
    if (audio) {
      audio?.src && (audio.src = '');
      audio.pause();
    }
  };

  const getNoProficientWordIndex = (type) => {
    let nextIndex = wordsData.currentIndex;
    nextIndex = nextIndex + type; // 如果当前单词标熟，继续查找下一个
    while (nextIndex < wordsData.words.length && nextIndex >= 0) {
      // 如果当前单词未标熟，返回当前索引
      if (!wordsData.words[nextIndex]?.is_proficient) {
        console.log(`找到未标熟的单词：${wordsData.words[nextIndex].word}`);
        break; // 跳出循环
      }
      nextIndex = nextIndex + type; // 如果当前单词标熟，继续查找下一个
    }
    return nextIndex;
  };

  const handleMove = (type, isPlay = true) => {
    playStatus.value = 1;
    const sign = wordsData.currentIndex + type;

    if (sign < wordsData.words.length && sign >= 0) {
      if (wordsData.currentIndex < wordsData.words.length) {
        wordsData.lastIndex = wordsData.currentIndex;
      }
      wordsData.currentIndex = getNoProficientWordIndex(type);
      if (wordsData.currentIndex < wordsData.words.length) {
        wordsData.currentWord = wordsData.words[wordsData.currentIndex];
      } else {
        handleResult();
      }
    }
    clearAudioCache();
    if (isPlay) {
      playWords();
    }
  };

  // 开始听写
  const start = () => {
    playStatus.value = 1;
    inputRef.value.focus();
    clearAudioCache();
    playWords();
  };

  // 暂停
  const stop = () => {
    count = 0;
    playStatus.value = 2;
    inputRef.value && inputRef.value.blur();
    countDown.value = 0;
    clearInterval(countdownInterval);
    if (audio) {
      audio?.src && (audio.src = '');
      audio.pause();
    }
    clearAudioCache();
  };

  // 切换暂停和播放
  const toggleStopAndStart = () => {
    if (playStatus.value == 1) {
      stop();
    } else {
      start();
    }
  };

  // 上报听写配置
  const handleReport = (data) => {
    if (!showPlaceholder.value) {
      showPlaceholder.value = true;
      window.localStorage.setItem('oldUser', true);
    }
    reportLexiRes({
      s_id: appStore?.dictationInfo?.isClass ? 5 : null,
      key: currentTestKey,
      ...data,
    })
      .then(() => {
        canSubmit = true;
      })
      .catch(() => {
        canSubmit = true;
      });
  };

  function fire(particleRatio, opts) {
    var count = 200;
    var defaults = {
      origin: { y: 0.7 },
    };
    myConfetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // 弹出效果
  const handleEffectiveness = () => {
    canvasRef.value.style.display = 'block';
    fire(0.25, {
      spread: 60,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 180,
    });
    fire(0.35, {
      spread: 180,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 180,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 180,
      startVelocity: 45,
    });
    setTimeout(() => {
      canvasRef.value.style.display = 'none';
    }, 4000);
  };

  // 处理计算结果
  const handleResult = () => {
    let accuracy = 0;
    let correctness = 0;
    wordsData.currentIndex = wordsData.words.length;
    // 过略标熟的
    const wordsRes = wordsData.words.filter((word) => !word.is_proficient) || [];
    if (wordsRes.length) {
      correctness = (wordsRes.filter((word) => word.isOk).length / wordsRes.length) * 100;
    }
    if (appStore?.dictationInfo?.currentChapter?.id && appStore?.dictationInfo?.currentChapter?.g_id) {
      getChapterList({
        id: appStore.dictationInfo.currentChapter.id,
        g_id: appStore.dictationInfo.currentChapter.g_id,
      }).then((res) => {
        accuracy = (+res?.[0].accuracy || correctness).toFixed(2);
        if (accuracy > 0) {
          handleEffectiveness();
        }
        mistakeRef.value.open(accuracy);
      });
    } else {
      accuracy = correctness.toFixed(2);
      if (accuracy > 0) {
        handleEffectiveness();
      }
      mistakeRef.value.open(accuracy);
    }
  };

  // 回车 播放下一个的方法
  const inputEnter = () => {
    console.log(canSubmit, 'canSubmit1');
    if (!canSubmit) {
      return;
    }
    console.log(canSubmit, 'canSubmit2');
    canSubmit = false;
    count = 0;
    clearAudioCache();
    if (!wordsData.words.length || playStatus.value != 1) {
      return;
    }
    let { userInput = '', id } = wordsData.currentWord;
    if (checkWordsIsOk()) {
      inputRef.value.style.color = 'green';
      inputRef.value.style.borderColor = 'green';
      correctRef.value.play();
      wordsData.currentWord.isOk = true;
      handleReport({ type: 'success', lexicon_id: id });
    } else {
      inputRef.value.style.color = 'red';
      inputRef.value.style.borderColor = 'red';
      beepRef.value.play();
      wordsData.currentWord.isOk = false;
      handleReport({ type: 'fail', error_word: userInput, lexicon_id: id });
    }
    setTimeout(() => {
      inputRef.value.style.color = '';
      inputRef.value.style.borderColor = '';
      // 判断是不是最后一个单词
      if (wordsData.words.length <= wordsData.currentIndex + 1) {
        handleResult();
      } else {
        handleMove(1);
      }
    }, 200);
  };

  watch(
    () => wordsData.currentWord?.userInput,
    (newValue, oldValue) => {
      if (config.is_automatic_submit && checkWordsIsOk() && oldValue && newValue) {
        inputEnter();
      }
    },
  );

  // 聚焦
  const handleFocusClick = () => {
    start();
  };

  const handleFocus = () => {
    if (isMobile.value) {
      setTimeout(() => {
        inputRef.value.type = 'text';
      }, 200);
    }
  };

  // 听写模式
  const handleMode = () => {
    config.isSeries = !config.isSeries;
  };

  const handleKeyDown = (event) => {
    if (config.error_sound) {
      const key = event.key.toLowerCase();
      if (/^[a-z]$/.test(key)) {
        defaultAudioRef.value.play();
      }
    }
  };

  function audioOver() {
    if (count < +config.repetitions || config.repetitions == '无限') {
      count++;
      // 这里是播放
      audio.src = config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y'];

      timer = setTimeout(() => {
        audio.play();
      }, config.play_interval * 1000);
    } else {
      count = 0;

      // 所有单词都已播放完毕，停止播放
      if (playStatus.value == 1 && config.isSeries) {
        countDown.value = config.play_interval;
        console.log(countDown.value, 'countDown.value1');
        countdownInterval = setInterval(() => {
          console.log(countDown.value, 'countDown.value2');
          countDown.value--;
          if (countDown.value <= 0) {
            clearInterval(countdownInterval);
            // 播放下一个单词的逻辑
            inputEnter();
          }
        }, 1000);
      }
    }
  }

  // 播放单词的方法
  const playWords = () => {
    audio.src = config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y'];
    audio.playbackRate = +config.play_speed;
    // console.log(Math.random());
    audio.play();
    count++;

    audio.removeEventListener('ended', audioOver);
    audio.addEventListener('ended', audioOver);
  };

  //播放时的组合按键触发;
  const handleAllKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'j') {
      event.preventDefault();
      handleMove(-1);
    } else if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      playAgain();
    } else if (event.ctrlKey && event.key === 'p') {
      event.preventDefault();
      toggleStopAndStart();
    }
  };

  onMounted(() => {
    audio = new Audio();
    errSource.value = !!route.query?.source;
    document.addEventListener('keydown', handleAllKeyDown);
    if (!appStore?.dictationInfo?.currentChapter && !appStore?.errWords?.length) {
      router.push('/main');
      return;
    }
    getWords();

    myConfetti = confetti.create(canvasRef.value, {
      resize: true,
      useWorker: true,
    });
  });

  // 章节切换
  const chapterChange = async (id) => {
    config.chapterId = id;
    await appStore.toggleCurrentChapter(chapterList.value.find((chapter) => chapter.id == id));
    if (errSource.value) {
      errSource.value = '';
      router.push('/home');
    }
    setTimeout(() => {
      currentTestKey = Date.now();
      getWords();
      wordsData.currentWord = { translate: '', word: '', phonetic_transcription: '', userInput: '' };
      wordsData.words = [];
      wordsData.currentIndex = 0;
    });
  };

  // 听写下一章
  const handleNextChapter = () => {
    const chapterNum = chapterList.value.length;
    const nextChapterIndex = chapterList.value.findIndex((o) => o.id == config.chapterId) + 1;
    if (chapterNum > nextChapterIndex) {
      chapterChange(chapterList.value[nextChapterIndex].id);
    } else {
      ElMessage.error('已经是最后一章啦');
    }
  };

  // 切换配置
  const handleConfigChange = (p, val, isResetWord = false) => {
    userStore.handleConfig(p, val);
    if (val && isResetWord) {
      appStore.updateContinuePlayStatus(true);
      getWords();
    }
  };

  const downloadTemp = () => {
    downTemplateRef.value.open();
  };
  onUnmounted(() => {
    if (audio) {
      audio.pause(); // 先暂停播放
      audio.src = ''; // 清空src
      audio.remove(); // 移除音频对象

      // 或者将音频对象赋值为null
      audio = null;
    }
  });

  // 展示当前播放词库列表
  const showWordsList = () => {
    wordslistRef.value.open(wordsData.wordsCopy, wordsData.words, wordsData.currentWord, 'home');
  };
</script>

<style scoped lang="less">
  @import './base.less';

  .user-input {
    .input-border {
      height: 2px;
      background-color: #000;
      // border-bottom: 2px solid ;
    }

    input {
      font-size: 3rem;
      // border-bottom: 2px solid ;
      padding: 10px 0;
      width: 100%;
    }

    input::placeholder {
      color: #999;
      /* 灰色 */
      font-size: 20px;
    }

    input:focus::placeholder {
      color: transparent;
      /* 使placeholder在聚焦时消失 */
    }

    .error {
      border-bottom: 2px solid red;
    }

    .success {
      border-bottom: 2px solid green;
    }
  }

  .count-down-box {
    position: absolute;
    right: 3rem;
    bottom: 0px;
    height: 32px;
    line-height: 32px;
    opacity: 0.4;
  }

  canvas {
    width: 80%;
    height: 100%;
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: -10%;
    z-index: 999;
    display: none;
  }
</style>
