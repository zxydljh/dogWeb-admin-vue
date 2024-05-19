<script setup>
import SideBar from '@/layout/SideBar/index.vue'
import NavBar from '@/layout/NavBar/index.vue'
import MainArea from '@/layout/Main/index.vue'

</script>
<script>
export default {
  name: 'CommonLayout'
}
</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside width="200px">
        <SideBar/>
      </el-aside>
      <el-container>
        <el-header>
          <NavBar/>
        </el-header>
        <el-main>
          <MainArea/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.common-layout {
  background-color: #eedeb4;
  position: relative;
  height: 100vh;
  width: 100%;
  min-width: 1366px;
  overflow-x: auto;
  overflow-y: hidden !important;
}

.container {
  height: 100%;
}

el-container {
  height: 100% !important;
}

.container .el-aside {
  height: 100% !important;
  overflow: hidden;
}

.el-header{
  background-color: orange;
  --el-header-height: 80px !important;
}

el-main {
  padding: 20px;
}
</style>
