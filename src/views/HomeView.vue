<script setup lang="ts">
import AsideSection from '@/components/templates/AsideSection.vue'
import PostsGrid from '@/components/structures/PostsGrid.vue'
import type { GetPostsResponse, Post } from '@/types/PostsResponse'
import { onBeforeMount, ref } from 'vue'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const posts = ref<Post[]>([])

const fetchPosts = async () => {
  try {
    const response: GetPostsResponse = await fetch(`${baseUrl}/posts`).then((res) => res.json())

    posts.value = response.items
  } catch (err) {
    console.log(err)
  }
}

onBeforeMount(() => {
  fetchPosts()
})
</script>

<template>
  <AsideSection title="The Blog">
    <PostsGrid :posts="posts" />
  </AsideSection>
</template>
