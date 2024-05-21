<script setup>
import { ref } from 'vue'
import {
  getOrderList,
  acceptOrderById,
  deliverOrderById,
  refundOrderById,
  cancelOrderById,
  completeOrderById
} from '@/api/order'
import { ElMessage } from 'element-plus'
import router from '@/router'

const name = ref('')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref([])
const dataTotal = ref(0)
const activeName = ref('first')
const currentStatus = ref('')

const handleSizeChange = (val) => {
  pageSize.value = val
  fetchOrders()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchOrders()
}

// 根据状态获取订单
const fetchOrders = async () => {
  // console.log('currentStatus: ' + currentStatus.value)
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    status: currentStatus.value,
    name: name.value ? name.value : '',
    startDate: startDate.value ? startDate.value : '',
    endDate: endDate.value ? endDate.value : ''
  }
  // console.log(params)
  await getOrderList(params)
    .then(res => {
      if (res.data.code === 1) {
        tableData.value = res.data.data.records
        dataTotal.value = res.data.data.total
      } else {
        ElMessage.error(res.data.msg)
      }
    })
    .catch(err => {
      ElMessage.error(err.message)
    })
}

// 处理标签点击事件 订单状态 1待付款 2待接单 3已接单 4派送中 5已完成 6已取消 7退款
const handleClick = (tab, event) => {
  // console.log(tab, event)
  // console.log('tab.props.name: ' + tab.props.name)
  let status
  switch (tab.props.name) {
    case 'first':
      status = '' // 获取所有订单
      break
    case 'second':
      status = 2 // 待接单
      break
    case 'third':
      status = 3 // 待配送
      break
    case 'fourth':
      status = 4 // 配送中
      break
    case 'fifth':
      status = 5 // 已完成
      break
    case 'sixth':
      status = 6 // 已取消
      break
    default:
      status = ''
  }
  currentStatus.value = status
  currentPage.value = 1 // 重置为第一页
  fetchOrders()
}

// 初始化获取所有订单
fetchOrders()

const formatDate = (date) => {
  const dateStr = String(date)
  const dateArr = dateStr.split(',')
  return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]} ${dateArr[3]}:${dateArr[4]}:${dateArr[5]}`
}

const searchHandle = () => {
  fetchOrders()
}

const shortcuts = [
  {
    text: '今天',
    value: new Date()
  },
  {
    text: '昨天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: '一周前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]

const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

const handleOrder = (row) => {
  // 根据订单状态执行相应操作 订单状态 1待付款 2待接单 3已接单 4派送中 5已完成 6已取消 7退款
  switch (row.status) {
    case 1:
      // 取消订单
      cancelOrder(row)
      break
    case 2:
      // 接单
      acceptOrder(row)
      break
    case 3:
      // 派送
      deliverOrder(row)
      break
    case 4:
      // 完成订单
      completeOrder(row)
      break
    case 5:
      // 取消
      cancelOrder(row)
      break
    case 6:
      // 退款
      refundOrder(row)
      break
    default:
      break
  }
}

const cancelOrder = async (order) => {
  try {
    const response = await cancelOrderById(order.id) // 调用API取消订单
    if (response.data.code === 1) {
      ElMessage.success('订单取消成功')
      fetchOrders()
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('订单取消失败')
  }
}

const acceptOrder = async (order) => {
  try {
    const response = await acceptOrderById(order.id) // 调用API接单
    if (response.data.code === 1) {
      ElMessage.success('订单接单成功')
      fetchOrders()
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('订单接单失败')
  }
}

const deliverOrder = async (order) => {
  try {
    const response = await deliverOrderById(order.id) // 调用API派送
    if (response.data.code === 1) {
      ElMessage.success('订单派送成功')
      fetchOrders()
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('订单派送失败')
  }
}

const completeOrder = async (order) => {
  try {
    const response = await completeOrderById(order.id) // 调用API完成订单
    if (response.data.code === 1) {
      ElMessage.success('订单完成成功')
      fetchOrders()
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('订单完成失败')
  }
}

const refundOrder = async (order) => {
  try {
    const response = await refundOrderById(order.id) // 调用API退款
    if (response.data.code === 1) {
      ElMessage.success('订单退款成功')
      fetchOrders()
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('订单退款失败')
  }
}

const orderDetail = (row) => {
  // 处理订单详情
  // console.log('订单详情', row)
  router.push({ name: 'OrderDetail', params: { id: row.id } })
}

const cancel = (row) => {
  // 处理取消订单
  console.log('取消订单', row)
  cancelOrder(row)
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
      <el-tab-pane label="全部订单" name="first">
        <div class="commodity-header">
          <span>
            开始日期：
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="选择开始日期"
              :disabled-date="disabledDate"
              :shortcuts="shortcuts"
            />
          </span>
          <span>
            结束日期：
            <el-date-picker
              v-model="endDate"
              type="date"
              placeholder="选择结束日期"
              :disabled-date="disabledDate"
              :shortcuts="shortcuts"
            />
          </span>
          <span>
            用户名：
            <el-input v-model="name" style="width: 240px" placeholder="请输入" class="commodity-search"/>
          </span>
          <el-button type="warning" @click="searchHandle">查询</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="second"/>
      <el-tab-pane label="待配送" name="third"/>
      <el-tab-pane label="配送中" name="fourth"/>
      <el-tab-pane label="已完成" name="fifth"/>
      <el-tab-pane label="已取消" name="sixth"/>
    </el-tabs>

    <el-scrollbar height="456px">
      <el-table :data="tableData">
        <el-table-column prop="number" label="订单号" fixed width="150"/>
        <el-table-column prop="userName" label="用户名" width="150"/>
        <el-table-column prop="consignee" label="收货人" width="150"/>
        <el-table-column prop="amount" label="金额" width="150"/>
        <el-table-column prop="status" label="状态" width="150">
          <template #default="{ row }">
            {{ row.status === 1 ? '待付款' :
            row.status === 2 ? '待接单' :
              row.status === 3 ? '待配送' :
                row.status === 4 ? '配送中' :
                  row.status === 5 ? '已完成' :
                    row.status === 6 ? '已取消' : '退款' }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150">
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="收货地址" width="200"/>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="{ row }">
            <el-button link
                       type="primary"
                       :class="{ 'is-orange': row.status === 0}"
                       @click="handleOrder(row)"
            >
              {{ row.status === 1 ? '取消订单' :
              row.status === 2 ? '接单' :
                row.status === 3 ? '派送' :
                  row.status === 4 ? '完成' :
                    row.status === 5 ? '取消' :
                      row.status === 6 ? '退款' : '退款' }}
            </el-button>
            <el-button link type="primary" @click="orderDetail(row)">
              订单详情
            </el-button>
            <el-button link type="danger" @click="cancel(row)">
              取消订单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-pagination
      class="paging"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="sizes, prev, pager, next, total"
      :total="dataTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.commodity-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.commodity-header > span {
  margin-right: 32px;
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
