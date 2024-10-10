<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="communications">
    <div class="communications-header">
      <el-button type="primary" @click="openNewWindow">新增</el-button>
    </div>
    <el-table :data="state.tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="员工姓名" width="180" />
      <el-table-column prop="gender" label="性别" width="180" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="salary" label="月薪" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small"> 编辑 </el-button>
          <el-button link type="danger" size="small"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  name: string
  gender: string
  age: string
  salary: string
}

const router = useRouter()
const state = reactive({
  tableData: [
    { gender: '男', name: 'bb', age: '18', salary: '36' },
    { gender: '男', name: 'Tom1', age: '17', salary: '60' },
    { gender: '男', name: 'Tom2', age: '16', salary: '30' }
  ]
})

let listener: (event: MessageEvent) => void

const openNewWindow = () => {
  const url = router.resolve({ path: '/editStaff' }).href
  window.open(url, '_blank')
}

const addMessageListener = () => {
  listener = (event: MessageEvent) => {
    const newUser: User = event.data
    if (newUser.name && newUser.gender && newUser.age && newUser.salary) {
      state.tableData.push(newUser)
    }
  }
  window.addEventListener('message', listener)
}

onMounted(() => {
  addMessageListener()
})

onUnmounted(() => {
  if (listener) {
    window.removeEventListener('message', listener)
  }
})
</script>
<style lang="scss" scoped>
.communications {
  padding: 20px;
  background-color: #ffffff;
  height: 100%;
  &-header {
    text-align: right;
  }
}
</style>
