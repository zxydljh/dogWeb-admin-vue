<script setup>
import '@/styles/commodity.css'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'

const router = useRouter()

const input = ref('')

const currentPage2 = ref(1)
const pageSize2 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const tableData = [
  {
    name: 'Tom',
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    price: 'California',
    status: 'Los Angeles',
    date: '2016-05-03'
  },
  {
    name: 'Tom',
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    price: 'California',
    status: 'Los Angeles',
    date: '2016-05-03'
  },
  {
    name: 'Tom',
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    price: 'California',
    status: 'Los Angeles',
    date: '2016-05-03'
  },
  {
    name: 'Tom',
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    price: 'California',
    status: 'Los Angeles',
    date: '2016-05-03'
  }
]

const handleClick = () => {
  console.log('click')
}
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
const addEmployee = () => {
  router.push('/addEmployee')
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
      <el-button type="warning">查询</el-button>
      <el-button type="primary" :icon="Plus" @click="addEmployee">添加</el-button>
    </div>

    <div class="commodity-list">
      <el-scrollbar height="470px">
        <el-table :data="tableData" style="width: 100%;height: 100%">
          <el-table-column fixed prop="name" label="员工姓名" width="150"/>
          <el-table-column prop="img" label="图片" width="200">
            <el-image style="width: 100px; height: 100px" :src="tableData[0].img" :fit="fit"/>
          </el-table-column>
          <el-table-column prop="price" label="职位" width="150"/>
          <el-table-column prop="price" label="年龄" width="150"/>
          <el-table-column prop="status" label="性别" width="150"/>
          <el-table-column prop="date" label="最后操作时间" width="200"/>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick">
                编辑
              </el-button>
              <el-button link type="primary" size="small">修改</el-button>
              <el-button link type="danger" size="small">启用</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>

      <el-pagination
        class="paging"
        v-model:current-page="currentPage2"
        v-model:page-size="pageSize2"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next, total"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
