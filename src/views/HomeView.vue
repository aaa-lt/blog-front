<script setup lang="ts">
import PostsGrid from '@/components/structures/PostsGrid.vue'
import { fetchRecentPosts } from '@/services/fetchService'
import type { Post } from '@/types/PostsResponse'
import { onBeforeMount, ref } from 'vue'

const posts = ref<Post[]>([])

const fetchPosts = async () => {
  try {
    const res = await fetchRecentPosts()

    if (res) {
      posts.value = res.items
    }
  } catch (err) {
    console.log(err)
  }
}

onBeforeMount(() => {
  fetchPosts()
})
</script>

<template>
  <PostsGrid :posts="posts" />
</template>
