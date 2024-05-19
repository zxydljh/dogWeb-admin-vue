<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { addDrug, updateDrug, getDrugById } from '@/api/drug'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()

const form = reactive({
  name: '',
  price: '',
  status: false,
  description: '',
  imageUrl: ''
})

const isEditMode = ref(false)

const fetchDrugDetails = async (id) => {
  try {
    const response = await getDrugById(id)
    if (response.data.code === 1) {
      // 将一个或多个源对象的所有可枚举属性复制到目标对象
      Object.assign(form, response.data.data)
      form.status = response.data.data.status === 1
      form.imageUrl = response.data.data.image
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('获取药品详情失败，请稍后再试。')
  }
}

// 当路由参数存在时，获取员工详情
onMounted(() => {
  if (route.params.id) {
    console.log(route.params.id)
    isEditMode.value = true
    fetchDrugDetails(route.params.id)
  }
})

const onSubmit = () => {
  if (isEditMode.value) {
    // 更新药品数据
    updateDrug(route.params.id, form)
      .then((res) => {
        if (res.data.code === 1) {
          ElMessage.success('更新成功')
          router.back()
        }
      })
      .catch(() => {
        ElMessage.error('更新失败，请稍后再试。')
      })
  } else {
    // 添加药品数据
    addDrug(form)
      .then((res) => {
        console.log(res)
        ElMessage.success('添加成功')
        form.name = ''
        form.price = ''
        form.description = ''
        form.imageUrl = ''
        form.status = false
      })
      .catch(() => {
        ElMessage.error('添加失败，请稍后再试。')
      })
  }
}

const handleAvatarSuccess = (res, file) => {
  form.imageUrl = res.data
}

const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('上传头像图片只能是 JPG、PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
    return false
  }

  // 预览(本地)图片
  form.imageUrl = URL.createObjectURL(file)
}

const uploadImgDel = () => {
  form.imageUrl = ''
}

const reUploadImg = () => {
  form.imageUrl = ''
}

const headers = {
  authToken: localStorage.getItem('authToken')
}
</script>
<script>
export default {
  name: 'AddDrug'
}
</script>

<template>
  <div class="add-commodity">
    <el-form :model="form" label-width="auto" style="max-width: 500px">
      <el-form-item label="药品名称" required>
        <el-input v-model="form.name" placeholder="请输入商品名称"/>
      </el-form-item>
      <el-form-item label="价格" required>
        <el-input v-model="form.price" placeholder="请输入商品价格"/>
      </el-form-item>

      <el-form-item label="商品图片" required>
        <el-upload
          class="avatar-uploader"
          action="/api/admin/common/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
        <span v-if="form.imageUrl"
              class="el-image-operation">
            <!-- 阻止冒泡 -->
            <span class="el-upload-span"
                  @click.stop="uploadImgDel">
                  删除图片
            </span>
            <span class="el-upload-span" @click.stop="reUploadImg"> 重新上传 </span>
        </span>
      </el-form-item>

      <el-form-item label="售卖状态">
        <el-switch v-model="form.status"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" type="textarea"/>
      </el-form-item>
      <el-form-item class="sub-btn">
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="() => $router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.add-commodity {
  width: 600px;
  margin: auto;
}

.sub-btn {
  width: 150px;
  margin: auto;
}

.el-image-operation {
  color: white;
}

.el-upload-span {
  margin-left: 20px;
  background-color: var(--main-color);
  border-radius: 4px;
  padding: 5px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  background-color: #fff;
}
</style>
