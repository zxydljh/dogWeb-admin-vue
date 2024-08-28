<script setup>
import { onMounted, reactive } from 'vue'
import { ChatLineRound } from '@element-plus/icons-vue'
import CurrentDate from '@/components/currentDate/index.vue'
import { getStatisticsData } from '@/api/data'
import { ElMessage } from 'element-plus'

const data = reactive({
  turnover: 0.0,
  validOrder: 0,
  orderFillRate: 0.0,
  manNumber: 0,
  femaleNumber: 0,
  feedbackNumber: 0
})

const initData = () => {
  getStatisticsData()
    .then((res) => {
      const resData = res.data
      // console.log(resData)
      if (resData.code === 1) {
        // fix 处理为空的情况
        if (resData.data === null) {
          return
        }
        data.turnover = resData.data.turnover ? resData.data.turnover.toFixed(2) : 0.00
        data.validOrder = resData.data.validOrder ? resData.data.validOrder : 0
        data.orderFillRate = resData.data.orderFillRate ? resData.data.orderFillRate.toFixed(2) : 0.00
        data.manNumber = resData.data.manNumber ? resData.data.manNumber : 0
        data.femaleNumber = resData.data.femaleNumber ? resData.data.femaleNumber : 0
        data.feedbackNumber = resData.data.feedbackNumber ? resData.data.feedbackNumber : 0
      } else {
        ElMessage.error(resData.msg ? resData.msg : '数据统计请求错误！')
      }
    })
    .catch(() => {
      ElMessage.error('数据请求错误')
    })
}

// 页面渲染初始化数据
onMounted(() => {
  initData()
})

</script>
<script>
export default {
  name: 'OverView'
}
</script>

<template>
  <div class="view-container" style="width: 100%">
    <div class="view-name">
      统计数据
      <CurrentDate/>
    </div>
    <el-row>
      <el-col :span="5">
        <el-statistic :value="data.turnover" precision="2">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              营业额
            </div>
          </template>
          <template #prefix>￥</template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic :value="data.validOrder">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              有效订单
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic :value="data.orderFillRate" precision="2">
          <template #title>
            <div style="display: inline-flex; align-items: center" class="view-title">
              订单完成率(%)
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic :value="data.manNumber">
          <template #title>
            <div style="display: inline-flex; align-items: center" class="view-title">
              男女比例
            </div>
          </template>
          <template #suffix>/{{ data.femaleNumber }}</template>
        </el-statistic>
      </el-col>
      <el-col :span="4">
        <el-statistic :value="data.feedbackNumber">
          <template #title>
            <div style="display: inline-flex; align-items: center" class="view-title">
              反馈数量
            </div>
          </template>
          <template #suffix>
            <el-icon style="vertical-align: -0.125em">
              <ChatLineRound/>
            </el-icon>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>
