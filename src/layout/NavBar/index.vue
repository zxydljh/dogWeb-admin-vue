<script setup>
import {
  ArrowDown,
  SwitchButton,
  Setting
} from '@element-plus/icons-vue'
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
          <el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
          <el-dropdown-item :icon="Setting">
            修改密码
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
