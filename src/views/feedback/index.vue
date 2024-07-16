<template>
  <div class="commodity-container">
    <div class="commodity-header">
      反馈主题：
      <el-input v-model="input" style="width: 240px" placeholder="请输入反馈主题" class="feedback-search"/>
      <el-button type="warning" @click="searchHandle">查询</el-button>
    </div>

    <div class="commodity-list">
      <el-scrollbar height="470px">
        <el-table :data="tableData" style="width: 100%;height: 100%">
          <el-table-column prop="userName" label="用户名" width="150"/>
          <el-table-column prop="userPhone" label="联系电话" width="200"/>
          <el-table-column prop="feedbackTopic" label="反馈主题" width="200"/>
          <el-table-column prop="feedbackInfo" label="反馈信息" width="300"/>
          <el-table-column prop="date" label="提交时间" width="200">
            <template #default="{ row }">
              {{ formatDate(row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleEditClick(row)">
                编辑
              </el-button>
              <el-button link type="danger" @click="deleteFeedback(row)">删除</el-button>
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
  </div>
</template>

<script setup>
import '@/styles/commodity.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getFeedbackList, deleteFeedbackById } from '@/api/feedback'

const router = useRouter()

const input = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref([])
const dataTotal = ref(0)

const handleSizeChange = (val) => {
  pageSize.value = val
  init()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  init()
}

onMounted(() => {
  init()
})

const searchHandle = () => {
  init()
}

const init = async () => {
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    topic: input.value ? input.value : ''
  }
  await getFeedbackList(params).then((res) => {
    console.log(res.data)
    if (String(res.data.code) === '1') {
      tableData.value = res.data.data.records
      dataTotal.value = res.data.data.total
    }
  }).catch((error) => {
    ElMessage.error(error.message ? error.message : '请求失败')
  })
}

// 格式化时间
const formatDate = (date) => {
  const dateStr = String(date)
  const dateArr = dateStr.split(',')
  return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]} ${dateArr[3]}:${dateArr[4]}:${dateArr[5]}`
}

// 编辑功能
const handleEditClick = (row) => {
  router.push({ name: 'EditFeedback', params: { id: row.id } })
}

// 删除功能
const deleteFeedback = (row) => {
  deleteFeedbackById(row.id)
    .then((res) => {
      if (res.data.code === 1) {
        ElMessage.success('删除成功')
        init()
      } else {
        ElMessage.error('删除失败:' + res.data.msg)
      }
    })
}
</script>

<script>
export default {
  name: 'FeedbackView'
}
</script>

<style scoped>
.is-orange {
  color: orange;
}
</style>
