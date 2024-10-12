export const getLocale = () => {
  //读取cookie存入的当前语言
  const cookieLanguage = getLanguage()
  //如果有返回当前语言
  if (cookieLanguage) {
    return cookieLanguage
  }
  //如果没有，获取系统语言
  const language = navigator.language.toLowerCase()
  //获取messages 语言 遍历
  const locales = Object.keys(messages)
  for (const locale of locales) {
    //如果messsage 包里面有系统语言返回
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // 默认语言 简体中文
  return 'zh-cn'
}
