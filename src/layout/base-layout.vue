<script setup>
import { ref, watch } from 'vue'
import { useSystemStore } from '@/stores'
import baseNavigator from './base-navigator.vue'
const systemStore = useSystemStore()

function logout() {
  systemStore.logout()
}
import { ArrowDown } from '@element-plus/icons-vue'
// 国际化
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
// 获取指定名称的 cookie 值
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

// 设置 cookie
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}
const currentLanguage = ref(getCookie('language') || 'zh')

// 语言更改处理
const changeLanguage = (lang) => {
  setCookie('language', lang, 7) // 7 天有效
  locale.value = lang
  currentLanguage.value = lang
}
// .........................
import { useDark, useToggle, useStorage } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
// 实现换肤效果

// 设置-显示模式默认值
const isdark = ref(false)
const setDarkMode = (val) => {
  isdark.value = val
}

const menuPositionStorge = useStorage('menu-position', 'vertical') //horizontal
function togglePosition() {
  menuPositionStorge.value = menuPositionStorge.value == 'vertical' ? 'horizontal' : 'vertical'
}
</script>
<template>
  <div class="admin-container">
    <div class="admin-header">
      <div class="admin-header-left">
        <div class="header-brand">
          <el-icon size="34px">
            <Notification />
          </el-icon>
        </div>
        <div class="brand-text">{{ $env.VITE_APP_NAME }}</div>
      </div>
      <div class="admin-menu" v-if="menuPositionStorge == 'horizontal'">
        <base-navigator :mode="menuPositionStorge"></base-navigator>
      </div>
      <div class="admin-header-right">
        <!-- 国际化 -->

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

        <div class="skin-change">
          <span>{{ isdark ? 'dark' : 'light' }}</span>
          <el-switch
            style="display: block; --el-switch-on-color: #0a0a0"
            v-model="isdark"
            @change="setDarkMode"
          >
            <template #active-action>
              <el-icon><Moon /></el-icon>
            </template>
            <template #inactive-action>
              <el-icon><Sunny /></el-icon>
            </template>
          </el-switch>
        </div>
        <el-button @click="toggleDark()" size="small">
          <el-icon>
            <Sunny v-if="isDark" />
            <Moon v-else />
          </el-icon>
        </el-button>
        <el-button @click="togglePosition()" size="small">
          <el-icon>
            <TopRight v-if="menuPositionStorge == 'vertical'" />
            <BottomLeft v-else />
          </el-icon>
        </el-button>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :size="26" src="" style="margin-right: 5px" />
            <div>
              {{ systemStore.state.nickName }}
              <el-icon>
                <arrow-down />
              </el-icon>
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout"> 退出 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="admin-body">
      <div class="admin-slide" v-if="menuPositionStorge == 'vertical'">
        <base-navigator :mode="menuPositionStorge"></base-navigator>
      </div>
      <div class="admin-body-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skin-change {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    line-height: 15px;
    font-size: 12px;
  }
}
</style>
