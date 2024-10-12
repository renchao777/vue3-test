import zh from './zh.json'
import en from './en.json'
import { createI18n } from 'vue-i18n'

// 定义消息对象，包含所有语言的翻译
const messages = {
  en,
  zh
}

// 获取指定名称的 cookie 值
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

// 获取当前语言的 cookie，如果没有则默认设置为中文
const language = getCookie('language') || 'zh'

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false,
  locale: language, // 设置当前语言
  fallbackLocale: 'en', // 设置回退语言
  globalInjection: true, // 全局注册 $t 方法
  messages
})

export default i18n
