<script setup>
import { getGoodsStatisticsData } from '@/api/data'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const goodsData = reactive({
  dogStart: 0,
  dogStop: 0,
  drugStart: 0,
  drugStop: 0,
  foodStart: 0,
  foodStop: 0,
  toyStart: 0,
  toyStop: 0
})

getGoodsStatisticsData()
  .then(res => {
    const { data } = res
    // console.log(data)
    if (data.code === 1) {
      goodsData.dogStart = data.data.dogStartCommunity
      goodsData.dogStop = data.data.dogStopCommunity
      goodsData.drugStart = data.data.drugStartCommunity
      goodsData.drugStop = data.data.drugStopCommunity
      goodsData.foodStart = data.data.foodStartCommunity
      goodsData.foodStop = data.data.foodStopCommunity
      goodsData.toyStart = data.data.toyStartCommunity
      goodsData.toyStop = data.data.toyStopCommunity
    } else {
      ElMessage.error(data.msg ? data.msg : '商品统计信息获取失败！')
    }
  })
  .catch(() => {
    ElMessage.error('商品统计信息获取失败！')
  })
</script>
<script>
export default {
  name: 'GoodsView'
}
</script>

<template>
  <div class="small-view-container">
    <div class="view-data-container">
      <div class="view-name">
        小狗总览
      </div>
      <div class="data-box">
        <div class="view-data">
          <span>起售</span>
          <span>{{ goodsData.dogStart }}</span>
        </div>
        <div class="view-data">
          <span>停售</span>
          <span>{{ goodsData.dogStop }}</span>
        </div>
      </div>
    </div>
    <div class="view-data-container">
      <div class="view-name">
        药品总览
      </div>
      <div class="data-box">
        <div class="view-data">
          <span>起售</span>
          <span>{{ goodsData.drugStart }}</span>
        </div>
        <div class="view-data">
          <span>停售</span>
          <span>{{ goodsData.drugStop }}</span>
        </div>
      </div>
    </div>
    <div class="view-data-container">
      <div class="view-name">
        食物总览
      </div>
      <div class="data-box">
        <div class="view-data">
          <span>起售</span>
          <span>{{ goodsData.foodStart }}</span>
        </div>
        <div class="view-data">
          <span>停售</span>
          <span>{{ goodsData.foodStop }}</span>
        </div>
      </div>
    </div>
    <div class="view-data-container">
      <div class="view-name">
        玩具总览
      </div>
      <div class="data-box">
        <div class="view-data">
          <span>起售</span>
          <span>{{ goodsData.toyStart }}</span>
        </div>
        <div class="view-data">
          <span>停售</span>
          <span>{{ goodsData.toyStop }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.small-view-container {
  width: 100%;
  margin-bottom: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.view-data-container {
  font-size: 18px;
  color: #606266;
  width: 248px;
  height: 120px;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
}

.data-box {
  display: flex;
  flex-direction: row;
}

.view-data {
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  margin-bottom: 18px;
  align-items: center;
}

.view-data span {
  margin-bottom: 4px;
}
</style>
