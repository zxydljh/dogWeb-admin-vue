<script setup>
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Back } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { getOrderDetailById } from '@/api/order'

const route = useRoute()

const form = reactive({
  name: '',
  price: '',
  status: false,
  description: '',
  imageUrl: '',
  blood: ''
})

const fetchDogDetails = async (id) => {
  try {
    const response = await getOrderDetailById(id)
    if (response.data.code === 1) {
      // 将一个或多个源对象的所有可枚举属性复制到目标对象
      Object.assign(form, response.data.data)
      form.status = response.data.data.status === 1
      form.imageUrl = response.data.data.image
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('获取食品详情失败，请稍后再试。')
  }
}

// 当路由参数存在时，获取宠物狗详情
onMounted(() => {
  fetchDogDetails(route.params.id)
})
</script>
<script>
export default {
  name: 'orderDetail'
}
</script>

<template>
  <el-button type="primary" :icon="Back" @click="$router.go(-1)">返回</el-button>
  <div class="add-commodity">
    <el-form :model="form" label-width="auto" style="max-width: 500px">
      <el-form-item label="狗狗名称" required>
        <el-input v-model="form.name" placeholder="请输入商品名称"/>
      </el-form-item>
      <el-form-item label="价格" required>
        <el-input v-model="form.price" placeholder="请输入商品价格"/>
      </el-form-item>
      <el-form-item label="血统" required>
        <el-input v-model="form.blood" placeholder="请输入血统"/>
      </el-form-item>
      <el-form-item label="售卖状态">
        <el-switch v-model="form.status"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" type="textarea"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.add-commodity {
  width: 600px;
  margin: auto;
}
</style>
