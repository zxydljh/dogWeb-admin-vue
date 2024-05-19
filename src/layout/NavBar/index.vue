<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'
import { SwitchButton, Setting, ArrowDown } from '@element-plus/icons-vue'

const store = useStore()

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const user = computed(() => store.state.user)

const form = reactive({
  originalPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const logout = async () => {
  await store.dispatch('user/logout')
  router.push({ name: 'Login' })
}

const updatePassword = async () => {
  await store.dispatch('user/updatePassword', form)
  closeDialog()
}

// 关闭对话框
const closeDialog = () => {
  dialogFormVisible.value = false
}
</script>
<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <div class="userList">
    <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user-avatar" :src="user.avatar" />
           {{ user.name }}
          <el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="SwitchButton" @click="logout">
            退出登录
          </el-dropdown-item>
          <el-dropdown-item :icon="Setting"  @click="dialogFormVisible = true">
            修改密码
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dialog v-model="dialogFormVisible" title="修改密码" width="500">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input v-model="form.originalPassword" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.confirmPassword" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="warning" @click="updatePassword">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.userList {
  float: right;
}

.userList:hover {
  cursor: default;
}

.userList .el-dropdown-link:focus {
  /*取消点击产生的外边框*/
  outline: none;
}

.el-dropdown {
  margin-top: 25px;
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
