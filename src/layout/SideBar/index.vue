<script setup>
import CommonLogo from '@/layout/Logo/index.vue'
import {
  Document,
  Menu as IconMenu,
  User,
  House,
  Sugar,
  Coordinate,
  FirstAidKit

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
        <el-menu-item index="home">
          <el-icon>
            <House/>
          </el-icon>
          <span>数据面板</span>
        </el-menu-item>
        <el-menu-item index="order">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-menu-item index="dog">
          <el-icon>
            <Document/>
          </el-icon>
          <span>宠物狗管理</span>
        </el-menu-item>
        <el-menu-item index="drug">
          <el-icon>
            <FirstAidKit/>
          </el-icon>
          <span>药品管理</span>
        </el-menu-item>
        <el-menu-item index="toy">
          <el-icon>
            <Coordinate/>
          </el-icon>
          <span>玩具管理</span>
        </el-menu-item>
        <el-menu-item index="food">
          <el-icon>
            <Sugar/>
          </el-icon>
          <span>食品管理</span>
        </el-menu-item>
        <el-menu-item index="employee">
          <el-icon>
            <User/>
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
