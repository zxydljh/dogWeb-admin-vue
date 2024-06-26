<script setup>
import '@/styles/commodity.css'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { getEmployeeList, startOrDisableEmployee } from '@/api/employee'
import { ElMessage } from 'element-plus'

const router = useRouter()

const input = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const dataTotal = ref(0)
const tableData = ref([])

const handleClick = (row) => {
  router.push({ name: 'EditEmployee', params: { id: row.id } })
}
const handleSizeChange = (val) => {
  pageSize.value = val
  init()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  init()
}
const addEmployee = () => {
  router.push('/addEmployee')
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
  await getEmployeeList(params).then((res) => {
    // console.log(res.data)
    if (String(res.data.code) === '1') {
      tableData.value = res.data.data.records
      dataTotal.value = res.data.data.total
    }
  }).catch((error) => {
    ElMessage.error('请求失败' + error)
  })
}

// 将返回的数据2024,5,18,16,23,20 转换为2024-5-18 16:23:20
const formatDate = (date) => {
  const dateStr = String(date)
  // 将，换成-
  const dateArr = dateStr.split(',')
  return `${dateArr[0]}-${dateArr[1]}-${dateArr[2]} ${dateArr[3]}:${dateArr[4]}:${dateArr[5]}`
}

const startOrDisable = (row) => {
  startOrDisableEmployee(row.id, row.status === 1 ? 0 : 1)
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
</script>
<script>
export default {
  name: 'EmployeeView'
}
</script>
<template>
  <div class="commodity-container">
    <div class="commodity-header">
      员工姓名：
      <el-input v-model="input" style="width: 240px" placeholder="请输入员工姓名" class="commodity-search"/>
      <el-button type="warning" @click="searchHandle">查询</el-button>
      <el-button type="primary" :icon="Plus" @click="addEmployee">添加</el-button>
    </div>

    <div class="commodity-list">
      <el-scrollbar height="470px">
        <el-table :data="tableData" style="width: 100%;height: 100%">
          <el-table-column fixed prop="name" label="员工姓名" width="150"/>
          <el-table-column prop="avatar" label="图片" width="200">
            <template #default="{ row }">
              <el-image style="width: 100px; height: 100px" :src="row.avatar" :fit="fit"/>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="200"/>
          <el-table-column prop="position" label="职位" width="150"/>
          <el-table-column prop="sex" label="性别" width="150">
            <template #default="{ row }">
              {{ row.sex === 1 ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="最后操作时间" width="200">
            <template #default="{ row }">
              {{ formatDate(row.updateTime) }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="{ row }">
              <el-button link
                         type="primary"
                         size="small"
                         @click="handleClick(row)"
                         :disabled="row.name === 'admin'"
              >
                编辑
              </el-button>
              <el-button link
                         type="danger"
                         size="small"
                         :disabled="row.name === 'admin'"
                         :class="{ 'is-orange': row.status === 0 }"
                         @click="startOrDisable(row)"
              >
                {{ row.status === 1 ? '禁用' : '启用' }}
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
        :small="small"
        :disabled="disabled"
        :background="background"
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
