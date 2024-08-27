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
          <div class="relative">
            <div>
              <a
                class="text-black block rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100"
              >
                {{ errSource ? `错词` : `${appStore?.dictationInfo?.booInfo.name}${appStore?.dictationInfo?.currentChapter?.name}` }}
              </a>
            </div>
          </div>
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
          <el-tooltip v-if="false" content="单词播放间隔" placement="top" effect="light">
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

          <div class="flex items-center justify-center gap-2 space-x-2 lg:space-x-1">
            <el-tooltip content="设置" placement="top" effect="light">
              <div class="relative">
                <el-popover placement="bottom" :width="200" trigger="click">
                  <template #reference>
                    <button
                      class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out ml-1"
                      title="设置"
                      type="button"
                    >
                      <el-icon color="#2c3e50" :size="20"><Tools /></el-icon>
                    </button>
                  </template>
                  <div>
                    <div class="flex items-center justify-between">
                      <div>播放词义</div>
                      <el-switch v-model="config.playMean" @change="(val) => handleConfigChange('playMean', val)" />
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <div>播放单词拼写</div>
                      <el-switch v-model="config.playSpell" @change="(val) => handleConfigChange('playSpell', val)" />
                    </div>
                  </div>
                </el-popover>
              </div>
            </el-tooltip>

            <el-tooltip content="返回" placement="top" effect="light">
              <div class="relative">
                <button
                  class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out"
                  title="返回主页"
                  type="button"
                  @click="router.back()"
                >
                  <el-icon color="#2c3e50" :size="20"><CloseBold /></el-icon>
                </button>
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
          <div class="container flex w-full h-24 shrink-0 grow-0 justify-between px-12 pt-0"> </div>
          <div class="container flex flex-grow flex-col items-center justify-center">
            <div class="relative flex w-full justify-center">
              <div class="relative w-full" v-if="wordsData.words.length">
                <div lang="en" class="flex flex-col items-center justify-center pb-1 pt-4 w-full">
                  <div class="user-input text-center flex flex-col items-center w-full">
                    <b class="font-mono font-normal text-center text-5xl">{{ wordsData.currentWord.word }}</b>
                    <b class="h-10 font-mono font-normal text-center text-xl text-gray mt-4">{{
                      wordsData.currentWord.phonetic_transcription ? `/${wordsData.currentWord.phonetic_transcription}/` : ''
                    }}</b>
                    <p class="mt-4 h-10">{{ wordsData.currentWord.translate }}</p>
                  </div>
                </div>
                <div class="space-x-8 flex mt-10 duration-300 text-center justify-center transition-colors font-sans cursor-pointer">
                  <div>
                    <el-tooltip content="列表页" placement="top" effect="light">
                      <SvgIcon name="list" color="grey" @click="showWordsList" width="46" height="38"
                    /></el-tooltip>
                  </div>
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
                    <el-tooltip content="前进下一个单词，快捷键 Enter" placement="top" effect="light">
                      <SvgIcon name="play-left" color="grey" @click="handleMove(1)" class="rotate-180" />
                    </el-tooltip>
                  </div>
                  <div>
                    <el-tooltip :content="wordsData.currentWord.is_collection ? '取消收藏' : '收藏'" placement="top" effect="light">
                      <SvgIcon
                        name="collect-walk"
                        :color="wordsData.currentWord.is_collection ? '#ff5c00' : 'grey'"
                        :hoverColor="wordsData.currentWord.is_collection ? '#ff5c00' : 'grey'"
                        @click="handleCollect"
                        width="27"
                      />
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
        <el-progress :percentage="(wordsData.currentIndex * 100) / (wordsData.words.length - 1 || 1)" class="w-full" :stroke-width="16">
          <span>{{ wordsData.currentIndex + 1 }}/{{ wordsData.words.length }}</span>
        </el-progress>
      </div>
    </div>
  </div>
  <Loading :loading="loading" />
  <WordsDrawer ref="wordslistRef" @skip="wordsSkip" />
  <audio ref="audioPlayer" controls style="display: none"></audio>
  <collectDialog ref="collectRef" @addBook="addBook" @ok="collectFinish" />
  <ImportDialog ref="addBookRef" @ok="handleWordCollect" />
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';

  import { ElMessage, ElMessageBox } from 'element-plus';
  import { List, HomeFilled, Tools, StarFilled, CloseBold } from '@element-plus/icons-vue';
  import { useAppStore, useUserStore } from '@/store';
  import { useRouter, useRoute } from 'vue-router';

  import Loading from '@/components/loading/index.vue';
  import useLoading from '@/hooks/loading.ts';

  import mistakeDialog from './mistakeDialog.vue';
  import WordsDrawer from './wordsDrawer.vue';
  import collectDialog from '../errorBook/components/collect-dialog.vue';
  import ImportDialog from '../errorBook/components/import-dialog.vue';

  import { getWordList, wordLabel } from '@/api/book/index';
  import { shuffleArray, deepClone } from '@/utils/index';
  import confetti from 'canvas-confetti';
  import { modulesFiles, modules } from '@/assets/mp3/moduleMp3.js';
  import { useCollect } from '@/views/home/useLogic.js'

  const appStore = useAppStore();
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const { loading, setLoading } = useLoading();
  const { handleWordCancelCollect, collectRef, handleWordCollect, addBookRef, addBook } = useCollect()

  // 有道的翻译api
  // const YDAPI = 'https://dict.youdao.com/dictvoice?audio=';
  const errSource = ref(false); // 默认空，错词表来的  err

  // 预加载一下字母的音频
  const letterMp3 = reactive({});
  Object.keys(modules).forEach((key) => {
    letterMp3[key] = new Audio(modules[key]);
  });

  const config = reactive({
    chapterId: appStore.chapterId,
    play_speed: userStore.getConfig.play_speed + '' || '1.0',
    play_interval: '0',
    repetitions: userStore.getConfig.repetitions + '' || '1',
    phonetic_type: userStore.getConfig.phonetic_type || 2,
    error_sound: userStore.getConfig.error_sound || false,
    ignore_case: userStore.getConfig.ignore_case || true,
    is_disorderly: userStore.getConfig.is_disorderly || false,
    is_automatic_submit: userStore.getConfig.is_automatic_submit || false,
    isSeries: true,
    speedList: ['0.8', '1.0', '1.2', '1.4', '1.6'],
    gapList: ['1', '2', '3', '4', '5', '6', '7'],
    repeatList: ['1', '2', '3', '无限'],
    pronounceList: [
      { name: '美音', id: 2 },
      { name: '英音', id: 1 },
    ],
    playMean: false,
    playSpell: false,
  });

  const wordsData = reactive({
    words: [],
    currentWord: { translate: '', word: '', phonetic_transcription: '', userInput: '' },
    currentIndex: 0,
  });

  const playStatus = ref(0); // 0-未开始 1-播放中 2-已暂停
  const wordslistRef = ref(null);
  const countDown = ref(0); // 倒计时
  const audioPlayer = ref(null);
  let audio = audioPlayer.value;
  let audio2 = new Audio();
  let audio3 = new Audio();

  let count = 0;
  let timer = null;
  let countdownInterval = null;
  let utterance = new SpeechSynthesisUtterance();
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;

  const getWords = () => {
    if (errSource.value) {
      const copyWords = JSON.parse(JSON.stringify(appStore.errWords));
      if (config.is_disorderly) {
        wordsData.words = shuffleArray(copyWords);
      } else {
        wordsData.words = copyWords;
      }
      wordsData.currentWord = copyWords[wordsData.currentIndex];
      start()
    } else {
      setLoading(true);
      getWordList({
        c_id: appStore.dictationInfo.currentChapter.id,
        pagesize: 9999,
        s_id: appStore?.dictationInfo?.isClass ? 5 : null,
      })
        .then((res) => {
          if (res.data.length) {
            wordsData.words = res.data;
            wordsData.currentWord = wordsData.words[wordsData.currentIndex > -1 ? wordsData.currentIndex : 0];
          } else {
            ElMessage.error('当前章节未配置词库');
          }
          setLoading(false);
          start()
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
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
    if (audio2) {
      audio2?.src && (audio2.src = '');
      audio2.pause();
    }
    if (audio3) {
      audio3?.src && (audio3.src = '');
      audio3.pause();
    }
    Object.keys(modules).forEach((key) => {
      letterMp3[key].pause();
    });
    if (utterance) {
      utterance.text = '';
      window.speechSynthesis.speak(utterance);
      window.speechSynthesis.cancel();
    }
  };

  const handleMove = (type, isPlay = true) => {
    playStatus.value = 1;
    const sign = wordsData.currentIndex + type;
    if (sign < wordsData.words.length && sign >= 0) {
      wordsData.currentIndex = sign;
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
    clearAudioCache();
    playWords();
  };

  // 暂停
  const stop = () => {
    count = 0;
    playStatus.value = 2;
    countDown.value = 0;
    clearInterval(countdownInterval);
    if (audio) {
      audio?.src && (audio.src = '');
      audio.pause();
    }
    if (audio2) {
      audio2?.src && (audio2.src = '');
      audio2.pause();
    }
    clearAudioCache();
  };

  // 切换暂停和播放
  const toggleStopAndStart = () => {
    playStatus.value == 1 ? stop() : start()
  };

  const handleResult = () => {
    stop();
    ElMessage.success('当前章节已播放完毕');
  };

  // 回车 播放下一个的方法
  const inputEnter = () => {
    count = 0;
    clearAudioCache();
    if (!wordsData.words.length || playStatus.value != 1) {
      return;
    }
    setTimeout(() => {
      if (wordsData.words.length <= wordsData.currentIndex + 1) {
        handleResult();
      } else {
        handleMove(1);
      }
    }, 200);
  };

  function playAudio(audioUrl) {
    return new Promise((resolve, reject) => {
      audio2.src = audioUrl;
      audio2.onended = resolve; // 当音频播放结束时，resolve Promise
      audio2.onerror = reject; // 如果播放出错，reject Promise
      audio2.play();
    });
  }
  function playLetter(audioObj) {
    return new Promise((resolve, reject) => {
      audioObj.onended = resolve; // 当音频播放结束时，resolve Promise
      audioObj.onerror = reject; // 如果播放出错，reject Promise
      audioObj.play();
    });
  }

  // function audioOver() {
  //   if (config.playSpell) { // 播放单词拼写
  //     const playNextLetter = (word, index) => {
  //       if (index >= word.length) {
  //         playAudio(config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y']).then(() => {
  //           if (config.playMean) {
  //             // 监听 'onend' 事件，该事件在语音播放完毕后触发
  //             utterance.onend = function (event) {
  //               console.log('语音播放完毕');
  //               // 这里可以执行播放完毕后的代码
  //               console.log(Math.random(), count);
  //               if (count < +config.repetitions || config.repetitions == '无限') {
  //                 count++;
  //                 // 这里是播放
  //                 audio.src = config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y'];

  //                 timer = setTimeout(() => {
  //                   audio.play();
  //                 }, config.play_interval * 1000);
  //               } else {
  //                 count = 0;
  //                 if (playStatus.value == 1 && config.isSeries) {
  //                   countDown.value = config.play_interval;
  //                   console.log(countDown.value, 'countDown.value1');
  //                   countdownInterval = setInterval(() => {
  //                     console.log(countDown.value, 'countDown.value2');
  //                     countDown.value--;
  //                     if (countDown.value <= 0) {
  //                       clearInterval(countdownInterval);
  //                       // 播放下一个单词的逻辑
  //                       inputEnter();
  //                     }
  //                   }, 100);
  //                 }
  //               }
  //             };
  //             console.log('播放词义');

  //             utterance.text = wordsData.currentWord?.['translate'].split(/；|;/)[0]?.replace(/[a-zA-Z]+[.]+/g, '');
  //             window.speechSynthesis.speak(utterance);
  //           } else {
  //             if (count < +config.repetitions || config.repetitions == '无限') {
  //               count++;
  //               // 这里是播放
  //               audio.src = config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y'];

  //               timer = setTimeout(() => {
  //                 audio.play();
  //               }, config.play_interval * 1000);
  //             } else {
  //               count = 0;

  //               if (playStatus.value == 1 && config.isSeries) {
  //                 countDown.value = config.play_interval;
  //                 console.log(countDown.value, 'countDown.value1');
  //                 countdownInterval = setInterval(() => {
  //                   console.log(countDown.value, 'countDown.value2');
  //                   countDown.value--;
  //                   if (countDown.value <= 0) {
  //                     clearInterval(countdownInterval);
  //                     // 播放下一个单词的逻辑
  //                     inputEnter();
  //                   }
  //                 }, 100);
  //               }
  //             }
  //           }
  //         });

  //         return;
  //       }

  //       const letterLower = word[index].toLowerCase();
  //       const letterUpper = word[index].toUpperCase();
  //       if (!/^[A-Za-z]+$/.test(letterLower || letterUpper)) {
  //         playNextLetter(word, index + 1);
  //       } else {
  //         playLetter(letterMp3[letterLower] || letterMp3[letterUpper])
  //           .then(() => {
  //             // 播放当前字母后，递归播放下一个字母
  //             playNextLetter(word, index + 1);
  //           })
  //           .catch((error) => {
  //             console.error('Error playing audio:', error);
  //           });
  //       }
  //     };
  //     const playLettersSequentially = (word) => {
  //       if (word.length === 0) return;
  //       playNextLetter(word, 0);
  //     };
  //     playLettersSequentially(wordsData.currentWord.word);
  //   } else if (!config.playSpell && config.playMean) {
  //     // 监听 'onend' 事件，该事件在语音播放完毕后触发
  //     utterance.onend = function (event) {
  //       console.log('语音播放完毕');
  //       // 这里可以执行播放完毕后的代码
  //       console.log(Math.random(), count);
  //       if (count < +config.repetitions || config.repetitions == '无限') {
  //         count++;
  //         // 这里是播放
  //         audio.src = config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y'];

  //         timer = setTimeout(() => {
  //           audio.play();
  //         }, config.play_interval * 1000);
  //       } else {
  //         count = 0;

  //         if (playStatus.value == 1 && config.isSeries) {
  //           countDown.value = config.play_interval;
  //           console.log(countDown.value, 'countDown.value1');
  //           countdownInterval = setInterval(() => {
  //             console.log(countDown.value, 'countDown.value2');
  //             countDown.value--;
  //             if (countDown.value <= 0) {
  //               clearInterval(countdownInterval);
  //               // 播放下一个单词的逻辑
  //               inputEnter();
  //             }
  //           }, 100);
  //         }
  //       }
  //     };

  //     utterance.text = wordsData.currentWord?.['translate'].split(/；|;/)[0]?.replace(/[a-zA-Z]+[.]+/g, '');
  //     window.speechSynthesis.speak(utterance);
  //   } else {
  //     console.log(Math.random(), count);
  //     if (count < +config.repetitions || config.repetitions == '无限') {
  //       count++;
  //       // 这里是播放
  //       audio.src = config.phonetic_type == 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y'];

  //       timer = setTimeout(() => {
  //         audio.play();
  //       }, config.play_interval * 1000);
  //     } else {
  //       count = 0;

  //       // 所有单词都已播放完毕，停止播放
  //       if (playStatus.value == 1 && config.isSeries) {
  //         countDown.value = config.play_interval;
  //         console.log(countDown.value, 'countDown.value1');
  //         countdownInterval = setInterval(() => {
  //           console.log(countDown.value, 'countDown.value2');
  //           countDown.value--;
  //           if (countDown.value <= 0) {
  //             clearInterval(countdownInterval);
  //             // 播放下一个单词的逻辑
  //             inputEnter();
  //           }
  //         }, 100);
  //       }
  //     }
  //   }
  // }

  function audioOver() {
    const shouldRepeat = () => {
      return count < +config.repetitions || config.repetitions === '无限';
    };

    const startCountdown = () => {
      countDown.value = config.play_interval;
      const countdownInterval = setInterval(() => {
        countDown.value--;
        if (countDown.value <= 0) {
          clearInterval(countdownInterval);
          inputEnter();
        }
      }, 100);
    };

    const handleEndOfPlayback = () => {
      count = 0;
      if (playStatus.value === 1 && config.isSeries) {
        startCountdown();
      }
    };

    const playWord = async (word) => {
      if (!config.playSpell) {
        count++
        await playAudio(config.phonetic_type === 2 ? wordsData.currentWord['phonetic-m'] : wordsData.currentWord['phonetic-y']);
      }

      if (config.playMean) {
        utterance.text = wordsData.currentWord?.['translate'].split(/；|;/)[0]?.replace(/[a-zA-Z]+[.]+/g, '');
        window.speechSynthesis.speak(utterance);
      }

      if (shouldRepeat()) {
        setTimeout(() => {
          playWord(word);
        }, config.play_interval * 1000);
      } else {
        handleEndOfPlayback();
      }
    };

    if (config.playSpell) {
      const playNextLetter = (word, index) => {
        if (index >= word.length) {
          playWord(wordsData.currentWord.word);
          return;
        }

        const letter = word[index].toLowerCase() || word[index].toUpperCase();
        playLetter(letterMp3[letter])
          .then(() => {
            playNextLetter(word, index + 1);
          })
          .catch(console.error);
      };

      playNextLetter(wordsData.currentWord.word, 0);
    } else {
      playWord(wordsData.currentWord.word);
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
    } else if (event.keyCode === 13) {
      handleMove(1);
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
  });

  // 切换配置
  const handleConfigChange = (p, val) => {
    config[p] = val;
  };

  const wordsSkip = (word) => {
    stop();
    wordsData.currentIndex = wordsData.words.findIndex((item) => item.id == word.id);
    wordsData.currentWord = word;
    start();
  };

  onUnmounted(() => {
    if (audio) {
      audio.pause();
      audio.src = '';
      audio.remove();
      audio = null;
    }
    clearAudioCache();
  });

  // 展示当前播放词库列表
  const showWordsList = () => {
    wordslistRef.value.open(wordsData.words, wordsData.words, wordsData.currentWord, 'walkman');
  };

  // 收藏的逻辑
  const handleCollect = () => {
    const id = wordsData.currentWord.id;
    if (!wordsData.currentWord.is_collection) {
      handleWordCollect([id])
    } else {
      handleWordCancelCollect({ids: [id], callback: () => wordsData.currentWord.is_collection = false})
    }
  };

  const collectFinish = (ids, is_collection = true) => {
    ids.forEach((id) => {
      wordsData.words.find((o) => o.id == id).is_collection = is_collection;
    });
  };
</script>

<style scoped lang="less">
  @import './base.less';
</style>
