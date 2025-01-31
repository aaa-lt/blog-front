<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useNavbarStore } from '@/store/navbar'
import ToggleDarkMode from '../molecules/ToggleDarkMode.vue'
import { NewspaperIcon } from '@heroicons/vue/24/solid'
import NavList from '../molecules/NavList.vue'

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

  <NavList :items="navStore.posts" title="Recent posts" />
  <NavList :items="navStore.series" title="Top series" />
</template>
