<script setup lang="ts">
import type { Post } from '@/types/PostsResponse'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{ post: Post }>()

const date = computed(() => {
  const date = new Date(props.post.createdAt)
  return date.toLocaleDateString('ru-Ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
})
</script>
<template>
  <td
    class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white md:w-auto md:max-w-none md:pl-0"
  >
    <RouterLink :to="`/admin/post/${post.id}`">{{ post.title }}</RouterLink>
    <dl class="font-normal lg:hidden">
      <dt class="sr-only">Path</dt>
      <dd class="mt-1 truncate text-gray-700">{{ post.path }}</dd>
      <dt class="sr-only md:hidden">Created at</dt>
      <dd class="mt-1 truncate text-gray-500 dark:text-gray-400 md:hidden">{{ post.createdAt }}</dd>
    </dl>
  </td>
  <td class="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-400 lg:table-cell">
    {{ post.path }}
  </td>
  <td class="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-400 md:table-cell">
    {{ date }}
  </td>
  <td
    class="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-500 hover:underline"
  >
    <RouterLink :to="`series/${post.series.path}`">
      {{ post.series.title }}
    </RouterLink>
  </td>
  <td class="py-4 pl-3 pr-4 text-right text-sm font-medium md:pr-0">
    <RouterLink
      :to="`/admin/post/${post.id}/edit`"
      class="text-indigo-600 dark:text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-600"
      >Edit<span class="sr-only">, {{ post.title }}</span></RouterLink
    >
  </td>
</template>
