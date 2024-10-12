<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="editStaff">
    <h1>修改员工</h1>
    <el-form
      ref="ruleFormRef"
      :label-position="labelPosition"
      :model="ruleForm"
      label-width="100px"
      style="max-width: 600px"
    >
      <el-form-item label="员工姓名" required>
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="员工性别">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="员工年龄" required>
        <el-input v-model="ruleForm.age" />
      </el-form-item>

      <el-form-item label="员工薪资" required>
        <el-input v-model="ruleForm.salary" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveUser">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormProps } from 'element-plus'
const labelPosition = ref<FormProps['labelPosition']>('right')
interface RuleForm {
  name: string
  gender: string
  age: string
  salary: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  gender: '1',
  age: '',
  salary: ''
})
const saveUser = () => {
  if (window.opener) {
    const formData = { ...ruleForm }
    window.opener.postMessage(formData, '*')
  }

  Object.keys(ruleForm).forEach((key) => (ruleForm[key] = ''))
}
</script>

<style lang="scss" scoped>
.editStaff {
  padding: 50px 200px;
  background-color: #ffffff;
  height: 100%;
}
</style>
