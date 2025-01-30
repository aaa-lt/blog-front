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
  <div>
    <RouterLink :to="'/post/' + post.path">
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
      <h3 class="mt-4 text-2xl font-medium text-gray-900 hover:underline">
        {{ post.title }}
      </h3>
    </RouterLink>

    <div class="mt-1 text-lg text-gray-700">
      <div class="text-sm">
        This is part {{ post.seriesPostId }} of {{ postCount }} in the
        <RouterLink :to="'/series/' + post.series?.path" class="text-orange-700 underline">{{
          post.series?.title
        }}</RouterLink>
      </div>
      <MarkdownSpan class="prose-sm" :content="post.previewContent" />
    </div>
  </div>
</template>
