<script setup lang="ts">
import NotificationSuccess from '../molecules/NotificationSuccess.vue'
</script>
<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <NotificationSuccess :show="true" title="Successfully" />
  </div>
</template>
