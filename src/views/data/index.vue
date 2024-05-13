<script setup>
import OverView from '@/views/data/components/overview.vue'
import OrderView from '@/views/data/components/orderview.vue'
import DogDataView from '@/views/data/components/dogview.vue'
import DrugDataView from '@/views/data/components/drugview.vue'
import FoodDataView from '@/views/data/components/foodview.vue'
import ToyDataView from '@/views/data/components/toyview.vue'
import OrderList from '@/views/data/components/orderList.vue'
</script>
<script>
export default {
  name: 'DataView'
}
</script>
<template>
  <div class="data-view-container">
    <OverView/>
    <OrderView/>

    <!--  商品数据总览  -->
    <div class="commodity-view-container">
      <DogDataView/>
      <DrugDataView/>
      <FoodDataView/>
      <ToyDataView/>
    </div>

    <!--  订单列表  -->
    <OrderList/>
  </div>
</template>

<style>
.data-view-container {
  margin-top: 30px;
  margin-left: 30px;
}

.el-col {
  text-align: center;
  margin: 20px 0;
}

.view-container {
  margin-bottom: 60px;
  width: 1100px;
  background-color: #f1f1f1;
}

.view-name {
  font-size: 26px;
  margin-bottom: 20px;
}

.view-title {
  font-size: 18px;
}

.commodity-view-container {
  width: 1100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
