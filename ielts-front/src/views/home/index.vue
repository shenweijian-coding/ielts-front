<template>
  <header class="container z-20 mx-auto w-full px-10 py-6">
    <div class="flex w-full flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0"
      ><a
        class="flex items-center text-2xl font-bold text-indigo-500 no-underline hover:no-underline lg:text-4xl"
        href="https://qwerty.kaiyi.cool/"
      >
        <!-- <img src="" class="mr-3 h-16 w-16" alt="" /> -->
        <h1>logo</h1>
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
          <div
            ><button
              class="rounded-lg px-3 py-1 text-lg transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100"
              id="headlessui-listbox-button-:rdb:"
              type="button"
              aria-haspopup="listbox"
              aria-expanded="false"
              data-headlessui-state=""
              >3-1</button
            >
          </div>
        </div>

        <div class="relative" data-headlessui-state=""
          ><button
            class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
            type="button"
            aria-expanded="false"
            data-headlessui-state=""
            id="headlessui-popover-button-:rdc:"
          >
            <div class="relative">
              <div>x1倍</div>
            </div>
          </button>
        </div>

        <div class="relative" data-headlessui-state=""
          ><button
            class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
            type="button"
            aria-expanded="false"
            data-headlessui-state=""
            id="headlessui-popover-button-:rdc:"
          >
            <div class="relative">
              <div>5秒</div>
            </div>
          </button>
        </div>

        <div class="relative" data-headlessui-state=""
          ><button
            class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
            type="button"
            aria-expanded="false"
            data-headlessui-state=""
            id="headlessui-popover-button-:rdc:"
          >
            <div class="relative">
              <div>1遍</div>
            </div>
          </button>
        </div>

        <div class="relative" data-headlessui-state=""
          ><button
            class="flex h-8 min-w-max cursor-pointer items-center justify-center rounded-md px-1 transition-colors duration-300 ease-in-out hover:bg-theme hover:text-white focus:outline-none dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 bg-transparent"
            type="button"
            aria-expanded="false"
            data-headlessui-state=""
            id="headlessui-popover-button-:rdc:"
          >
            <div class="relative">
              <div>美音</div>
            </div>
          </button>
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
                  ><svg viewBox="0 0 24 24" width="1.2em" height="1.2em" class="icon">
                    <g fill="currentColor">
                      <path
                        d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595c.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06Zm5.084 1.046a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 1 1-1.06-1.06a8.25 8.25 0 0 0 0-11.668a.75.75 0 0 1 0-1.06Z"
                      />
                      <path
                        d="M15.932 7.757a.75.75 0 0 1 1.061 0a6 6 0 0 1 0 8.486a.75.75 0 0 1-1.06-1.061a4.5 4.5 0 0 0 0-6.364a.75.75 0 0 1 0-1.06Z"
                      />
                    </g></svg></button
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
                ><svg viewBox="0 0 24 24" width="1.2em" height="1.2em" class="icon">
                  <path
                    fill="currentColor"
                    d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"
                  /></svg></button
            ></div>
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
          <div class="container flex h-24 w-full shrink-0 grow-0 justify-between px-12 pt-10"></div>
          <div class="container flex flex-grow flex-col items-center justify-center">
            <div class="relative flex w-full justify-center">
              <div class="absolute flex h-full w-full justify-center">
                <div class="z-10 flex w-full items-center backdrop-blur-sm">
                  <p class="w-full select-none text-center text-xl text-gray-600 dark:text-gray-50">按任意键开始</p>
                </div>
              </div>
              <div class="relative">
                <div lang="en" class="flex flex-col items-center justify-center pb-1 pt-4">
                  <div
                    class="tooltip-info relative w-fit bg-transparent p-0 leading-normal shadow-none dark:bg-transparent"
                    data-tip="按 Tab 快捷键显示完整单词"
                  >
                    <div class="flex items-center false justify-center"
                      ><span
                        class="m-0 p-0 font-mono font-normal text-gray-600 dark:text-gray-50 pr-0.8 duration-0 dark:text-opacity-80"
                        style="font-size: 48px"
                        >p</span
                      ><span
                        class="m-0 p-0 font-mono font-normal text-gray-600 dark:text-gray-50 pr-0.8 duration-0 dark:text-opacity-80"
                        style="font-size: 48px"
                        >o</span
                      ><span
                        class="m-0 p-0 font-mono font-normal text-gray-600 dark:text-gray-50 pr-0.8 duration-0 dark:text-opacity-80"
                        style="font-size: 48px"
                        >s</span
                      ><span
                        class="m-0 p-0 font-mono font-normal text-gray-600 dark:text-gray-50 pr-0.8 duration-0 dark:text-opacity-80"
                        style="font-size: 48px"
                        >s</span
                      ><span
                        class="m-0 p-0 font-mono font-normal text-gray-600 dark:text-gray-50 pr-0.8 duration-0 dark:text-opacity-80"
                        style="font-size: 48px"
                        >e</span
                      ><span
                        class="m-0 p-0 font-mono font-normal text-gray-600 dark:text-gray-50 pr-0.8 duration-0 dark:text-opacity-80"
                        style="font-size: 48px"
                        >s</span
                      ><span
                        class="m-0 p-0 font-mono font-normal text-gray-600 dark:text-gray-50 pr-0.8 duration-0 dark:text-opacity-80"
                        style="font-size: 48px"
                        >s</span
                      ></div
                    >
                    <div class="absolute -right-12 top-1/2 h-9 w-9 -translate-y-1/2 transform">
                      <div class="relative">
                        <div
                          ><button
                            type="button"
                            class="focus:outline-none dark:fill-gray-400 dark:opacity-80 cursor-pointer text-gray-600 h-full w-full"
                            ><svg
                              class="prefix__icon undefined"
                              viewBox="0 0 1024 1024"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                            >
                              <path
                                d="M417.28 164.198c-12.646 0-25.293 5.325-37.683 15.821L169.779 358.35H76.8c-42.342 0-76.8 34.457-76.8 76.8v204.8c0 42.342 34.458 76.8 76.8 76.8h92.98l209.817 178.33c12.339 10.495 25.037 15.82 37.683 15.82a40.755 40.755 0 0034.304-18.534c6.093-9.165 9.216-20.89 9.216-34.816v-640c0-36.864-21.862-53.402-43.52-53.402zM51.2 640V435.2a25.6 25.6 0 0125.6-25.6h76.8v256H76.8A25.6 25.6 0 0151.2 640zm358.4 213.453l-204.8-174.08V395.827l204.8-174.08v631.706z"
                              /></svg></button
                        ></div>
                        <div
                          class="opacity-0 bottom-full pb-2 pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center justify-center transition-opacity"
                        >
                          <span class="tooltip">快捷键Ctrl + J</span></div
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="space-x-5 text-center text-sm font-normal text-gray-600 transition-colors duration-300 dark:text-gray-400 false"
                >
                  <span>AmE: [pə'zɛs]</span></div
                >
                <div class="flex items-center justify-center pb-4 pt-5"
                  ><span
                    class="max-w-4xl text-center font-sans transition-colors duration-300 dark:text-white dark:text-opacity-80 false false"
                    style="font-size: 18px"
                    >占用， 拥有</span
                  ></div
                >
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
        <div class="flex flex-1 flex-col items-center justify-center"
          ><span class="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400"
            >00:00</span
          ><span class="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">时间</span></div
        >
        <div class="flex flex-1 flex-col items-center justify-center"
          ><span class="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400"
            >0</span
          ><span class="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">输入数</span></div
        >
        <div class="flex flex-1 flex-col items-center justify-center"
          ><span class="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400"
            >0</span
          ><span class="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">WPM</span></div
        >
        <div class="flex flex-1 flex-col items-center justify-center"
          ><span class="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400"
            >0</span
          ><span class="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">正确数</span></div
        >
        <div class="flex flex-1 flex-col items-center justify-center"
          ><span class="w-4/5 border-b pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400"
            >0</span
          ><span class="pt-2 text-xs transition-colors duration-300 dark:text-gray-300">正确率</span></div
        >
      </div>
    </div>
  </div>
</template>

<script></script>

<style>
  .my-card {
    box-shadow: 0 100px 80px #814c2e12, 0 41.7776px 33.4221px #814c2e0d, 0 22.3363px 17.869px #814c2e12, 0 12.5216px 10.0172px #814c2e0d,
      0 6.6501px 5.32008px #814c2e12, 0 2.76726px 2.21381px #814c2e0d;
  }
</style>
