<script>
export default {
  name: '500View'
}
</script>

<template>
  <el-result title="500" sub-title="请求超时，请联系管理员！稍后再试！">
    <template #icon>
      <el-image
        src="https://dog-dog-website.oss-cn-guangzhou.aliyuncs.com/assets/commonImages/404.png"
      />
    </template>
  </el-result>
</template>

<style scoped>

</style>
