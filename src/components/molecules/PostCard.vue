<script setup lang="ts">
import type { Post } from '@/types/PostsResponse'
import MarkdownSpan from '@/components/atoms/MarkdownDiv.vue'
import { RouterLink } from 'vue-router'
import { inject } from 'vue'

defineProps<{
  post: Post
}>()

const postCount = inject('postsCount')
</script>
<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition hover:scale-[1.01]">
    <RouterLink :to="'/post/' + post.path">
      <img
        v-if="post.imageUrl"
        :src="post.imageUrl"
        :alt="post.title"
        class="w-full rounded-t-lg bg-gray-200 dark:bg-gray-700 object-cover group-hover:opacity-75 aspect-[2/1]"
      />
      <div
        v-else
        class="w-full rounded-lg bg-gray-200 dark:bg-gray-700 object-cover group-hover:opacity-75 aspect-[2/1]"
      />
      <h3 class="mt-4 text-2xl px-4 font-medium text-gray-900 dark:text-white hover:underline">
        {{ post.title }}
      </h3>
    </RouterLink>

    <div class="mt-1 text-lg px-4 pb-4 text-gray-700 dark:text-gray-300">
      <div class="text-sm">
        This is part {{ post.seriesPostId }} of {{ postCount }} in the
        <RouterLink
          :to="'/series/' + post.series?.path"
          class="text-indigo-700 dark:text-indigo-300 underline"
          >{{ post.series?.title }}</RouterLink
        >
      </div>
      <MarkdownSpan class="prose-sm" :content="post.previewContent" />
    </div>
  </div>
</template>
