<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage, ElDialog } from 'element-plus'
import { publishAnnouncement, getAnnouncementList } from '@/api/announcement'

const title = ref('')
const content = ref('')
const dialogVisible = ref(false) // 控制弹出框的可见性
const announcementList = ref([]) // 用于存储已发布的公告记录
const loading = ref(false)

const openDialog = () => {
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
  resetForm()
}

const publishHandle = async () => {
  if (!title.value || !content.value) {
    ElMessage.error('标题和内容不能为空')
    return
  }

  const params = {
    employeeId: localStorage.getItem('id'),
    title: title.value,
    content: content.value
  }

  await publishAnnouncement(params).then((res) => {
    if (res.data.code === 1) {
      ElMessage.success('公告发布成功')
      closeDialog() // 发布成功后关闭弹出框
      fetchAnnouncements() // 重新获取公告记录
    } else {
      ElMessage.error('公告发布失败')
    }
  }).catch((error) => {
    ElMessage.error('请求失败' + error)
  })
}

const resetForm = () => {
  title.value = ''
  content.value = ''
}

// 获取已发布的公告记录
const fetchAnnouncements = async () => {
  loading.value = true
  await getAnnouncementList().then((res) => {
    if (res.data.code === 1) {
      announcementList.value = res.data.data
    }
    loading.value = false
  }).catch((error) => {
    ElMessage.error('获取公告记录失败' + error)
    loading.value = false
  })
}

// 格式化时间
const formatTime = (timeArr) => {
  return `${timeArr[0]}-${timeArr[1]}-${timeArr[2]} ${timeArr[3]}:${timeArr[4]}:${timeArr[5]}`
}

onMounted(() => {
  fetchAnnouncements() // 初始化加载公告记录
})
</script>

<script>
export default {
  name: 'AnnouncementView'
}
</script>

<template>
  <div class="announcement-container">
    <div class="announcement-header">
      <el-button type="primary" @click="openDialog">发布公告</el-button>
    </div>

    <!-- 公告记录展示 -->
    <div class="announcement-list">
      <el-table :data="announcementList" v-loading="loading">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="createdAt" label="发布时间">
          <template #default="scope">
            {{ formatTime(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="employeeId" label="发布人" />
      </el-table>
    </div>

    <!-- 发布公告的弹出框 -->
    <el-dialog title="发布公告" v-model="dialogVisible" width="600px" :before-close="closeDialog">
      <div class="announcement-form">
        <el-input v-model="title" placeholder="请输入公告标题" style="width: 100%; margin-bottom: 20px" />
        <el-input type="textarea" v-model="content" placeholder="请输入公告内容" style="width: 100%; margin-bottom: 20px" />
      </div>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="publishHandle">发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.announcement-container {
  padding: 20px;
}

.announcement-header {
  margin-bottom: 20px;
}

.announcement-list {
  margin-top: 20px;
}

.announcement-form {
  width: 100%;
}

.dialog-footer {
  text-align: right;
}
</style>
