<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

defineProps({
  currentPage: Number,
  totalPages: Number,
})

defineEmits(['prevPage', 'nextPage'])
</script>
<template>
  <ul class="flex gap-2 items-center text-sm">
    <li>
      <button
        :disabled="currentPage === 1"
        class="rounded-full size-3 transition hover:-translate-x-0.5 disabled:cursor-not-allowed disabled:hover:translate-x-0 flex items-center justify-center"
        @click="$emit('prevPage')"
      >
        <ChevronLeftIcon />
      </button>
    </li>
    <li v-for="i in totalPages" :key="i">
      <button
        class="rounded-full size-6 transition text-gray-700 dark:text-gray-300 hover:bg-indigo-700 hover:text-white flex items-center justify-center"
        :class="i === currentPage ? 'text-white bg-indigo-600 hover:bg-indigo-800' : ''"
      >
        {{ i }}
      </button>
    </li>
    <li>
      <button
        :disabled="currentPage === totalPages"
        class="rounded-full size-3 transition hover:translate-x-0.5 disabled:cursor-not-allowed disabled:hover:translate-x-0 flex items-center justify-center"
        @click="$emit('nextPage')"
      >
        <ChevronRightIcon />
      </button>
    </li>
  </ul>
</template>
