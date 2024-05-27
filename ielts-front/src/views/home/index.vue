<template>
  <header class="container z-20 mx-auto w-full lg:px-10 py-8 px-4">
    <div class="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0"
      ><a class="flex items-center text-2xl font-bold text-theme no-underline hover:no-underline lg:text-4xl" href="/#/main/book">
        <SvgIcon name="atx" class="hidden md:block" width="200" height="80" />
      </a>
      <nav
        class="my-card on element flex w-auto flex-col lg:flex-row content-center items-center justify-end space-x-3 rounded-xl bg-white lg:p-4 p-2 transition-colors duration-300 dark:bg-gray-800"
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
          <el-tooltip content="单词播放间隔" placement="top" effect="light">
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
            <el-tooltip content="当前播放词库" placement="top" effect="light">
              <div class="relative">
                <div>
                  <div class="relative"
                    ><button
                      class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out hover:text-white"
                      title="当前播放词库"
                      type="button"
                      @click="showWordsList"
                    >
                      <el-icon color="#2c3e50" :size="20"><List /></el-icon> </button
                  ></div>
                </div>
                <div
                  class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
                >
                  <span class="tooltip">当前播放词库</span></div
                >
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
                      <SvgIcon name="setting" prefix="icon-svg" width="24" height="24" />
                    </button>
                  </template>
                  <div>
                    <div class="flex items-center justify-between">
                      <div>乱序播放</div>
                      <el-switch v-model="config.is_disorderly" @change="(val) => handleConfigChange('is_disorderly', val)" />
                    </div>
                    <!-- <span class="text-sm">开启后，单词播放顺序将会被打乱，下一章节/重新进入本章节 开始生效</span> -->
                    <div class="flex items-center justify-between mt-2">
                      <div>忽略大小写</div>
                      <el-switch v-model="config.ignore_case" />
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <div>输入按键音效</div>
                      <el-switch v-model="config.error_sound" />
                    </div>
                  </div>
                </el-popover>
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
                      <!-- <el-icon color="#2c3e50" :size="20"><List /></el-icon> -->
                      <SvgIcon name="error-list" prefix="icon-svg" width="18" height="18" color="#2c3e50" />
                    </button>
                  </a>
                </div>
                <div
                  class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
                >
                  <span class="tooltip">错题本</span></div
                >
              </div>
            </el-tooltip>

            <!-- <div class="relative">
              <div>
                <el-popover placement="bottom" :width="50" trigger="hover" popper-class="popperClass">
                  <template #reference>
                    <button
                      type="button"
                      class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out"
                    >
                      <el-icon color="#2c3e50" :size="19"><UserFilled /></el-icon>
                    </button>
                  </template>
                  <div class="full-w text-center">
                    <el-button type="text" @click="handleLogout">退出登录</el-button>
                  </div>
                </el-popover>
              </div>
            </div> -->
          </div>
        </div>
      </nav>
    </div>
  </header>

  <div class="container mx-auto flex h-full flex-1 flex-col items-center justify-center pb-5">
    <div class="container relative mx-auto flex h-full flex-col items-center">
      <div class="container flex flex-grow items-center justify-center">
        <div class="container flex h-full w-full flex-col items-center justify-center">
          <div class="container flex h-24 w-full shrink-0 grow-0 justify-between px-12 pt-10">
            <el-tooltip content="快捷键 ctrl+j" placement="top" effect="light">
              <div class="relative" @click="handleMove(-1)"
                ><div
                  ><div
                    v-if="nearWords.lastWord"
                    class="flex max-w-xs cursor-pointer select-none items-center text-gray-700 opacity-60 duration-200 ease-in-out hover:opacity-100 dark:text-gray-400"
                  >
                    <SvgIcon name="left" />
                    <div class="grow-1 flex w-full flex-col ml-2"
                      ><p class="font-mono text-2xl font-normal tracking-normal mb-0">
                        <span
                          v-for="(item, index) in nearWords.lastWord.wordArr"
                          :key="index"
                          :class="{ 'text-red-600': nearWords.lastWord.inputWordArr[index] != item }"
                          >{{ item }}</span
                        > </p
                      ><p class="line-clamp-1 max-w-full text-sm font-normal text-gray-600 dark:text-gray-500">{{
                        nearWords.lastWord.translate
                      }}</p></div
                    ></div
                  ></div
                ></div
              >
            </el-tooltip>

            <div class="relative" @click="handleMove(1)"
              ><div>
                <div
                  v-if="nearWords.nextWord"
                  class="flex max-w-xs cursor-pointer select-none items-center text-gray-700 opacity-60 duration-200 ease-in-out hover:opacity-100 dark:text-gray-400"
                  ><div class="grow-1 flex w-full flex-col items-end text-right mr-2">
                    <!-- <p class="font-mono text-2xl font-normal text-gray-700 dark:text-gray-400 tracking-normal mb-0"> **** </p
                    ><p class="line-clamp-1 max-w-full text-sm font-normal text-gray-600 dark:text-gray-500">{{
                      nearWords.nextWord.translate
                    }}</p> -->
                  </div>
                  <!-- <SvgIcon name="right" />  -->
                </div></div
              ></div
            ></div
          >
          <div class="container flex flex-grow flex-col items-center justify-center">
            <div class="relative flex w-full justify-center">
              <!-- <div class="absolute flex h-full w-full justify-center">
                  <div class="z-10 flex w-full items-center backdrop-blur-sm">
                    <p class="w-full select-none text-center text-xl text-gray-600 dark:text-gray-50">按任意键开始</p>
                  </div>
                </div> -->

              <div class="relative" v-if="wordsData.words.length">
                <div lang="en" class="flex flex-col items-center justify-center pb-1 pt-4">
                  <!-- <div
                      class="tooltip-info relative w-fit bg-transparent p-0 leading-normal shadow-none dark:bg-transparent"
                      data-tip="按 Tab 快捷键显示完整单词"
                    >
                      <div class="flex items-center false justify-center">
                        <span
                          v-for="word in wordsData.currentWord.word"
                          :key="word + Math.random()"
                          class="m-0 p-0 font-mono font-normal text-gray-600 dark:text-gray-50 pr-0.8 duration-0 dark:text-opacity-80"
                          style="font-size: 48px"
                          >{{ word }}</span
                        >
                      </div>
                    </div> -->
                  <div class="user-input text-center">
                    <input
                      v-model="wordsData.currentWord.userInput"
                      type="text"
                      ref="inputRef"
                      class="font-mono font-normal text-center"
                      @keydown.enter="inputEnter"
                      @blur="handleBlur"
                      @keydown="handleKeyDown"
                      @click="handleFocus"
                    />
                  </div>
                  <div class="text-2xl font-bold text-gray count-down-box">
                    <div v-if="countDown <= 2 && countDown > 0">
                      <span>{{ countDown }}</span
                      ><span class="text-m">s</span>
                    </div>
                  </div>
                </div>
                <!-- <div
                    class="space-x-5 text-center text-sm font-normal text-gray-600 transition-colors duration-300 dark:text-gray-400 false"
                  >
                    <span>{{ wordsData.currentWord.phonetic_transcription }}</span></div
                  >
                  <div class="flex items-center justify-center pb-4 pt-5">
                    <span
                      class="max-w-4xl text-center font-sans transition-colors duration-300 dark:text-white dark:text-opacity-80 false false"
                      style="font-size: 18px"
                      >{{ wordsData.currentWord.translate }}</span
                    >
                  </div> -->
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
        <el-progress :percentage="((wordsData.currentIndex + 1) * 100) / (wordsData.words.length || 1)" class="w-full" :stroke-width="16">
          <span>{{ wordsData.currentIndex + 1 }}/{{ wordsData.words.length }}</span>
        </el-progress>
      </div>
    </div>
  </div>
  <mistakeDialog ref="mistakeRef" @next="handleNextChapter" />
  <Loading :loading="loading" />
  <WordsDrawer ref="wordslistRef" />
  <audio ref="audioPlayer" controls style="display: none"></audio>
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import beep from '@/assets/beep.wav';
  import correct from '@/assets/correct.wav';
  import defaultAudio from '@/assets/Default.wav';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { UserFilled, List } from '@element-plus/icons-vue';
  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';
  import mistakeDialog from './mistakeDialog.vue';
  import { useAppStore, useUserStore } from '@/store';
  import { getWordList, reportLexiRes, getChapterList } from '@/api/book/index';
  import { useRouter, useRoute } from 'vue-router';
  import WordsDrawer from './wordsDrawer.vue';
  import { shuffleArray } from '@/utils/index';

  const appStore = useAppStore();
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const { loading, setLoading } = useLoading();

  // 有道的翻译api
  // const YDAPI = 'https://dict.youdao.com/dictvoice?audio=';
  const errSource = ref(false); // 默认空，错词表来的  err
  const config = reactive({
    chapterId: appStore.chapterId,
    play_speed: userStore.getConfig.play_speed + '' || '1.0',
    play_interval: userStore.getConfig.play_interval || '5',
    repetitions: userStore.getConfig.repetitions + '' || '1',
    phonetic_type: userStore.getConfig.phonetic_type || 2,
    error_sound: userStore.getConfig.error_sound || false,
    ignore_case: userStore.getConfig.ignore_case || true,
    is_disorderly: userStore.getConfig.is_disorderly || false,
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
    currentWord: { translate: '', word: '', phonetic_transcription: '' },
    currentIndex: 0,
  });

  const playStatus = ref(0); // 0-未开始 1-播放中 2-已暂停
  const inputRef = ref(null); // 输入框聚焦
  const beepRef = ref(new Audio(beep));
  const correctRef = ref(new Audio(correct));
  const defaultAudioRef = ref(new Audio(defaultAudio));
  const mistakeRef = ref(null);
  const wordslistRef = ref(null);
  let currentTestKey = Date.now();
  const countDown = ref(0); // 倒计时
  const audioPlayer = ref(null);
  let audio = audioPlayer.value;
  var count = 0;

  const nearWords = computed(() => {
    let lastWord = '';
    let nextWord = '';
    let index = wordsData.currentIndex;
    if (wordsData.currentIndex > 0) {
      lastWord = wordsData.words[index - 1];
      lastWord.wordArr = config.ignore_case ? lastWord.word.toLowerCase().split('') : lastWord.word.split('');
      if (lastWord.userInput) {
        lastWord.inputWordArr = config.ignore_case ? lastWord.userInput.toLowerCase().split('') : lastWord.userInput.split('');
      } else {
        lastWord.inputWordArr = new Array(lastWord.word.length);
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

  const chapterList = computed(() => {
    return appStore?.dictationInfo?.chapterList || [];
  });
  // const currentChapter = computed(() => {
  //   return appStore.dictationInfo.currentChapter;
  // });

  const getWords = () => {
    if (errSource.value) {
      const copyWords = JSON.parse(JSON.stringify(appStore.errWords));
      if (config.is_disorderly) {
        wordsData.words = shuffleArray(copyWords);
      } else {
        wordsData.words = copyWords;
      }
      wordsData.currentWord = copyWords[wordsData.currentIndex];
    } else {
      setLoading(true);
      getWordList({
        c_id: appStore.dictationInfo.currentChapter.id,
        // continue_lexicon_id: appStore.dictationInfo.last_id,
        pagesize: 9999,
      })
        .then((res) => {
          if (res.data.length) {
            // 是否开启乱序
            if (config.is_disorderly) {
              // 筛选出没有听写的单词
              const noRead = res.data.filter((o) => !res.existing_id.includes(o.id));
              const beanRead = res.data.filter((o) => res.existing_id.includes(o.id));
              // console.log(noRead, beanRead, '222');
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
                      wordsData.currentIndex = res?.existing_id.length || 0;
                      wordsData.currentWord = wordsData.words[wordsData.currentIndex];
                    }
                    if (res.last_key) {
                      currentTestKey = res.last_key;
                    }
                  })
                  .catch((action) => {
                    if (action == 'cancel') {
                      wordsData.currentWord = wordsData.words[wordsData.currentIndex > -1 ? wordsData.currentIndex : 0];
                    }
                  });
              } else {
                wordsData.currentWord = wordsData.words[wordsData.currentIndex > -1 ? wordsData.currentIndex : 0];
              }
            }

            // // 继续上次播放的逻辑
            // if (appStore.dictationInfo.currentChapter.is_incomplete && !errSource.value) {

            // } else {
            // }
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
  };
  // 播放音频的方法
  // let audio = null;
  var timer = null;
  let countdownInterval = null;
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
      // audio = null;
    }
  };

  const handleMove = (type) => {
    // 如果已经在播放状态，直接返回，避免重复调用
    // if (playStatus.value === 1) {
    //   return;
    // }
    playStatus.value = 1;
    const sign = wordsData.currentIndex + type;

    if (sign < wordsData.words.length && sign >= 0) {
      wordsData.currentIndex = sign;
      wordsData.currentWord = wordsData.words[wordsData.currentIndex];
    }
    clearAudioCache();
    playWords();
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
    inputRef.value.blur();
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
    reportLexiRes({
      key: currentTestKey,
      ...data,
    }).then(() => {});
  };

  // 处理计算结果
  const handleResult = () => {
    const correctness = (wordsData.words.filter((word) => word.isOk).length / wordsData.words.length) * 100;
    if (appStore?.dictationInfo?.currentChapter.id && appStore?.dictationInfo?.currentChapter.g_id) {
      getChapterList({
        id: appStore.dictationInfo.currentChapter.id,
        g_id: appStore.dictationInfo.currentChapter.g_id,
      }).then((res) => {
        mistakeRef.value.open((res?.[0].accuracy || correctness).toFixed(2));
      });
    } else {
      mistakeRef.value.open(correctness.toFixed(2));
    }
  };
  // 回车 播放下一个的方法
  const inputEnter = () => {
    count = 0;
    clearAudioCache();
    if (!wordsData.words.length || playStatus.value != 1) {
      return;
    }
    let { word, userInput, id } = wordsData.currentWord;
    if (config.ignore_case) {
      // 忽略大小写
      word = word.toLowerCase();
      userInput = userInput ? userInput.toLowerCase() : '';
    }
    if (word === userInput) {
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
    }, 500);
  };

  // 聚焦
  const handleFocus = () => {
    start();
  };
  // 失去焦点
  const handleBlur = () => {
    stop();
  };

  // 听写模式
  const handleMode = () => {
    config.isSeries = !config.isSeries;
    ElMessage.success(`连读已 ${!config.isSeries ? '关闭' : '开启'}`);
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
    console.log(Math.random(), count);
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
        // timer = setTimeout(() => {
        //   inputEnter();
        // }, config.play_interval * 1000);

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
      // else {
      //   audio.src = config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y'];

      //   timer = setTimeout(() => {
      //     audio.play();
      //   }, config.play_interval * 1000);
      // }
    }
  }

  // 播放单词的方法
  const playWords = () => {
    // if (!audio) {
    //   audio = new Audio();
    // }
    // 播放第一个单词
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
    console.log(appStore.dictationInfo);
    console.log(route);
    audio = new Audio();
    errSource.value = route.query?.source == 'err';

    document.addEventListener('keydown', handleAllKeyDown);
    if (!appStore?.dictationInfo?.currentChapter && !appStore.errWords.length) {
      router.push('/main');
      return;
    }
    getWords();
  });

  // 章节切换
  const chapterChange = async (id) => {
    await appStore.toggleCurrentChapter(chapterList.value.find((chapter) => chapter.id == id));
    if (errSource.value) {
      errSource.value = false;
      router.push('/home');
    }
    setTimeout(() => {
      getWords();
      wordsData.currentWord = { translate: '', word: '', phonetic_transcription: '', userInput: '' };
      wordsData.words = [];
      wordsData.currentIndex = 0;
    });
  };
  const handleLogout = () => {
    userStore.logout();
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
  const handleConfigChange = (p, val) => {
    userStore.handleConfig(p, val);
  };
  onUnmounted(() => {
    if (audio) {
      audio.pause(); // 先暂停播放
      audio.src = ''; // 清空src
      audio.remove(); // 移除音频对象

      // 或者将音频对象赋值为null
      audio = null;
    }
    if (!errSource.value) {
      appStore.setLastId(wordsData?.currentWord.id || null);
    }
  });

  // 展示当前播放词库列表
  const showWordsList = () => {
    wordslistRef.value.open(wordsData.words, wordsData.currentWord);
  };
</script>

<style scoped lang="less">
  .my-card {
    box-shadow: 0 100px 80px #814c2e12, 0 41.7776px 33.4221px #814c2e0d, 0 22.3363px 17.869px #814c2e12, 0 12.5216px 10.0172px #814c2e0d,
      0 6.6501px 5.32008px #814c2e12, 0 2.76726px 2.21381px #814c2e0d;
  }

  .el-radio {
    margin-right: 0;
  }

  .user-input {
    input {
      font-size: 3rem;
      border-bottom: 2px solid black;
      padding: 10px;
      width: 90%;
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
</style>
