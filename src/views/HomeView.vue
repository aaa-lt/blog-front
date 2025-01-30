<script setup lang="ts">
import PostsGrid from '@/components/structures/PostsGrid.vue'
import { useFetch } from '@/services/fetchService'
import type { GetPostsResponse, Post } from '@/types/PostsResponse'
import { onBeforeMount, provide, ref, watch } from 'vue'

const { data, isLoading, error, fetchData } = useFetch<GetPostsResponse>()

const posts = ref<Post[]>([])

watch(data, () => {
  if (data.value?.items) {
    for (const post of data.value?.items) {
      posts.value.push(post)
    }
  }
})

const loadMorePosts = async () => {
  if (posts.value.length >= (data.value?.count ?? 0)) return

  await fetchData('/posts', new URLSearchParams({ offset: `${posts.value.length}` }))
}

const fetchPosts = async () => {
  await fetchData('/posts')
}

onBeforeMount(() => {
  fetchPosts()
})

provide('postsCount', data.value?.count)
</script>

<template>
  <PostsGrid
    :posts="posts"
    @load-more-posts="loadMorePosts"
    :isLoading="isLoading"
    :error="error"
  />
</template>
