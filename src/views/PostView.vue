<script setup lang="ts">
import AsideSection from '@/components/templates/AsideSection.vue'
import type { GetPostResponse } from '@/types/PostResponse'

const props = defineProps<{ post: string }>()

const post = JSON.parse(props.post) as GetPostResponse

console.log(post)
</script>
<template>
  <AsideSection :title="post.title"></AsideSection>
</template>
