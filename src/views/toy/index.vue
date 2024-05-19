<script setup>
import '@/styles/commodity.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getToyList, startOrStopToy, deleteToyById } from '@/api/toy'

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
const addToy = () => {
  router.push('/addToy')
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
    name: input.value ? input.value : undefined
  }
  await getToyList(params).then((res) => {
    console.log(res.data)
    if (String(res.data.code) === '1') {
      tableData.value = res.data.data.records
      dataTotal.value = res.data.data.total
    }
  }).catch((error) => {
    ElMessage.error('请求失败' + error)
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
  router.push({ name: 'EditToy', params: { id: row.id } })
}

// 启用/禁用功能
const startOrStop = async (row) => {
  await startOrStopToy(row.id, row.status === 1 ? 0 : 1)
    .then((res) => {
      if (res.data.code === 1) {
        ElMessage.success('操作成功')
        init()
      } else {
        ElMessage.error('操作失败')
      }
    })
    .catch((error) => {
      ElMessage.error('操作失败' + error)
    })
}

// 删除功能
const deleteToy = (row) => {
  deleteToyById(row.id)
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
  name: 'ToyView'
}
</script>
<template>
  <div class="commodity-container">
    <div class="commodity-header">
      玩具名称：
      <el-input v-model="input" style="width: 240px" placeholder="请输入玩具名称" class="commodity-search"/>
      <el-button type="warning" @click="searchHandle">查询</el-button>
      <el-button type="primary" :icon="Plus" @click="addToy">添加</el-button>
    </div>

    <div>
      <el-scrollbar height="470px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="name" label="名称" width="150"/>
          <el-table-column prop="image" label="图片" width="200">
            <template #default="{ row }">
              <el-image style="width: 100px; height: 100px" :src="row.image" />
            </template>
          </el-table-column>
          <el-table-column prop="price" label="售价" width="200"/>
          <el-table-column prop="status" label="售卖状态" width="200">
            <template #default="{ row }">
              {{ row.status === 1 ? '售卖中' : '已下架' }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="最后操作时间" width="200">
            <template #default="{ row }">
              {{ formatDate(row.updateTime) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleEditClick(row)">
                编辑
              </el-button>
              <el-button link
                         type="primary"
                         :class="{ 'is-orange': row.status === 0}"
                         @click="startOrStop(row)"
              >
                {{ row.status === 1 ? '下架' : '上架' }}
              </el-button>
              <el-button link type="danger" @click="deleteToy(row)">删除</el-button>
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

<style scoped>
.is-orange {
  color: orange;
}
</style>
