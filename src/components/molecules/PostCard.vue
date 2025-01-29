<script setup lang="ts">
import type { Post } from '@/types/PostsResponse'
import MarkdownSpan from '@/components/atoms/MarkdownDiv.vue'
import { RouterLink } from 'vue-router'

defineProps<{
  post: Post
}>()
</script>
<template>
  <div>
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
      <h3 :to="'post/' + post.path" class="mt-4 text-2xl font-medium text-gray-900 hover:underline">
        {{ post.title }}
      </h3>
    </RouterLink>

    <p class="mt-1 text-lg text-gray-700">
      <MarkdownSpan class="prose-sm" :content="post.previewContent" />
    </p>
  </div>
</template>
