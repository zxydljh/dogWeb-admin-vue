<script setup>
import CurrentDate from '@/components/currentDate/index.vue'
import { getOrderStatisticsData } from '@/api/data'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const data = reactive({
  waitingAcceptOrder: 0,
  waitingDeliveryOrder: 0,
  deliveringOrder: 0,
  completedOrder: 0,
  canceledOrder: 0,
  totalOrder: 0
})

const init = async () => {
  await getOrderStatisticsData()
    .then(res => {
      const resData = res.data
      if (resData.code === 1) {
        data.waitingAcceptOrder = resData.data.waitingAcceptOrder
        data.waitingDeliveryOrder = resData.data.waitingDeliveryOrder
        data.deliveringOrder = resData.data.deliveringOrder
        data.completedOrder = resData.data.completedOrder
        data.canceledOrder = resData.data.canceledOrder
        data.totalOrder = resData.data.totalOrder
      } else {
        ElMessage.error(resData.msg)
      }
    })
    .catch(err => {
      ElMessage.error('请求出错：' + err)
    })
}

init()
</script>
<script>
export default {
  name: 'OrderView'
}
</script>

<template>
  <div class="view-container" style="width: 100%">
    <div class="view-name">
      订单管理
      <CurrentDate/>
    </div>
    <el-row>
      <el-col :span="5">
        <el-statistic :value="data.waitingAcceptOrder">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="red-color view-title">
              待接单
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic title="待派送" :value="data.waitingDeliveryOrder">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="red-color view-title">
              待派送
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic :value="data.completedOrder">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              已完成
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic title="已取消" :value="data.canceledOrder">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              已取消
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="4">
        <el-statistic title="全部订单" :value="data.totalOrder">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              全部订单
            </div>
          </template>
        </el-statistic>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.red-color {
  color: orangered;
}
</style>
