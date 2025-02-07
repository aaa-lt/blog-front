<script setup lang="ts">
import MarkdownDiv from '@/components/atoms/MarkdownDiv.vue'
import ToggleDarkMode from '@/components/molecules/ToggleDarkMode.vue'
import { usePostEditorStore } from '@/store/postEditor'
import type { GetFullPostById } from '@/types/PostResponse'
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = usePostEditorStore()

const route = useRoute()
const router = useRouter()

const localPost = ref<GetFullPostById>()

const handleSave = () => {
  if (!localPost.value) return

  store.savePost(localPost.value)
}

onBeforeMount(async () => {
  if (store.post.id !== route.params.id) {
    await store.fetchPost(`${route.params.id}`)

    if (store.post) {
      localPost.value = store.post
    }
    return
  }

  localPost.value = store.post
})
</script>

<template>
  <div class="flex justify-between items-center sticky top-0 bg-slate-50 dark:bg-gray-900">
    <button @click="router.back()" class="flex items-center my-4">
      <ChevronLeftIcon class="size-6" />
      <span class="font-semibold text-gray-900 dark:text-white">Back</span>
    </button>
    <div class="flex gap-4">
      <ToggleDarkMode />
      <RouterLink
        v-if="localPost"
        :to="`/admin/post/${localPost.id}`"
        class="transition px-3 py-1 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
        >Preview on page</RouterLink
      >
    </div>
  </div>
  <div v-if="localPost">
    <form @submit.prevent="handleSave" class="space-y-4">
      <label>
        <span>123</span>
        <input
          type="text"
          v-model="localPost.title"
          placeholder="Post Title"
          class="w-full border rounded p-2"
        />
      </label>

      <div class="flex">
        <textarea
          v-model="localPost.content"
          placeholder="Write your post content in markdown..."
          class="w-full border rounded-l rounded-r-none p-2 h-auto max-h-screen"
        ></textarea>
        <MarkdownDiv
          :content="localPost.content"
          class="w-full max-h-screen border rounded-r p-4 prose dark:prose-invert overflow-auto"
        />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Save Post
      </button>
    </form>

    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Preview</h2>
    </div>
  </div>
</template>
