<template>
  <div class="themeSwitcher">
    <div class="skin-change">
      <span>{{ isDark ? 'dark' : 'light' }}</span>
      <el-switch
        :style="{
          display: 'block',
          '--el-switch-on-color': isDark ? '#606266' : '#0a0a0'
        }"
        v-model="isDark"
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

    <div class="themeSwitcher-con">
      <h1>{{ isDark ? '暗色主题' : '亮色主题' }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isDark = ref(false)

const setDarkMode = (val) => {
  const themes = {
    light: {
      '--theme-color-bg-gradient': 'linear-gradient(to right, #d8edb1, #bffdd4)',
      '--theme-color-text': '#000000'
    },
    dark: {
      '--theme-color-bg-gradient': '#152832',
      '--theme-color-text': '#ffffff'
    }
  }

  const selectedTheme = val ? themes.dark : themes.light
  for (const key in selectedTheme) {
    document.documentElement.style.setProperty(key, selectedTheme[key])
  }
}
setDarkMode(isDark.value)
</script>

<style lang="scss" scoped>
// 页面主题切换
:root {
  --theme-color-bg-gradient: linear-gradient(to right, #d8edb1, #bffdd4);
  --theme-color-text: #000000;
}

.themeSwitcher {
  height: 100%;
  background: var(--theme-color-bg-gradient);
  .skin-change {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
      line-height: 15px;
      font-size: 12px;
      color: var(--theme-color-text);
    }
  }

  &-con {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: var(--theme-color-text);
    }
  }
}
</style>
