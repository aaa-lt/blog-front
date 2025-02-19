<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ date: Date | string | number }>()

const date = computed(() => {
  const date = new Date(props.date)
  return date.toLocaleDateString('ru-Ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
})
</script>

<template>
  {{ date }}
</template>
