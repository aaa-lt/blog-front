<script setup lang="ts">
import PostsGrid from '@/components/structures/PostsGrid.vue'
import { useFetch } from '@/services/fetchService'
import type { GetPostsResponse, Post } from '@/types/PostsResponse'
import { onBeforeMount, provide, ref, watch } from 'vue'

const { data, isLoading, error, fetchData } = useFetch<GetPostsResponse>()

const posts = ref<Post[]>([])

watch(data, () => {
  if (data.value?.data) {
    posts.value.push(...data.value?.data)
  }
})

const loadMorePosts = async () => {
  if ((data.value?.meta.currentPage ?? 0) >= (data.value?.meta.totalPages ?? 0)) return

  await fetchData('/posts', {
    query: new URLSearchParams({ page: `${(data.value?.meta.currentPage ?? 0) + 1}` }),
  })
}

const fetchPosts = async () => {
  await fetchData('/posts')
}

onBeforeMount(() => {
  fetchPosts()
})

provide('postsCount', 0)
</script>

<template>
  <PostsGrid
    :posts="posts"
    @load-more-posts="loadMorePosts"
    :isLoading="isLoading"
    :error="error"
  />
</template>
