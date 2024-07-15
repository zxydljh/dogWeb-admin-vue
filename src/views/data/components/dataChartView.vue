<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getStatisticsDataByTime } from '@/api/data'

const dateRange = ref([new Date(new Date().setDate(new Date().getDate() - 7)), new Date()])
let userTrendChart, last7DaysTurnoverChart

// 基于准备好的dom，初始化echarts实例
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  userTrendChart = echarts.init(document.getElementById('user-growth-trend'))
  last7DaysTurnoverChart = echarts.init(document.getElementById('last-7-days-turnover'))
  fetchChartData()
})

const fetchChartData = async () => {
  if (!dateRange.value || dateRange.value.length !== 2) {
    return // 避免空对象或者长度不为 2 的情况
  }

  const [startTime, endTime] = dateRange.value
  try {
    const res = await getStatisticsDataByTime({ beginTime: startTime.toISOString(), endTime: endTime.toISOString() })

    if (res && res.data && res.data.code === 1) {
      const { userGrowthTrend, turnoverData } = res.data.data
      updateUserTrendChart(userGrowthTrend)
      updateTurnoverChart(turnoverData)
    } else {
      ElMessage.error(res.data ? res.data.message : '请求失败，未返回数据')
    }
  } catch (err) {
    ElMessage.error(err.message || '请求失败')
  }
}

const updateUserTrendChart = (data) => {
  // console.log(data)
  // 判断数据是否为空，如果为空则不更新图表，避免报错
  if (data) {
    const dates = data.map(item => item.date)
    const userCounts = data.map(item => item.newUserCount)
    userTrendChart.setOption({
      title: { text: '用户增长趋势' },
      tooltip: {},
      xAxis: { data: dates },
      yAxis: {},
      series: [{ type: 'line', data: userCounts }]
    })
  } else {
    ElMessage.error('获取用户增长趋势数据失败')
  }
}

const updateTurnoverChart = (data) => {
  if (data) {
    const dates = data.map(item => item.date)
    const turnovers = data.map(item => item.turnover)
    last7DaysTurnoverChart.setOption({
      title: { text: '营业额收益' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { data: dates },
      yAxis: {},
      series: [{ type: 'bar', data: turnovers }]
    })
  } else {
    ElMessage.error('获取营业额收益数据失败')
  }
}
</script>
<script>
export default {
  name: 'DataChartView'
}
</script>
<template>
<div>
  <el-date-picker
    v-model="dateRange"
    type="daterange"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="fetchChartData"
    clearable
  />
  <div class="chart-box">
    <div id="user-growth-trend"></div>
    <div id="last-7-days-turnover"></div>
  </div>
</div>
</template>

<style scoped>
.chart-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#user-growth-trend,
#last-7-days-turnover{
  width: 600px;
  height: 400px;
  background-color: #f1f1f1;
}
</style>
