<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="latest-news">
    <div class="header">
      <div>
        <span># 云效最新动态</span>
        <el-divider direction="vertical" />
        <el-link class="view-more" type="primary">查看更多</el-link>
      </div>
      <el-icon><Close /></el-icon>
    </div>
    <div class="news-item-con">
      <div v-for="(item, index) in newsList" :key="item.id">
        <article>
          <h4>{{ item.title }}</h4>
          <div class="description">
            <p>{{ item.description }}</p>
            <el-link type="primary" class="link">{{ item.linkText }}</el-link>
          </div>
        </article>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newsList = ref([
  {
    title: '12月云效专家系列直播课来啦！',
    description:
      '我们邀请了3位经验丰富的专家，为你分享在需求管理、代码评审、云原生持续交付上的实践和干货。续交付上的实践和干货',
    link: '#', // 这里可以替换为实际链接
    linkText: '了解更多',
    id: 1
  },
  {
    title: '项目协作支持需求评审',
    description:
      '在需求交付过程中，简化评审提质提效。可设置评审的类型、内容、节点，让评审更加符合协作背景。',
    link: '#',
    linkText: '了解更多',
    id: 2
  },
  {
    title: '支持项目与代码库、流水线关联',
    description: '方便在项目内整体管理需求、代码、流水线。',
    link: '#',
    linkText: '了解更多',
    id: 3
  },
  {
    title: '流水线支持接入 arm 机器作为私有构建机',
    description: '流水线支持接入Linux arm 架构机器作为私有构建机，满足arm架构构建场景。',
    link: '#',
    linkText: '了解更多',
    id: 4
  },
  {
    title: '代码管理新增13个代码检测规则包',
    description: '支持多语言和常见框架的代码检测规则包。',
    link: '#',
    linkText: '了解更多',
    id: 5
  }
])
</script>

<style lang="scss" scoped>
.latest-news {
  background-color: #ffffff;
  width: 365px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: url('/static/header.png') no-repeat;
  background-size: 100% auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 15px;
  box-sizing: border-box;
  span {
    color: #807777;
    font-size: 14px;
  }
}

.news-item-con {
  padding: 5px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: scroll;
}

.news-item h3 {
  font-size: 16px;
  margin-bottom: 8px;
}

.description {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  overflow: hidden;
}

.description p {
  font-size: 14px;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  flex: 1;
}

.link {
  font-size: 14px;
  color: #007bff;
  white-space: nowrap;
  margin-left: 10px;
}
:deep(.el-divider--horizontal) {
  margin: 10px 0 !important;
}
</style>
