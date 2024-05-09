<script setup>
import { reactive, ref } from 'vue'
const dialogFormVisible = ref(false)

const formLabelWidth = '140px'

const form = reactive({
  originalPassword: '',
  newPassword: '',
  confirmPassword: ''
})

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
           管理员<el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="SwitchButton">
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
          <el-button type="warning" @click="dialogFormVisible = false">
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
</style>
