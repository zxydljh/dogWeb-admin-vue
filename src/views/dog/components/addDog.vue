<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const form = reactive({
  name: '',
  price: '',
  delivery: false,
  desc: '',
  dogBreed: ''
})
const imageUrl = ref('')

const onSubmit = () => {
  console.log('submit!')
}

const handleAvatarSuccess = (res, file) => {
  console.log(res)
  console.log(file)
  imageUrl.value = URL.createObjectURL(file.raw)
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
}
</script>
<script>
export default {
  name: 'AddDog'
}
</script>

<template>
  <div class="add-commodity">
    <el-form :model="form" label-width="auto" style="max-width: 500px">
      <el-form-item label="狗狗名称" required>
        <el-input v-model="form.name" placeholder="请输入商品名称"/>
      </el-form-item>
      <el-form-item label="价格" required>
        <el-input v-model="form.price" placeholder="请输入商品价格"/>
      </el-form-item>
      <el-form-item label="品种" required>
        <el-input v-model="form.dogBreed" placeholder="请输入品种"/>
      </el-form-item>
      <el-form-item label="商品图片" required>
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="售卖状态">
        <el-switch v-model="form.delivery"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" type="textarea"/>
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
