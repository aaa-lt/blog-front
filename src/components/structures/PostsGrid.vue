<script setup lang="ts">
import PostCard from '@/components/molecules/PostCard.vue'
import type { Post } from '@/types/PostsResponse'
import { debounce } from '@/utils/debounce'
import { onMounted, onUnmounted } from 'vue'

defineProps<{ posts: Post[] }>()
const emit = defineEmits(['loadMorePosts'])

const handleScroll = () => {
  const scrollBottom = document.documentElement.scrollTop + window.innerHeight
  const scrollThreshold = document.documentElement.scrollHeight - 400

  if (scrollBottom >= scrollThreshold) {
    emit('loadMorePosts')
  }
}

onMounted(() => {
  window.addEventListener('scroll', debounce(handleScroll, 200))
})

onUnmounted(() => {
  window.removeEventListener('scroll', debounce(handleScroll, 200))
})
</script>
<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div class="grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-8">
        <PostCard v-for="item in posts" :key="item.id" :post="item" />
      </div>
    </div>
  </div>
</template>
