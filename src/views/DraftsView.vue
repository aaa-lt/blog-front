<script setup lang="ts">
import PostsTable from '@/components/structures/PostsTable.vue'
import { useFetch } from '@/services/fetchService'
import type { GetPostsResponse, Post } from '@/types/PostsResponse'
import { onBeforeMount, provide, ref, watch } from 'vue'

const { data, error, isLoading, fetchData } = useFetch<GetPostsResponse>()

const posts = ref<Post[]>([])

watch(data, () => {
  if (data.value?.data) {
    posts.value.push(...data.value?.data)
  }
})

const loadMorePosts = async () => {
  if (posts.value.length >= (data.value?.meta.totalItems ?? 0)) return

  await fetchData('/admin/posts', {
    query: new URLSearchParams({ offset: `${posts.value.length}` }),
  })
}

const fetchPosts = async () => {
  await fetchData('/admin/posts')
}

onBeforeMount(() => {
  fetchPosts()
})

provide('postsCount', 0)
</script>
<template>
  <div v-if="!(posts?.length === 0)" class="px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-white">Drafts</h1>
      <button
        type="button"
        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add post
      </button>
    </div>
    <PostsTable
      :posts="posts"
      @load-more-posts="loadMorePosts"
      :isLoading="isLoading"
      :error="error"
      :total-count="data?.meta.totalItems"
    />
  </div>
</template>
