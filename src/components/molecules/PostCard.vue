<script setup lang="ts">
import type { Post } from '@/types/PostsResponse'
import MarkdownSpan from '@/components/atoms/MarkdownDiv.vue'
import { RouterLink } from 'vue-router'

defineProps<{
  post: Post
}>()
</script>
<template>
  <RouterLink :to="'post/' + post.path">
    <img
      v-if="post.imageUrl"
      :src="post.imageUrl"
      :alt="post.title"
      class="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 aspect-[3/1]"
    />
    <div
      v-else
      class="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 aspect-[3/1]"
    />
    <h3 class="mt-4 text-2xl font-medium text-gray-900">{{ post.title }}</h3>
    <p class="mt-1 text-lg text-gray-700"><MarkdownSpan :content="post.previewContent" /></p>
  </RouterLink>
</template>
