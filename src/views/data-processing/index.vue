<template>
  <input v-model="inputValue" placeholder="请输入整数" />
  <p>{{ formattedValue }}</p>
  <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputValue = ref('')
const errorMessage = ref('')

const formattedValue = computed(() => {
  const value = inputValue.value.trim()
  const parsedValue = parseInt(value)
  if (isNaN(parsedValue)) {
    errorMessage.value = '输入的字符串不合法，请输入整数。'
    return ''
  }
  errorMessage.value = ''
  return value
    .split('')
    .reverse()
    .reduce((acc, num, i) => {
      return num + (i % 3 === 0 ? ',' : '') + acc
    }, '')
})
</script>
