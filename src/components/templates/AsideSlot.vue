<script setup lang="ts">
import { fetchRecentPosts, fetchAllSeries } from '@/services/fetchService'
import { onBeforeMount, ref } from 'vue'
import ChevronRight from '../atoms/ChevronRight.vue'
import type { Post } from '@/types/PostsResponse'
import type { Series } from '@/types/SeriesManyResponse'

const posts = ref<Post[]>([])
const series = ref<Series[]>([])
const loadingPosts = ref(true)
const errorPosts = ref<string>()
const loadingSeries = ref(true)
const errorSeries = ref<string>()

onBeforeMount(async () => {
  await Promise.all([loadPosts(), loadSeries()])
})

const loadPosts = async () => {
  try {
    loadingPosts.value = true

    const res = await fetchRecentPosts(5, 0)
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

    const res = await fetchAllSeries(10, 0)
    if (res) {
      series.value = res.items
    }
  } catch (e) {
    errorSeries.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loadingSeries.value = false
  }
}
</script>

<template>
  <div class="bg-white">
    <main class="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
      <section aria-labelledby="products-heading" class="pb-24 pt-12">
        <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div class="lg:block">
            <div class="border-b border-gray-200 mb-4 pb-6 text-2xl font-bold text-gray-900">
              <RouterLink to="/">Home</RouterLink>
            </div>
            <div v-if="posts?.length > 0">
              <p class="text-xl font-medium text-gray-900 mb-4">Recent posts</p>
              <ul
                role="list"
                class="space-y-2 border-b border-gray-200 mb-4 pb-6 text-sm text-gray-900"
              >
                <li class="" v-for="post in posts" :key="post.id">
                  <RouterLink :to="'/post/' + post.path" class="flex items-center">
                    <ChevronRight class="size-4" />
                    <span>{{ post.title }}</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div v-if="series?.length > 0">
              <p class="text-xl font-medium text-gray-900 mb-4">Series</p>
              <ul
                role="list"
                class="space-y-2 border-b border-gray-200 mb-4 pb-6 text-sm text-gray-900"
              >
                <li class="" v-for="item in series" :key="item.title">
                  <RouterLink :to="'/series/' + item.path" class="flex items-center">
                    <ChevronRight class="size-4" />
                    <span>{{ item.title }}</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="lg:col-span-3">
            <slot></slot>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
