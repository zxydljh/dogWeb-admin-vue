<script setup>
import { ref } from 'vue'

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>
<script>
export default {
  name: 'OrderView'
}
</script>

<template>
  <div>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="全部订单" name="first">全部订单</el-tab-pane>
      <el-tab-pane label="待接单" name="second">待接单</el-tab-pane>
      <el-tab-pane label="待配送" name="third">待配送</el-tab-pane>
      <el-tab-pane label="配送中" name="fourth">配送中</el-tab-pane>
      <el-tab-pane label="已完成" name="fifth">已完成</el-tab-pane>
      <el-tab-pane label="已取消" name="sixth">已取消</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
<style>
.el-tabs__item:hover {
  color: var(--el-color-warning) !important;
}

.el-tabs__item.is-active {
  color: var(--el-color-warning) !important;
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: var(--main-color-light)
}

.el-tabs__item {
  font-size: 18px;
}
</style>
