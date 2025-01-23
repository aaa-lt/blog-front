<script setup lang="ts">
import PostCard from '@/components/molecules/PostCard.vue'
import type { Post } from '@/types/PostsResponse'

defineProps<{ posts: Post[] }>()
</script>
<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-8">
        <PostCard v-for="item in posts" :key="item.id" :post="item" />
      </div>
    </div>
  </div>
</template>
