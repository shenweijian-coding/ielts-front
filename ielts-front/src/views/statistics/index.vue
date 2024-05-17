<template>
  <div class="flex items-stretch -mx-4 md:space-x-10 space-x-2 justify-between px-3 pt-10">
    <div class="w-full md:w-1/4 px-4 mb-4 rounded-xl bg-white shadow-md p-4">
      <div class="text-xl font-medium text-black">32</div>
      <p class="text-gray-500">今日听写</p>
    </div>

    <div class="w-full md:w-1/4 px-4 mb-4 rounded-xl bg-white shadow-md p-4">
      <div class="text-xl font-medium text-black">50min</div>
      <p class="text-gray-500">今日学习</p>
    </div>

    <div class="w-full md:w-1/4 px-4 mb-4 rounded-xl bg-white shadow-md p-4">
      <div class="text-xl font-medium text-black">1332</div>
      <p class="text-gray-500">累计听写</p>
    </div>

    <div class="w-full md:w-1/4 px-4 mb-4 rounded-xl bg-white shadow-md p-4">
      <div class="text-xl font-medium text-black">180</div>
      <p class="text-gray-500">累计分钟</p>
    </div>
  </div>
  <div class="bg-white">
    <div class="flex justify-end pr-4 mt-4">
      <el-select v-model="chapterId" placeholder="请选择章节" size="large">
        <el-option v-for="item in chapterList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <div>
      <canvas ref="ctx" style="height: 66vh"></canvas>
    </div>
  </div>
</template>
<script setup>
  import { Chart, registerables } from 'chart.js';
  import { useAppStore } from '@/store';
  import { getAnalysisData } from '@/api/book/index';

  const appStore = useAppStore();

  Chart.register(...registerables);
  const ctx = ref(null);
  const chapterId = ref('');
  // const

  const chartData = {
    labels: ['第1次', '第2次'], // 横轴标签
    datasets: [
      {
        label: '百分比', // 数据集的名称，将显示在图例中
        data: [50, 75], // 数据集的具体数据
        backgroundColor: 'rgba(0, 123, 255, 0.5)', // 数据集的填充颜色
        borderColor: 'rgba(0, 123, 255, 1)', // 数据集的边框颜色
        borderWidth: 1, // 数据集的边框宽度
      },
    ],
  };
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: '练习次数', // 横轴标题名称
        },
      },
      y: {
        title: {
          display: true,
          text: '正确率', // 纵轴标题名称
        },
        beginAtZero: true,
        ticks: {
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
  const chapterList = computed(() => {
    return appStore?.dictationInfo?.chapterList || [];
  });

  const getData = () => {
    getAnalysisData({
      c_id: chapterId.value,
    }).then((res) => {
      console.log(res);
    });
  };

  onMounted(() => {
    getData();
    new Chart(ctx.value, {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  });
</script>
