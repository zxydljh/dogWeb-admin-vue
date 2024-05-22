<script setup>
import OverView from '@/views/data/components/overview.vue'
import OrderView from '@/views/data/components/orderview.vue'
import OrderList from '@/views/data/components/orderList.vue'
import GoodsView from '@/views/data/components/goodsview.vue'
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
    <GoodsView/>

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
  background-color: #f1f1f1;
}

.view-name {
  font-size: 26px;
  margin-bottom: 20px;
}

.view-title {
  font-size: 18px;
}
</style>
