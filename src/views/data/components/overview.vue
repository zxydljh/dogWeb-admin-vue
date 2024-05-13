<script setup>
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { ChatLineRound } from '@element-plus/icons-vue'
import CurrentDate from '@/components/currentDate/index.vue'

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500
})
source.value = 68
</script>
<script>
export default {
  name: 'OverView'
}
</script>

<template>
  <div class="view-container">
    <div class="view-name">
      今日数据
      <CurrentDate/>
    </div>
    <el-row>
      <el-col :span="5">
        <el-statistic :value="268500">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              营业额
            </div>
          </template>
          <template #prefix>￥</template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic :value="2500">
          <template #title>
            <div style=" display: inline-flex; align-items: center" class="view-title">
              有效订单
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic :value="outputValue">
          <template #title>
            <div style="display: inline-flex; align-items: center" class="view-title">
              订单完成率(%)
            </div>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="5">
        <el-statistic :value="138">
          <template #title>
            <div style="display: inline-flex; align-items: center" class="view-title">
              男女比例
            </div>
          </template>
          <template #suffix>/100</template>
        </el-statistic>
      </el-col>
      <el-col :span="4">
        <el-statistic :value="562">
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
