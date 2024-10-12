<script setup lang="ts">
import { computed } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const ellocale = computed(() => (locale.value == 'zh' ? zhCn : en))
</script>

<template>
  <el-config-provider :locale="ellocale">
    <router-view />
  </el-config-provider>
</template>
