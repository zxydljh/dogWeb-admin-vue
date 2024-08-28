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
        // fix 处理为空的情况
        if (resData.data === null) {
          return
        }

        data.waitingAcceptOrder = resData.data.waitingAcceptOrder ? resData.data.waitingAcceptOrder : 0
        data.waitingDeliveryOrder = resData.data.waitingDeliveryOrder ? resData.data.waitingDeliveryOrder : 0
        data.deliveringOrder = resData.data.deliveringOrder ? resData.data.deliveringOrder : 0
        data.completedOrder = resData.data.completedOrder ? resData.data.completedOrder : 0
        data.canceledOrder = resData.data.canceledOrder ? resData.data.canceledOrder : 0
        data.totalOrder = resData.data.totalOrder ? resData.data.totalOrder : 0
      } else {
        ElMessage.error(resData.msg ? resData.msg : '订单统计请求失败！')
      }
    })
    .catch(() => {
      ElMessage.error('请求出错！')
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
