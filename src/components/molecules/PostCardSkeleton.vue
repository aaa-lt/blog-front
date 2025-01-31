<script setup lang="ts">
import ImageIcon from '../atoms/ImageIcon.vue'
import SkeletonText from '../atoms/SkeletonText.vue'
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition hover:scale-[1.01]">
    <div>
      <div
        class="w-full rounded-t-lg bg-gray-200 dark:bg-gray-700 object-cover group-hover:opacity-75 aspect-[2/1] flex items-center justify-center"
      >
        <ImageIcon class="fill-gray-300 dark:fill-gray-600" />
      </div>
      <SkeletonText class="mt-6 mx-4 h-6 w-96" />
    </div>

    <div class="mt-1 px-4 pb-4">
      <SkeletonText class="mt-2 h-4 w-64" />
      <SkeletonText v-for="_ in 4" :key="_" class="mt-2 h-4 w-full" />
      <SkeletonText class="mt-2 h-4 w-96" />
    </div>
  </div>
</template>
