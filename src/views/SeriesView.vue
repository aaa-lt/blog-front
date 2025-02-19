<script setup lang="ts">
import DateSpan from '@/components/atoms/DateSpan.vue'
import ImageIcon from '@/components/atoms/ImageIcon.vue'
import SkeletonText from '@/components/atoms/SkeletonText.vue'
import PostsGrid from '@/components/structures/PostsGrid.vue'
import { useFetch } from '@/services/fetchService'
import { PostOrder } from '@/types/PostOrder.enum'
import type { GetPostsResponse, Post } from '@/types/PostsResponse'
import type { GetSeriesByPathResponse } from '@/types/SeriesOneResponse'
import { CalendarIcon } from '@heroicons/vue/24/solid'
import { computed, onBeforeMount, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const posts = ref<Post[]>([])

const {
  data: postsData,
  // TODO 2 errors and 2 isLoading think about it
  error: postsError,
  isLoading: postsLoading,
  fetchData: fetchPosts,
} = useFetch<GetPostsResponse>()

const {
  data: seriesData,
  error: seriesError,
  isLoading: seriesLoading,
  fetchData: fetchSeries,
} = useFetch<GetSeriesByPathResponse>()

const loadPosts = async () => {
  await fetchPosts(
    '/posts',

    // TODO ASC to none
    {
      query: new URLSearchParams({
        seriesPath: route.params.path as string,
        order: PostOrder.ASC,
      }),
    },
  )
}

const loadMorePosts = async () => {
  if ((postsData.value?.meta.currentPage ?? 0) >= (postsData.value?.meta.totalPages ?? 0)) return

  await fetchPosts('/posts', {
    query: new URLSearchParams({
      seriesPath: route.params.path as string,
      page: `${(postsData.value?.meta.currentPage ?? 0) + 1}`,
    }),
  })
}

const loadSeries = async () => {
  await fetchSeries(`/series/${route.params.path}`)

  if (seriesError.value?.status === 404) {
    router.push({ name: 'NotFound' })
  }
}

watch(postsData, () => {
  if (postsData.value?.data) {
    posts.value.push(...postsData.value?.data)
  }
})

onBeforeMount(async () => {
  await Promise.all([loadPosts(), loadSeries()])
})

watch(route, async () => {
  posts.value = []
  await Promise.all([loadPosts(), loadSeries()])
})

provide(
  'postsCount',
  computed(() => postsData.value?.meta.totalItems),
)
</script>

<template>
  <div class="mx-8 border-b border-gray-200 dark:border-gray-700 pb-4">
    <div v-if="seriesLoading" class="flex justify-between gap-4 animate-pulse">
      <div class="flex-1">
        <div
          class="rounded-lg bg-gray-200 dark:bg-gray-700 object-cover group-hover:opacity-75 aspect-square mt-4 w-auto max-w-full flex items-center justify-center"
        >
          <ImageIcon />
        </div>
      </div>
      <div class="flex-[3] mt-2 flex flex-col justify-between">
        <div>
          <SkeletonText class="mt-2 h-8 w-full" />
          <SkeletonText class="mt-3 h-8 w-96" />
          <SkeletonText class="mt-3 h-4 w-full" />
          <SkeletonText class="mt-3 h-4 w-full" />
          <SkeletonText class="mt-3 h-4 w-64" />
        </div>
        <SkeletonText class="mb-1 h-4 w-64" />
      </div>
    </div>
    <div v-else-if="!seriesError && seriesData" class="flex justify-between gap-4">
      <div class="flex-1">
        <img
          v-if="seriesData.imageUrl"
          :src="seriesData.imageUrl"
          :alt="seriesData.title"
          class="rounded-lg bg-gray-200 dark:bg-gray-700 object-cover group-hover:opacity-75 aspect-square mt-4 w-full"
        />
        <div
          v-else
          class="rounded-lg bg-gray-200 dark:bg-gray-700 object-cover group-hover:opacity-75 aspect-square mt-4 w-auto max-w-full flex items-center justify-center"
        >
          <ImageIcon />
        </div>
      </div>
      <div class="flex-[3] mt-2 flex flex-col">
        <div class="text-4xl font-semibold text-gray-900 dark:text-white">
          Series: {{ seriesData.title }}
        </div>
        <div class="text-gray-700 dark:text-gray-300 mt-2 flex flex-col justify-between flex-grow">
          <p>{{ seriesData.description }}</p>
          <div class="flex gap-1 items-center">
            <CalendarIcon class="size-4" />
            <p>Last updated: <DateSpan :date="seriesData.updatedAt" /></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PostsGrid
    :posts="posts"
    @load-more-posts="loadMorePosts"
    :error="postsError"
    :is-loading="postsLoading"
  />
</template>
