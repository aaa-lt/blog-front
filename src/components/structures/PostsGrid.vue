<script setup lang="ts">
import PostCard from '@/components/molecules/PostCard.vue'
import type { Post } from '@/types/PostsResponse'
import { debounce } from '@/utils/debounce'
import { onMounted, onUnmounted } from 'vue'
import PostCardSkeleton from '../molecules/PostCardSkeleton.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'
import UnknownError from '../molecules/UnknownError.vue'

defineProps<{ posts: Post[] | undefined; isLoading?: boolean; error?: unknown }>()
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
  <div class="mx-auto max-w-2xl p-4 sm:p-6 lg:max-w-7xl lg:px-8">
    <div
      v-if="isLoading && posts?.length === 0"
      class="animate-pulse flex flex-col gap-x-6 gap-y-10 xl:gap-x-8"
    >
      <PostCardSkeleton v-for="_ in 2" :key="_" />
    </div>

    <div v-else-if="error">
      <UnknownError :error="error" />
    </div>
    <div v-else>
      <div v-if="posts">
        <div v-if="posts.length > 0" class="flex flex-col gap-x-6 gap-y-10 xl:gap-x-8">
          <PostCard v-for="item in posts" :key="item.id" :post="item" />
        </div>
        <div v-else>No posts found</div>
      </div>
      <div v-else>
        {{ error }}
      </div>
    </div>
  </div>
</template>
