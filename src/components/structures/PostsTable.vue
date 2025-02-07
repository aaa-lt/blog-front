<script setup lang="ts">
import type { Post } from '@/types/PostsResponse'
import PostTableRow from '../molecules/PostTableRow.vue'
import { onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils/debounce'
import { ArrowUpCircleIcon } from '@heroicons/vue/24/solid'

defineProps<{
  posts: Post[] | undefined
  isLoading?: boolean
  error?: unknown
  totalCount?: number
}>()
const emit = defineEmits(['loadMorePosts'])

const handleScroll = () => {
  const scrollBottom = document.documentElement.scrollTop + window.innerHeight
  const scrollThreshold = document.documentElement.scrollHeight - 400

  if (scrollBottom >= scrollThreshold) {
    emit('loadMorePosts')
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', debounce(handleScroll, 200))
})

onUnmounted(() => {
  window.removeEventListener('scroll', debounce(handleScroll, 200))
})
</script>

<template>
  <div class="-mx-4 mt-8 md:-mx-0">
    <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
      <thead>
        <tr>
          <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white md:pl-0"
          >
            Title
          </th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white lg:table-cell"
          >
            Path
          </th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white md:table-cell"
          >
            Created at
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
          >
            Series
          </th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 md:pr-0">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
        <tr v-for="post in posts" :key="post.id">
          <PostTableRow :post="post" />
        </tr>
      </tbody>
    </table>
    <div
      v-if="posts.length === totalCount"
      class="px-3 py-4 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-between"
    >
      <span>You have reached the end! Total {{ totalCount }} rows.</span>
      <button @click="scrollToTop" class="flex gap-1">
        <ArrowUpCircleIcon class="size-8 transition hover:fill-indigo-600 hover:scale-110" />
      </button>
    </div>
  </div>
</template>
