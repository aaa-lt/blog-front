<script setup lang="ts">
import PostsGrid from '@/components/structures/PostsGrid.vue'
import { useFetch } from '@/services/fetchService'
import type { GetPostsResponse, Post } from '@/types/PostsResponse'
import type { GetSeriesByPathResponse } from '@/types/SeriesOneResponse'
import { onBeforeMount, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const posts = ref<Post[]>([])

const {
  data: postsData,
  // error: postsError,
  // isLoading: postsLoading,
  fetchData: fetchPosts,
} = useFetch<GetPostsResponse>()

const {
  data: seriesData,
  // error: seriesError,
  // isLoading: seriesLoading,
  fetchData: fetchSeries,
} = useFetch<GetSeriesByPathResponse>()

const loadPosts = async () => {
  await fetchPosts('/posts', new URLSearchParams({ seriesPath: route.params.path as string }))
}

const loadMorePosts = async () => {
  if (posts.value.length >= (postsData.value?.count ?? 0)) return

  await fetchPosts(
    '/posts',
    new URLSearchParams({
      seriesPath: route.params.path as string,
      offset: `${posts.value.length}`,
    }),
  )
}

const loadSeries = async () => {
  await fetchSeries(`/series/${route.params.path}`)
}

watch(postsData, () => {
  if (postsData.value?.items) {
    for (const post of postsData.value?.items) {
      posts.value.push(post)
    }
  }
})

onBeforeMount(async () => {
  await Promise.all([loadPosts(), loadSeries()])
})

watch(route, async () => {
  posts.value = []
  await Promise.all([loadPosts(), loadSeries()])
})

provide('postsCount', postsData.value?.count)
</script>

<template>
  <div class="mx-8 border-b border-gray-200 mb-4 pb-4">
    <div class="text-4xl font-semibold text-gray-900">Series: {{ seriesData?.title }}</div>
    <img
      v-if="seriesData?.imageUrl"
      :src="seriesData.imageUrl"
      :alt="seriesData.title"
      class="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 aspect-[3/1] mt-4"
    />
    <div class="text-gray-700 mt-2">{{ seriesData?.description }}</div>
  </div>
  <PostsGrid :posts="posts" @load-more-posts="loadMorePosts" />
</template>
