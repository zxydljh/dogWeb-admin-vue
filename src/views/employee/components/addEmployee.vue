<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { addEmployee, getEmployeeById, updateEmployee } from '@/api/employee'

const route = useRoute()

const form = reactive({
  name: '',
  phone: '',
  idNumber: '',
  sex: '',
  position: '',
  status: false,
  address: '',
  imageUrl: ''
})

const isEditMode = ref(false)

const onSubmit = async () => {
  // console.log(form)
  if (isEditMode.value) {
    // 更新员工信息
    try {
      const response = await updateEmployee(route.params.id, form)
      if (response.data.code === 1) {
        ElMessage.success('员工信息更新成功')
      } else {
        ElMessage.error('更新员工信息失败')
      }
    } catch (error) {
      ElMessage.error('更新员工信息失败，请稍后再试。')
    }
  } else {
    addEmployee(form)
      .then(res => {
        const data = res.data
        if (data.code === 1) {
          ElMessage.success('成功保存信息')
          form.name = ''
          form.phone = ''
          form.idNumber = ''
          form.sex = ''
          form.position = ''
          form.status = false
          form.address = ''
          form.imageUrl = ''
          return true
        } else {
          ElMessage.error('保存信息失败')
          return false
        }
      })
      .catch((err) => {
        console.log('保存失败：' + err)
      })
  }
}

const headers = {
  authToken: localStorage.getItem('authToken')
}

const handleAvatarSuccess = (res, file) => {
  // console.log('res-----')
  // console.log(res)
  // console.log('file-----')
  // console.log(file)
  if (res.code === 1) {
    // 将aliOss的图片地址赋值给form
    form.imageUrl = res.data
  } else {
    ElMessage.error(res.msg)
  }
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

  // console.log(file)
  // 预览用户即将上传的图片
  form.imageUrl = URL.createObjectURL(file)

  return true
}

const uploadImgDel = () => {
  form.imageUrl = ''
}

const reUploadImg = () => {
  form.imageUrl = ''
}

// 获取员工详情并初始化表单数据
const fetchEmployeeDetails = async (id) => {
  try {
    const response = await getEmployeeById(id)
    if (response.data.code === 1) {
      // 将一个或多个源对象的所有可枚举属性复制到目标对象
      Object.assign(form, response.data.data)
      // 根据后端返回的值来设置性别，转换为字符串类型
      form.sex = String(response.data.data.sex)
      form.status = response.data.data.status === 1
      form.imageUrl = response.data.data.avatar
    } else {
      ElMessage.error(response.data.msg)
    }
  } catch (error) {
    ElMessage.error('获取员工详情失败，请稍后再试。')
  }
}

// 当路由参数存在时，获取员工详情
onMounted(() => {
  if (route.params.id) {
    console.log(route.params.id)
    isEditMode.value = true
    fetchEmployeeDetails(route.params.id)
  }
})
</script>
<script>
export default {
  name: 'AddEmployee'
}
</script>

<template>
  <div class="add-commodity">
    <el-form :model="form" label-width="auto" style="max-width: 500px">
      <el-form-item label="员工名称" required>
        <el-input v-model="form.name" placeholder="请输入员工名称"/>
      </el-form-item>
      <el-form-item label="电话" required>
        <el-input v-model="form.phone" placeholder="请输入员工电话"/>
      </el-form-item>
      <el-form-item label="身份证号" required>
        <el-input v-model="form.idNumber" placeholder="请输入员工身份证"/>
      </el-form-item>
      <el-form-item label="性别" required>
        <el-radio-group v-model="form.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="form.position" placeholder="请输入员工职位"/>
      </el-form-item>
      <el-form-item label="账号状态">
        <el-switch v-model="form.status"/>
      </el-form-item>
      <el-form-item label="员工头像" required>
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
            <span class="el-upload-span"
                  @click.stop="uploadImgDel">
                  删除图片
            </span>
            <span class="el-upload-span" @click.stop="reUploadImg"> 重新上传 </span>
        </span>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input
          v-model="form.address"
          style="width: 240px"
          autosize
          type="textarea"
          placeholder="员工家庭住址"
        />
      </el-form-item>
      <el-form-item class="sub-btn">
        <el-button type="primary" @click="onSubmit">保存</el-button>
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

.el-upload-span:hover {
  cursor: pointer;
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
