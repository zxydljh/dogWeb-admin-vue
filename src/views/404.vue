<script>
export default {
  name: '404View'
}
</script>

<template>
  <el-result title="404" sub-title="您访问的地址出错了，或者不存在。">
    <template #icon>
      <el-image
        src="https://dog-dog-website.oss-cn-guangzhou.aliyuncs.com/assets/commonImages/404.png"
      />
    </template>
    <template #extra>
      <el-button type="warning" @click="() => $router.back()">返回</el-button>
    </template>
  </el-result>
</template>

<style scoped>

</style>
