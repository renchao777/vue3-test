<template>
  <div class="elementDrag">
    <h1>课程表</h1>
    <div class="elementDrag-con">
      <!-- 左侧科目列表 -->
      <ul class="sidebar">
        <li
          v-for="subject in subjects"
          :key="subject.name"
          class="sidebar-subjects"
          :style="{ backgroundColor: subject.color }"
          draggable="true"
          @dragstart="(event) => onDragStart(event, subject)"
        >
          {{ subject.name }}
        </li>
      </ul>

      <!-- 右侧课程表 -->
      <div class="schedule">
        <p class="morning">上午</p>
        <el-table :data="tableData" border :header-cell-style="headerCellStyle">
          <!-- 循环生成列 -->
          <el-table-column v-for="(day, index) in days" :key="index" :label="day" width="120">
            <template v-slot="{ row, $index }">
              <div
                class="txcenter"
                :style="getCellStyle(row[day])"
                @dragover.prevent="onDragOver"
                @dragleave="onDragLeave"
                @drop="(event) => onDrop(event, day, $index)"
              >
                {{ row[day] || '&nbsp;' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const headerCellStyle = () => {
  return {
    backgroundColor: '#E4E7ED', // 设置表头背景色
    textAlign: 'center', // 设置文本居中
    color: '#333' // 设置文字颜色
  }
}

// 定义科目列表和背景颜色
const subjects = reactive([
  { name: '语文', color: '#F8D7DA' },
  { name: '数学', color: '#D4EDDA' },
  { name: '英语', color: '#D1ECF1' },
  { name: '音乐', color: '#FFF3CD' },
  { name: '政治', color: '#C3E6CB' },
  { name: '历史', color: '#E2E3E5' }
])

// 定义一周的日期
const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

// 初始化表格数据
const tableData = reactive([
  { 星期一: '', 星期二: '', 星期三: '', 星期四: '', 星期五: '', 星期六: '', 星期日: '' },
  { 星期一: '', 星期二: '', 星期三: '', 星期四: '', 星期五: '', 星期六: '', 星期日: '' },
  { 星期一: '', 星期二: '', 星期三: '', 星期四: '', 星期五: '', 星期六: '', 星期日: '' },
  { 星期一: '', 星期二: '', 星期三: '', 星期四: '', 星期五: '', 星期六: '', 星期日: '' }
])

// 定义获取单元格样式的方法，针对不同的课程显示不同的样式
const getCellStyle = (subject) => {
  const subjectStyles = {
    语文: { background: '#F8D7DA' },
    英语: { background: '#D1ECF1' },
    音乐: { background: '#FFF3CD' },
    政治: { background: '#C3E6CB' },
    历史: { background: '#E2E3E5' }
  }
  return subjectStyles[subject] || { background: 'white', textAlign: 'center' }
}

// 拖拽开始事件，将科目信息存入拖拽数据
const onDragStart = (event, subject) => {
  event.dataTransfer.setData('subject', subject.name)
}

// 拖拽进入单元格时添加视觉提示
const onDragOver = (event) => {
  event.currentTarget.style.border = '2px dashed #000'
  event.currentTarget.style.backgroundColor = '#f0f0f0'
}

// 拖拽离开单元格时清除视觉提示
const onDragLeave = (event) => {
  event.currentTarget.style.removeProperty('border')
  event.currentTarget.style.removeProperty('backgroundColor')
}

// 拖拽放下事件，更新表格数据
const onDrop = (event, day, rowIndex) => {
  const subjectName = event.dataTransfer.getData('subject')

  // 如果单元格已有课程，询问是否覆盖
  if (tableData[rowIndex][day]) {
    if (!confirm(`已存在课程 ${tableData[rowIndex][day]}，是否替换为 ${subjectName}？`)) {
      return
    }
  }

  // 更新单元格中的课程内容
  tableData[rowIndex][day] = subjectName

  // 清除单元格的边框样式
  event.currentTarget.style.removeProperty('border')
  event.currentTarget.style.removeProperty('backgroundColor')
}
</script>

<style lang="scss" scoped>
.elementDrag {
  h1 {
    text-align: center;
  }
  .txcenter {
    text-align: center;
  }
  &-con {
    display: flex;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    &-subjects {
      width: 80px;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      border-radius: 5px;
      margin-bottom: 10px;
      user-select: none;
    }
  }
  .schedule {
    display: flex;
    align-items: stretch;
    width: 100%;
    min-height: 300px;
    .morning {
      background-color: #e4e7ed;
      border: 1px solid #cdd0d6;
      margin-top: 65px;
      height: 252px;
      padding: 0 8px;
      writing-mode: vertical-rl;
      text-align: center;
      letter-spacing: 20px;
    }

    .el-table td,
    .el-table th {
      vertical-align: middle;
      min-height: 50px;
      height: 50px;
    }
  }
}

// 全局样式修改，调整表格单元格间距
:deep(.el-table .el-table__cell) {
  padding: 20px 0;
}
</style>

<!-- 要点总结 -->

<!-- 1.在科目列表的每个 <li> 元素上设置 draggable="true"，使其可被拖拽

2.拖拽开始 使用 @dragstart 事件监听，当开始拖拽时，
调用 onDragStart 方法，将被拖拽科目的名称存储到 dataTransfer 对象中 -->

<!-- const onDragStart = (event, subject) => {
    event.dataTransfer.setData('subject', subject.name)
  } -->

<!-- 3. 课程表单元格设置 -->
<!--在课程表的每个单元格中添加拖拽事件监听，允许用户将科目放入相应的单元格 -->
<!-- 拖拽进入使用 @dragover.prevent 事件监听，防止默认行为并提供视觉反馈
（如更改边框和背景色），调用 onDragOver 方法。 -->
<!-- 
const onDragOver = (event) => {
    event.currentTarget.style.border = '2px dashed #000'
    event.currentTarget.style.backgroundColor = '#f0f0f0'
  } -->
<!-- 拖拽离开使用 @dragleave 事件监听，调用 onDragLeave 方法清除视觉提示 -->

<!-- const onDragLeave = (event) => {
    event.currentTarget.style.removeProperty('border')
    event.currentTarget.style.removeProperty('backgroundColor')
  } -->

<!-- 拖拽放下使用 @drop 事件监听，调用 onDrop 方法。当用户放下拖拽的科目时：
从 dataTransfer 对象获取科目名称。
检查目标单元格是否已存在课程，如果存在，则询问用户是否覆盖。
如果用户确认，则更新单元格内容。 -->
<!-- const onDrop = (event, day, rowIndex) => {
    const subjectName = event.dataTransfer.getData('subject')
    // 检查并更新单元格内容 // 更新单元格中的课程内容
    tableData[rowIndex][day] = subjectName
  } -->
