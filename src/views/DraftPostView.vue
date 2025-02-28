<script setup lang="ts">
import type { GetPostByPath } from '@/types/PostResponse'
import { onBeforeMount, onMounted, onUnmounted, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { useFetch } from '@/services/fetchService'
import { usePostEditorStore } from '@/store/postEditor'
import PostViewer from '@/components/templates/PostViewer.vue'

const route = useRoute()
const router = useRouter()
const editorStore = usePostEditorStore()

const { data: post, error, isLoading, fetchData } = useFetch<GetPostByPath>()

const getPost = async () => {
  try {
    if (editorStore.post.id !== route.params.id) {
      return await fetchData(`/admin/posts/${route.params.id}`)
    }

    post.value = editorStore.post
  } finally {
    if (error.value?.status === 404) {
      router.push({ name: 'NotFound' })
    }
  }
}

onBeforeRouteLeave((to, from, next) => {
  if (editorStore.unsavedChanges && to.name !== 'draftEditor') {
    const answer = window.confirm('You have unsaved changes. Do you really want to leave?')
    if (!answer) {
      next(false)
    } else {
      next()
    }
  } else {
    next()
  }
})

const preventClose = (event: Event) => {
  if (editorStore.unsavedChanges) {
    event.preventDefault()
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', preventClose)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', preventClose)
})

onBeforeMount(async () => {
  await getPost()
})

watch(route, async () => {
  await getPost()
})
</script>
<template>
  <div
    class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 my-4"
  >
    <div class="text-2xl font-semibold">Admin: Post preview</div>

    <RouterLink
      :to="`/admin/post/${post?.id}/edit`"
      class="transition px-3 py-1 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
    >
      Edit
    </RouterLink>
  </div>
  <PostViewer :post="post" :is-loading="isLoading" :error="error" :is-draft="true" />
</template>
