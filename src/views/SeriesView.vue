<script setup lang="ts">
import PostsGrid from '@/components/structures/PostsGrid.vue'
import { fetchRecentPosts, fetchSeriesByPath } from '@/services/fetchService'
import { PostOrder } from '@/types/PostOrder.enum'
import type { Post } from '@/types/PostsResponse'
import type { GetSeriesByPathResponse } from '@/types/SeriesOneResponse'
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const posts = ref<Post[]>([])
const series = ref<GetSeriesByPathResponse>()
const loadingPosts = ref(true)
const errorPosts = ref<string>()
const loadingSeries = ref(true)
const errorSeries = ref<string>()

onBeforeMount(async () => {
  await Promise.all([loadPosts(), loadSeries()])
})

watch(route, async () => {
  await Promise.all([loadPosts(), loadSeries()])
})

const loadPosts = async () => {
  try {
    loadingPosts.value = true

    const res = await fetchRecentPosts(5, 0, PostOrder.ASC, route.params.path as string)
    if (res) {
      posts.value = res.items
    }
  } catch (e) {
    errorPosts.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loadingPosts.value = false
  }
}

const loadSeries = async () => {
  try {
    loadingSeries.value = true

    const res = await fetchSeriesByPath(route.params.path as string)
    if (res) {
      series.value = res
    }
  } catch (e) {
    errorSeries.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loadingSeries.value = false
  }
}
</script>

<template>
  <div class="mx-8 border-b border-gray-200 mb-4 pb-4">
    <div class="text-4xl font-semibold text-gray-900">Series: {{ series?.title }}</div>
    <img
      v-if="series?.imageUrl"
      :src="series.imageUrl"
      :alt="series.title"
      class="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 aspect-[3/1] mt-4"
    />
    <div class="text-gray-700 mt-2">{{ series?.description }}</div>
  </div>
  <PostsGrid :posts="posts" />
</template>
