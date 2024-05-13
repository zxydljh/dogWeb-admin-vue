<script setup>
import CurrentDate from '@/components/currentDate/index.vue'

</script>
<script>
export default {
  name: 'OrderView'
}
</script>

<template>
  <div class="view-container">
    <div class="view-name">
      订单管理
      <CurrentDate/>
    </div>
    <el-row>
      <el-col :span="5">
        <el-statistic :value="5">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="red-color view-title">
              待接单
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic title="待派送" :value="2">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="red-color view-title">
              待派送
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic :value="0">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              已完成
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic title="已取消" :value="3">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              已取消
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="4">
        <el-statistic title="全部订单" :value="5">
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
