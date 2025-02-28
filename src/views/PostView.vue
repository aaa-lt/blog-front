<script setup lang="ts">
import type { GetPostByPath } from '@/types/PostResponse'
import { onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '@/services/fetchService'
import PostViewer from '@/components/templates/PostViewer.vue'

const route = useRoute()
const router = useRouter()

const { data: post, error, isLoading, fetchData } = useFetch<GetPostByPath>()

const getPost = async () => {
  try {
    await fetchData(`/posts/${route.params.path}`)
  } finally {
    if (error.value?.status === 404) {
      router.push({ name: 'NotFound' })
    }
  }
}

onBeforeMount(async () => {
  await getPost()
})

watch(route, async () => {
  await getPost()
})
</script>
<template>
  <PostViewer :post="post" :isLoading="isLoading" :error="error" />
</template>
