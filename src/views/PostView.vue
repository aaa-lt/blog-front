<script setup lang="ts">
import { fetchPostByRoute } from '@/services/fetchService'
import type { GetFullPostResponse } from '@/types/PostResponse'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownDiv from '@/components/atoms/MarkdownDiv.vue'

const route = useRoute()

const path = computed(() => route.params.path as string)
const post = ref<GetFullPostResponse>()
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
  const res = await fetchPostByRoute(path.value)

  if (res) {
    post.value = res
  }
}

onBeforeMount(async () => {
  await getPost()
})

watch(path, async () => {
  await getPost()
})
</script>
<template>
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
</template>
