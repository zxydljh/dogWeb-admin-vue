<script setup>
import CommonLogo from '@/layout/Logo/index.vue'
import {
  Document,
  Menu as IconMenu,
  Setting
} from '@element-plus/icons-vue'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<script>
export default {
  name: 'SideBar'
}
</script>
<template>
  <div class="sidebar">
    <CommonLogo/>
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="1">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>数据面板</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon>
            <Document/>
          </el-icon>
          <span>宠物狗管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting/>
          </el-icon>
          <span>药品管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon>
            <setting/>
          </el-icon>
          <span>玩具管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon>
            <setting/>
          </el-icon>
          <span>食品管理</span>
        </el-menu-item>
        <el-menu-item index="7" disabled>
          <el-icon>
            <setting/>
          </el-icon>
          <span>员工管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
}

.el-col-12 {
  max-width: 100%;
  height: 100%;
}

.el-menu {
  height: 100%;
  width: 100%;
}
</style>
