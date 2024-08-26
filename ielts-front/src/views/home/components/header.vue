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
                    >{{
                      errSource == 'err' ? '错词练习' : errSource == 'collect' ? '听写练习' : appStore?.dictationInfo?.currentChapter?.name
                    }}</button
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
                      <el-icon color="#2c3e50" :size="20"><Tools /></el-icon>
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
                    <el-icon color="#2c3e50" :size="20"><HomeFilled /></el-icon>
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
                      <el-icon><HomeFilled /></el-icon>
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
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup>
  import { useAppStore, useUserStore } from '@/store';
  import { List, HomeFilled, Tools } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';

  const appStore = useAppStore();
  const userStore = useUserStore();

  const emit = defineEmits(['getWords', 'showWordsList']);
  const props = defineProps({
    config: Object,
  });

  // const config = reactive({
  //   chapterId: appStore.chapterId,
  //   play_speed: userStore.getConfig.play_speed + '' || '1.0',
  //   play_interval: userStore.getConfig.play_interval || '5',
  //   repetitions: userStore.getConfig.repetitions + '' || '1',
  //   phonetic_type: userStore.getConfig.phonetic_type || 2,
  //   error_sound: userStore.getConfig.error_sound || false,
  //   ignore_case: userStore.getConfig.ignore_case || true,
  //   is_disorderly: userStore.getConfig.is_disorderly || false,
  //   is_automatic_submit: userStore.getConfig.is_automatic_submit || false,
  //   isSeries: false,
  //   speedList: ['0.8', '1.0', '1.2', '1.4', '1.6'],
  //   gapList: ['1', '2', '3', '4', '5', '6', '7'],
  //   repeatList: ['1', '2', '3', '无限'],
  //   pronounceList: [
  //     { name: '美音', id: 2 },
  //     { name: '英音', id: 1 },
  //   ],
  // });

  const tooltipVisible = ref(false);

  const chapterList = computed(() => {
    return appStore?.dictationInfo?.chapterList || [];
  });

  // 切换配置
  const handleConfigChange = (p, val, isResetWord = false) => {
    userStore.handleConfig(p, val);
    if (val && isResetWord) {
      appStore.updateContinuePlayStatus(true);
      emit('getWords');
    }
  };

  // 听写模式
  const handleMode = () => {
    props.config.isSeries = !props.config.isSeries;
    ElMessage.success(`连读已 ${!props.config.isSeries ? '关闭' : '开启'}`);
  };

  const showWordsList = () => {
    emit('showWordsList');
  };
</script>
<style lang="less">
  @import '../base.less';
</style>
