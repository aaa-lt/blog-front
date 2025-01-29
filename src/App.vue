<script setup lang="ts">
import { RouterView } from 'vue-router'
import AsideSlot from './components/templates/AsideSlot.vue'
</script>

<template>
  <AsideSlot>
    <RouterView />
  </AsideSlot>
</template>
