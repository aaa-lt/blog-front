<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import ChevronRight from '../atoms/ChevronRight.vue'
import { useNavbarStore } from '@/store/navbar'
import type { Series } from '@/types/SeriesManyResponse'

const navStore = useNavbarStore()

const loadMoreSeries = async () => await navStore.loadMoreSeries()

const renderSeries = computed(() => getSeriesPage(navStore.series, currentPage.value))
const currentPage = ref(1)
const totalPages = computed(() => {
  return Math.ceil(navStore.seriesCount / 10)
})

const getSeriesPage = (allPosts: Series[], pageNumber: number) => {
  const startIndex = (pageNumber - 1) * 10
  const endIndex = startIndex + 10

  return allPosts.slice(startIndex, endIndex)
}

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    if (navStore.series?.length < (currentPage.value + 1) * 10) {
      await loadMoreSeries()
    }
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

onBeforeMount(() => navStore.fetchAll())
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
            <div v-if="navStore.posts?.length > 0">
              <p class="text-xl font-medium text-gray-900 mb-4">Recent posts</p>
              <ul
                role="list"
                class="space-y-2 border-b border-gray-200 mb-4 pb-6 text-sm text-gray-900"
              >
                <li class="" v-for="post in navStore.posts" :key="post.id">
                  <RouterLink :to="'/post/' + post.path" class="flex items-center">
                    <ChevronRight class="size-4" />
                    <span>{{ post.title }}</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div v-if="navStore.series?.length > 0">
              <p class="text-xl font-medium text-gray-900 mb-4">Series</p>
              <ul
                role="list"
                class="space-y-2 border-b border-gray-200 mb-4 pb-6 text-sm text-gray-900"
              >
                <li v-for="item in renderSeries" :key="item.title">
                  <RouterLink :to="'/series/' + item.path" class="flex items-center">
                    <ChevronRight class="size-4" />
                    <span>{{ item.title }}</span>
                  </RouterLink>
                </li>
                <li v-if="navStore.seriesCount > 10" class="flex justify-center">
                  <button
                    @click="prevPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center rounded-l-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none flex-1 justify-center"
                  >
                    <span class="sr-only">Previous</span>
                    <ChevronRight class="size-3 rotate-180" />
                  </button>
                  <div
                    class="relative inline-flex items-center px-4 py-1 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 sm:flex-none flex-1 justify-center"
                  >
                    {{ currentPage }}
                  </div>
                  <button
                    :disabled="currentPage === totalPages"
                    @click="nextPage"
                    class="relative inline-flex items-center rounded-r-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none flex-1 justify-center"
                  >
                    <span class="sr-only">Next</span>
                    <ChevronRight class="size-3" />
                  </button>
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
