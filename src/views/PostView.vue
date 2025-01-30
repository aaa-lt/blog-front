<script setup lang="ts">
import type { GetFullPostResponse } from '@/types/PostResponse'
import { computed, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownDiv from '@/components/atoms/MarkdownDiv.vue'
import { useFetch } from '@/services/fetchService'
import SkeletonText from '@/components/atoms/SkeletonText.vue'

const route = useRoute()
// route.params.path

const { data: post, error, isLoading, fetchData } = useFetch<GetFullPostResponse>()

const postDate = computed(() => {
  if (post.value) {
    const date = new Date(post.value?.createdAt)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return undefined
})

const getPost = async () => {
  await fetchData(`/posts/${route.params.path}`)
}

onBeforeMount(async () => {
  await getPost()
})

watch(route, async () => {
  await getPost()
})
</script>
<template>
  <div v-if="isLoading" class="animate-pulse">
    <div class="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 aspect-[3/1]" />
    <div class="mx-4">
      <SkeletonText class="mt-6 h-8 w-full" />
      <SkeletonText class="mt-4 h-8 w-48" />
      <SkeletonText class="mt-4 mb-6 h-4 w-36" />
      <SkeletonText class="mt-3 h-4 w-full" v-for="_ in 10" :key="_" />
    </div>
  </div>

  <div v-else-if="error">
    {{ error }}
  </div>
  <div v-else>
    <img
      v-if="post?.imageUrl"
      :src="post.imageUrl"
      :alt="post.title"
      class="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 aspect-[3/1]"
    />
    <div class="mx-4">
      <h3 class="mt-4 text-4xl font-bold text-gray-900">{{ post?.title }}</h3>
      <p v-if="post?.createdAt" class="mt-2 text-gray-700">{{ postDate }}</p>
      <div v-if="post?.content" class="mt-4">
        <MarkdownDiv class="prose-sm sm:prose md:prose-md" :content="post?.content" />
      </div>
    </div>
  </div>
</template>
