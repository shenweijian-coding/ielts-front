<template>
  <div class="flex items-stretch justify-between p-4 text-center pb-2 bg-white mb-2 rounded-l shadow-sm">
    <div class="w-full">
      <div class="text-m font-medium text-black">{{ state.detail.today_practice || 0 }} 个</div>
      <div class="text-gray-500">今日听写</div>
    </div>

    <div class="w-full text-center">
      <div class="text-m font-medium text-black">{{ ((state.detail.today_time || 0) / 60).toFixed(0) || 0 }} min</div>
      <div class="text-gray-500">今日学习</div>
    </div>

    <div class="w-full text-center">
      <div class="text-m font-medium text-black">{{ state.detail.cumulative_practice || 0 }} 个</div>
      <div class="text-gray-500">累计听写</div>
    </div>

    <div class="w-full text-center">
      <div class="text-m font-medium text-black">{{ ((state.detail.cumulative_time || 0) / 60).toFixed(0) || 0 }} min</div>
      <div class="text-gray-500">累计分钟</div>
    </div>
  </div>

  <div class="bg-white px-4 shadow-sm">
    <div class="flex justify-end pr-4 mt-4 w-full">
      <el-select
        v-model="state.chapterId"
        placeholder="请选择章节"
        size="default"
        style="width: 250px"
        @change="chapterChange"
        filterable
        clearable
      >
        <el-option v-for="(item, val) in state.data" :key="item" :label="item.name" :value="val" />
      </el-select>
    </div>
    <div>
      <canvas ref="ctx" style="height: 70vh"></canvas>
    </div>
  </div>
  <tabbar />
  <Loading :loading="loading" />
</template>
<script setup>
  import { Chart, registerables } from 'chart.js';
  import { getAnalysisData } from '@/api/book/index';
  import tabbar from '@/components/tabBar/index.vue';
  import useLoading from '@/hooks/loading.ts';
  import Loading from '@/components/loading/index.vue';

  const { loading, setLoading } = useLoading();

  Chart.register(...registerables);
  const ctx = ref(null);
  const state = reactive({
    chart: null,
    chapterId: '',
    detail: {},
    data: {},
    chartData: {
      labels: [],
      datasets: [
        {
          label: '练习次数正确率',
          data: [],
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
        },
      ],
    },
  });
  // const

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: '练习次数', // 横轴标题名称
        },
        ticks: {
          callback: function (value) {
            console.log(value);
            // 格式化 y 轴的刻度标签为百分比形式
            return `第${value + 1}次`;
          },
        },
      },
      y: {
        title: {
          display: true,
          text: '正确率', // 纵轴标题名称
        },
        beginAtZero: true,
        ticks: {
          // min: 0, // 设置 Y 轴的最小值
          // max: 100, // 设置 Y 轴的最大值为 1，代表 100%
          callback: function (value) {
            // 格式化 y 轴的刻度标签为百分比形式
            return value + '%';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true, // 显示图例
      },
    },
    maintainAspectRatio: false,
  };
  // const chapterList = computed(() => {
  //   return appStore?.dictationInfo?.chapterList || [];
  // });

  const getData = () => {
    setLoading(true);
    getAnalysisData({
      c_id: state.chapterId.value,
    })
      .then((res) => {
        // console.log(res);
        state.detail = res;
        state.data = res.data;
        if (Object.keys(res.data).length) {
          state.chapterId = Object.keys(res.data)[0];
          chapterChange(state.chapterId);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const chapterChange = (chapterId) => {
    if (state.chart) {
      state.chart.destroy();
    }
    console.log(chapterId, 'chapterId');
    const labels = [];
    state.data[chapterId].accuracy.forEach((item, index) => {
      labels.push(index);
    });
    state.chartData.labels = labels;
    state.chartData.datasets[0].data = state.data[chapterId].accuracy;
    state.chart = new Chart(ctx.value, {
      type: 'line',
      data: state.chartData,
      options: chartOptions,
    });
    // console.log(chartData.labels, chartData.datasets[0].data, '111');
    // nextTick(() => {
    // state.chart.update();
    // });
  };

  onMounted(() => {
    state.chart = new Chart(ctx.value, {
      type: 'line',
      data: state.chartData,
      options: chartOptions,
    });
    getData();
  });
</script>
