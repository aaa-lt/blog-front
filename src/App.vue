<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AsideSlot from './components/templates/AsideSlot.vue'
import { ref, watch } from 'vue'

const route = useRoute()

const isShown = ref(true)

watch(
  () => route.meta.isAsideHidden,
  (newValue) => {
    if (newValue) {
      return (isShown.value = false)
    }

    isShown.value = true
  },
  { immediate: true },
)
</script>

<template>
  <AsideSlot :is-shown="isShown">
    <RouterView />
  </AsideSlot>
</template>
