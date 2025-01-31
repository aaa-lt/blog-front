<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useNavbarStore } from '@/store/navbar'
import ToggleDarkMode from '../molecules/ToggleDarkMode.vue'
import { NewspaperIcon } from '@heroicons/vue/24/solid'
import NavList from '../molecules/NavList.vue'
import UnknownError from '../molecules/UnknownError.vue'
import SkeletonText from '../atoms/SkeletonText.vue'

const navStore = useNavbarStore()

onBeforeMount(() => navStore.fetchAll())
</script>

<template>
  <div
    class="mt-4 border-b border-gray-200 dark:border-gray-700 mb-4 pb-6 text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-between"
  >
    <RouterLink to="/" class="flex items-center gap-1 transition hover:-translate-y-0.5">
      <NewspaperIcon class="size-6 fill-indigo-700 dark:fill-indigo-500" />
      <span>The Blog</span>
    </RouterLink>
    <ToggleDarkMode />
  </div>
  <div v-if="navStore.isLoading" class="animate-pulse">
    <div class="border-b border-gray-200 dark:border-gray-700 mb-4 pb-6">
      <SkeletonText class="mt-2 h-8 w-full" />
      <SkeletonText class="mt-4 h-4 w-full" v-for="_ in 5" :key="_" />
    </div>
    <div class="border-b border-gray-200 dark:border-gray-700 mb-4 pb-6">
      <SkeletonText class="mt-2 h-8 w-full" />
      <SkeletonText class="mt-4 h-4 w-full" v-for="_ in 10" :key="_" />
    </div>
  </div>
  <div v-else-if="navStore.error">
    <UnknownError :error="navStore.error" />
  </div>
  <div v-else>
    <NavList :items="navStore.posts" title="Recent posts" path="post" />
    <NavList :items="navStore.series" title="Top series" path="series" />
  </div>
</template>
