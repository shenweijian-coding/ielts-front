<template>
  <main class="flex h-screen w-full flex-col items-center pb-4">
    <header class="container z-20 mx-auto w-full px-10 py-6">
      <div class="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0"
        ><a
          class="flex items-center text-2xl font-bold text-indigo-500 no-underline hover:no-underline lg:text-4xl"
          href="https://qwerty.kaiyi.cool/"
        >
          <!-- <img src="" class="mr-3 h-16 w-16" alt="" /> -->
          <!-- <h1>logo</h1> -->
        </a>
        <nav
          class="my-card on element flex w-auto content-center items-center justify-end space-x-3 rounded-xl bg-white p-4 transition-colors duration-300 dark:bg-gray-800"
        >
          <div class="relative">
            <div>
              <a
                class="text-black block rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100"
                href="/gallery"
              >
                语思资料库
              </a>
            </div>
          </div>

          <div class="relative">
            <el-popover placement="bottom" :width="200" trigger="hover">
              <template #reference>
                <button
                  class="rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100"
                  id="headlessui-listbox-button-:rdb:"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  data-headlessui-state=""
                  >{{ config.chapter }}</button
                >
              </template>
              <div>
                <el-radio-group v-model="config.chapter" size="default" @change="bookChange">
                  <el-radio-button v-for="chapter in config.chapterList" :key="chapter" :label="chapter">{{ chapter }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-popover>
          </div>

          <div class="relative" data-headlessui-state="">
            <el-popover placement="bottom" :width="100" trigger="hover">
              <template #reference>
                <button
                  class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:rdc:"
                >
                  <div class="relative">
                    <div>x{{ config.speed }} 倍</div>
                  </div>
                </button>
              </template>
              <div>
                <el-radio-group v-model="config.speed" size="default" @change="bookChange">
                  <el-radio v-for="speed in config.speedList" :key="speed" :label="speed" border class="w-full mb-2 mr-0"
                    >{{ speed }} 倍</el-radio
                  >
                </el-radio-group>
              </div>
            </el-popover>
          </div>

          <div class="relative" data-headlessui-state="">
            <el-popover placement="bottom" :width="100" trigger="hover">
              <template #reference>
                <button
                  class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:rdc:"
                >
                  <div class="relative">
                    <div>{{ config.gap }} 秒</div>
                  </div>
                </button>
              </template>
              <div>
                <el-radio-group v-model="config.gap" size="default" @change="bookChange">
                  <el-radio v-for="gap in config.gapList" :key="gap" :label="gap" border class="w-full mb-2 mr-0">{{ gap }} 秒</el-radio>
                </el-radio-group>
              </div>
            </el-popover>
          </div>

          <div class="relative" data-headlessui-state="">
            <el-popover placement="bottom" :width="100" trigger="hover">
              <template #reference>
                <button
                  class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:rdc:"
                >
                  <div class="relative">
                    <div>{{ config.repeat }} 遍</div>
                  </div>
                </button>
              </template>
              <div>
                <el-radio-group v-model="config.repeat" size="default" @change="bookChange">
                  <el-radio v-for="repeat in config.repeatList" :key="repeat" :label="repeat" border class="w-full mb-2 mr-0"
                    >{{ repeat }} 秒</el-radio
                  >
                </el-radio-group>
              </div>
            </el-popover>
          </div>

          <div class="relative" data-headlessui-state="">
            <el-popover placement="bottom" :width="100" trigger="hover">
              <template #reference>
                <button
                  class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:rdc:"
                >
                  <div class="relative">
                    <div>{{ config.pronounce }}</div>
                  </div>
                </button>
              </template>
              <div>
                <el-radio-group v-model="config.pronounce" size="default" @change="bookChange">
                  <el-radio v-for="pronounce in config.pronounceList" :key="pronounce" :label="pronounce" border class="w-full mb-2 mr-0">{{
                    pronounce
                  }}</el-radio>
                </el-radio-group>
              </div>
            </el-popover>
          </div>

          <div class="flex items-center justify-center gap-2">
            <div class="relative">
              <div>
                <div class="relative" data-headlessui-state=""
                  ><button
                    class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white"
                    aria-label="音效设置"
                    title="音效设置"
                    type="button"
                    aria-expanded="false"
                    data-headlessui-state=""
                    id="headlessui-popover-button-:rde:"
                  >
                    <SvgIcon
                      name="sound"
                      prefix="icon-svg"
                      size="small"
                      hoverColor="#fff"
                      :color="config.isSoundMute ? '' : '#ff5c00'"
                    /> </button
                ></div>
              </div>
              <div
                class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
              >
                <span class="tooltip">音效设置</span></div
              >
            </div>

            <div class="relative">
              <div
                ><button
                  type="button"
                  class="flex items-center justify-center rounded p-[2px] text-lg text-indigo-500 outline-none transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white"
                  title="查看错题本"
                >
                  <SvgIcon name="book" prefix="icon-svg" size="small" color="hover:text-white" />
                </button>
              </div>
              <div
                class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
              >
                <span class="tooltip">错题本</span></div
              >
            </div>
          </div>
        </nav>
      </div>
    </header>

    <div class="container mx-auto flex h-full flex-1 flex-col items-center justify-center pb-5">
      <div class="container relative mx-auto flex h-full flex-col items-center">
        <div class="container flex flex-grow items-center justify-center">
          <div class="container flex h-full w-full flex-col items-center justify-center">
            <div class="container flex h-24 w-full shrink-0 grow-0 justify-between px-12 pt-10"
              ><div class="relative" @click="handleMove(-1)"
                ><div
                  ><div
                    v-if="nearWords.lastWord"
                    class="flex max-w-xs cursor-pointer select-none items-center text-gray-700 opacity-60 duration-200 ease-in-out hover:opacity-100 dark:text-gray-400"
                  >
                    <SvgIcon name="left" />
                    <div class="grow-1 flex w-full flex-col ml-2"
                      ><p class="font-mono text-2xl font-normal text-gray-700 dark:text-gray-400 tracking-normal mb-0">{{
                        nearWords.lastWord.word
                      }}</p
                      ><p class="line-clamp-1 max-w-full text-sm font-normal text-gray-600 dark:text-gray-500">{{
                        nearWords.lastWord.zh
                      }}</p></div
                    ></div
                  ></div
                ><div
                  class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
                  ><span class="tooltip">快捷键: Control + Shift + ArrowLeft</span></div
                ></div
              ><div class="relative" @click="handleMove(1)"
                ><div>
                  <div
                    v-if="nearWords.nextWord"
                    class="flex max-w-xs cursor-pointer select-none items-center text-gray-700 opacity-60 duration-200 ease-in-out hover:opacity-100 dark:text-gray-400"
                    ><div class="grow-1 flex w-full flex-col items-end text-right mr-2"
                      ><p class="font-mono text-2xl font-normal text-gray-700 dark:text-gray-400 tracking-normal mb-0">{{
                        nearWords.nextWord.word
                      }}</p
                      ><p class="line-clamp-1 max-w-full text-sm font-normal text-gray-600 dark:text-gray-500">{{
                        nearWords.nextWord.zh
                      }}</p></div
                    >
                    <SvgIcon name="right" /> </div></div
                ><div
                  class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
                  ><span class="tooltip">快捷键: Control + Shift + ArrowRight</span></div
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

                <div class="relative">
                  <div lang="en" class="flex flex-col items-center justify-center pb-1 pt-4">
                    <div
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

                      <!-- <div class="absolute -right-12 top-1/2 h-9 w-9 -translate-y-1/2 transform">
                        <div class="relative">
                          <div
                            ><button
                              type="button"
                              class="focus:outline-none dark:fill-gray-400 dark:opacity-80 cursor-pointer text-gray-600 h-full w-full"
                              ></button
                          ></div>
                          <div
                            class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
                          >
                            <span class="tooltip">快捷键Ctrl + J</span></div
                          >
                        </div>
                      </div> -->
                    </div>
                  </div>
                  <!-- <div
                    class="space-x-5 text-center text-sm font-normal text-gray-600 transition-colors duration-300 dark:text-gray-400 false"
                  >
                    <span>{{ wordsData.currentWord.mark }}</span></div
                  >
                  <div class="flex items-center justify-center pb-4 pt-5">
                    <span
                      class="max-w-4xl text-center font-sans transition-colors duration-300 dark:text-white dark:text-opacity-80 false false"
                      style="font-size: 18px"
                      >{{ wordsData.currentWord.zh }}</span
                    >
                  </div> -->
                  <div class="space-x-8 flex mt-10 duration-300 text-center justify-center transition-colors font-sans cursor-pointer">
                    <div>
                      <SvgIcon name="play-left" color="grey" />
                    </div>
                    <div>
                      <SvgIcon name="play-start" color="grey" />
                      <SvgIcon name="play-stop" color="grey" />
                    </div>
                    <div>
                      <SvgIcon name="play-again" color="grey" />
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
        <div class="my-card flex w-3/5 rounded-xl bg-white p-4 py-10 opacity-50 transition-colors duration-300 dark:bg-gray-800">
          <el-progress :percentage="(wordsData.currentIndex * 100) / wordsData.words.length" class="w-full" :stroke-width="16">
            <span>{{ wordsData.currentIndex }}/{{ wordsData.words.length }}</span>
          </el-progress>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import SvgIcon from '@/components/SvgIcon/index.vue';

  const config = reactive({
    id: 1,
    chapter: '1-1',
    speed: '1.0',
    gap: '5',
    num: 1,
    repeat: '1',
    pronounce: '美音',
    isSoundMute: false,
    chapterList: ['1-1', '1-2', '2-1'],
    speedList: ['0.8', '1.0', '1.2', '1.4', '1.6'],
    gapList: ['2', '3', '4', '5', '6', '7'],
    repeatList: ['1', '2', '3', '无限'],
    pronounceList: ['美音', '英音'],
  });
  const wordsData = reactive({
    words: [{}],
    currentWord: { zh: '', word: '', mark: '' },
    currentIndex: 0,
  });

  const nearWords = computed(() => {
    let lastWord = '';
    let nextWord = '';
    let index = wordsData.currentIndex;
    if (wordsData.currentIndex > 0) {
      lastWord = wordsData.words[index - 1];
    }
    if (index < wordsData.words.length) {
      nextWord = wordsData.words[index + 1];
    }
    return {
      lastWord,
      nextWord,
    };
  });
  const getWords = (params) => {
    wordsData.words = [
      { zh: '中文', word: 'chinese', mark: `AmE: [pə'zɛs]` },
      { zh: '英文', word: 'english', mark: `AmE: [pə'zɛs]` },
    ];
    wordsData.currentWord = wordsData.words[wordsData.currentIndex];
  };
  getWords();

  const handleMove = (type) => {
    const sign = wordsData.currentIndex + type;

    if (sign < wordsData.words.length && sign >= 0) {
      wordsData.currentIndex = sign;
      wordsData.currentWord = wordsData.words[wordsData.currentIndex];
    }
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
  .el-popover .el-popper {
    min-width: 100px !important;
  }
</style>
