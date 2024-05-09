<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  price: '',
  delivery: false,
  desc: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
<script>
export default {
  name: 'AddCommodity'
}
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="名称">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="form.price"/>
    </el-form-item>

    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery"/>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.desc" type="textarea"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
