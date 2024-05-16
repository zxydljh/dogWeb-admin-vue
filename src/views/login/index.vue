<script setup>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

const router = useRouter()

const form = reactive({
  phone: '123456',
  password: 'likl'
})

const store = useStore()

const submitForm = async () => {
  // console.log(form)
  const data = await store.dispatch('user/login', form, { root: true })
  // console.log('login index:' + data)
  if (data === true) {
    ElMessage.success('登录成功')
    await router.push('/home')
  } else {
    ElMessage.error('登录失败')
  }
}

const loginRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 11 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 11 个字符', trigger: 'blur' }
  ]
}

</script>
<script>
export default {
  name: 'LoginView'
}
</script>
<template>
  <div class="login-body-container">
    <div class="login-main-container">
      <el-form :model="form"
               label-width="auto"
               style="max-width: 400px"
               :rules="loginRules"
      >
        <h1>管理员登录</h1>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-body-container {
  width: 100%;
  height: 100%;
  background-color: #5d5858;
  position: relative;
}

.login-main-container {
  background-color: rgba(255, 165, 0);
  padding: 30px 70px;
  width: 450px;
  height: 260px;
  position: fixed;
  justify-content: space-between;
  top: calc(50% - 130px);
  left: calc(50% - 225px);
}

.login-main-container h1 {
  color: #f1f1f1;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.login-button {
  margin: auto;
}

.el-input {
  --el-input-focus-border-color: var(--el-color-warning);
}

.el-button--primary {
  --el-button-bg-color: var(--el-color-warning);
  --el-button-border-color: var(--el-color-warning);
  --el-button-hover-bg-color: var(--el-color-warning-light-3);
  --el-button-hover-border-color: var(--el-color-warning-light-3)
}
</style>
