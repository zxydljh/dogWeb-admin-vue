<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Back } from '@element-plus/icons-vue'
import { getOrderDetailById } from '@/api/order'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = ref({})

const fetchOrderDetails = async (id) => {
  try {
    const response = await getOrderDetailById(id)
    if (response.data.code === 1) {
      data.value = response.data.data
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('获取订单详情失败，请稍后再试。')
  }
}

// 当路由参数存在时，获取订单详情
onMounted(() => {
  const orderId = route.params.id
  if (orderId) {
    fetchOrderDetails(orderId)
  } else {
    ElMessage.error('订单ID不存在')
  }
})
</script>
<script>
export default {
  name: 'orderDetail'
}
</script>

<template>
  <el-button type="primary" :icon="Back" @click="$router.go(-1)">返回</el-button>
  <el-descriptions
    class="margin-top"
    title="订单详情"
    :column="2"
    border
  >
    <el-descriptions-item label="订单号">{{ data.number }}</el-descriptions-item>
    <el-descriptions-item label="用户名">{{ data.userName }}</el-descriptions-item>
    <el-descriptions-item label="电话">{{ data.phone }}</el-descriptions-item>
    <el-descriptions-item label="订单金额">{{ data.amount }}</el-descriptions-item>
    <el-descriptions-item label="订单状态">
      <el-tag size="small">
        {{ data.status === 1 ? '待支付' : data.status === 2 ? '待接单' : data.status === 3 ? '已接单' : data.status === 4 ? '派送中' : data.status === 5 ? '已完成' : data.status === 6 ? '已取消' : '退款' }}
      </el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="支付方式">{{ data.payMethod }}</el-descriptions-item>
    <el-descriptions-item label="支付状态">
      <el-tag size="small" :type="data.payStatus === 0 ? 'danger' : 'success'">
        {{ data.payStatus === 0 ? '待支付' : '已支付' }}
      </el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="下单时间">{{ data.createTime }}</el-descriptions-item>
    <el-descriptions-item label="收货人">{{ data.consignee }}</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">{{ data.remark }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="地址">{{ data.address }}</el-descriptions-item>
    <el-descriptions-item label="取消原因">{{ data.cancelReason }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
