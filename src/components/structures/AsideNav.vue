<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useAsideNavStore } from '@/store/asideNav'
import ToggleDarkMode from '../molecules/ToggleDarkMode.vue'
import { NewspaperIcon } from '@heroicons/vue/24/solid'
import NavList from '../molecules/NavList.vue'
import UnknownError from '../molecules/UnknownError.vue'
import SkeletonText from '../atoms/SkeletonText.vue'
import { ArrowRightStartOnRectangleIcon, UserIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/store/auth'
import { RouterLink } from 'vue-router'

const navStore = useAsideNavStore()
const authStore = useAuthStore()

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
  <div
    class="mt-4 border-b border-gray-200 dark:border-gray-700 mb-4 pb-4 text-gray-900 dark:text-white transition-colors flex items-center justify-between"
  >
    <div v-if="authStore.user" class="flex justify-between w-full px-1">
      <div class="flex items-center gap-1">
        <UserIcon class="size-5" /> <span>{{ authStore.user?.name }}</span>
      </div>
      <RouterLink to="/drafts">Drafts</RouterLink>
      <RouterLink
        to="/logout"
        class="transition hover:text-indigo-600 hover:dark:text-indigo-500 flex items-center gap-1"
      >
        <span>Logout</span>
        <ArrowRightStartOnRectangleIcon class="size-5" />
      </RouterLink>
    </div>
    <div v-else class="flex gap-2">
      <RouterLink
        to="/login"
        class="transition px-3 py-1 font-semibold rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >Log in</RouterLink
      >
      <RouterLink
        to="/register"
        class="transition px-3 py-1 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        Sign up
      </RouterLink>
    </div>
  </div>

  <div v-if="navStore.postIsLoading" class="animate-pulse">
    <div class="border-b border-gray-200 dark:border-gray-700 mb-4 pb-6">
      <SkeletonText class="mt-2 h-8 w-32" />
      <SkeletonText class="mt-4 h-4 w-full" v-for="_ in 5" :key="_" />
    </div>
  </div>
  <div v-else-if="navStore.postError">
    <UnknownError :error="navStore.postError" />
  </div>
  <div v-else>
    <NavList :items="navStore.posts" title="Recent posts" path="post" />
  </div>
  <div v-if="navStore.seriesIsLoading" class="animate-pulse">
    <div class="border-b border-gray-200 dark:border-gray-700 mb-4 pb-6">
      <SkeletonText class="mt-2 h-8 w-32" />
      <SkeletonText class="mt-4 h-4 w-full" v-for="_ in 10" :key="_" />
    </div>
  </div>
  <div v-else-if="navStore.seriesError">
    <UnknownError :error="navStore.seriesError" />
  </div>
  <div v-else>
    <NavList :items="navStore.series" title="Top series" path="series" />
  </div>
</template>
