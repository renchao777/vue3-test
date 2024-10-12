<template>
  <div class="container">
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ currentLanguage === 'zh' ? '中文' : '英文' }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="changeLanguage('zh')"> 中文 </el-dropdown-item>
          <el-dropdown-item @click="changeLanguage('en')"> 英文 </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="button-group">
      <el-button type="primary">{{ $t('add') }}</el-button>
      <el-button type="success">{{ $t('edit') }}</el-button>
      <el-button type="danger">{{ $t('del') }}</el-button>
    </div>
    <el-calendar></el-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}
const currentLanguage = ref(getCookie('language') || 'zh')

const changeLanguage = (lang) => {
  setCookie('language', lang, 7)
  locale.value = lang
  currentLanguage.value = lang
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.button-group {
  margin-top: 20px;
}
</style>
