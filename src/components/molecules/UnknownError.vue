<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'

defineProps<{ error: unknown }>()
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <ExclamationCircleIcon class="size-36 fill-red-600 dark:fill-red-700" />
    <div class="text-center">
      <div class="text-2xl font-bold">Oops, something went wrong</div>
      <div class="text-xl mt-4">{{ error }}</div>
    </div>
  </div>
</template>
