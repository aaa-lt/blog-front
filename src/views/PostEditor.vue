<script setup lang="ts">
import DateSpan from '@/components/atoms/DateSpan.vue'
import MarkdownDiv from '@/components/atoms/MarkdownDiv.vue'
import ToggleDarkMode from '@/components/molecules/ToggleDarkMode.vue'
import { usePostEditorStore } from '@/store/postEditor'
import type { GetFullPostById } from '@/types/PostResponse'
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { onBeforeMount, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'

const store = usePostEditorStore()

const route = useRoute()
const router = useRouter()

const localPost = ref<GetFullPostById>()

const handleSave = () => {
  if (!localPost.value) return

  store.savePost(localPost.value)
}

const handlePublish = () => {
  if (!localPost.value) return

  if (confirm('Handle Publish?')) {
    localPost.value.published = !localPost.value.published
    handleSave()
    console.log('Handled Publish!')
  }
}

const generatePreview = () => {
  if (!localPost.value) return

  if (confirm('Generate Preview?')) {
    localPost.value.previewContent = localPost.value.content.split('\n').slice(0, 3).join('\n')
  }
}

const init = ref(false)

watch(
  localPost,
  () => {
    if (!init.value) {
      init.value = true
      return
    }

    if (!store.postIsLoading) {
      store.unsavedChanges = true
    }
  },
  { deep: true },
)

onBeforeRouteLeave((to, from, next) => {
  if (store.unsavedChanges && to.name !== 'draft') {
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
  if (store.unsavedChanges) {
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
  if (store.post.id !== route.params.id) {
    await store.fetchPost(String(route.params.id))

    if (store.post) {
      localPost.value = store.post
    }
    return
  }

  localPost.value = store.post
})

const editor = useTemplateRef('editor')
console.log(editor)
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
    <div class="border-b border-gray-200 dark:border-gray-700 pb-4 my-4">
      <p class="text-2xl font-bold mb-6">Post Editor: {{ localPost.title }}</p>
      <p><span>Created at: </span><DateSpan :date="localPost.createdAt" /></p>
    </div>
    <div class="space-y-4">
      <label>
        <div class="font-semibold mb-2">Title</div>
        <input
          type="text"
          v-model="localPost.title"
          placeholder="Post Title"
          class="w-full border rounded p-2 outline-none"
        />
      </label>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <div class="font-semibold mb-2">Post preview</div>
          <button
            @click="generatePreview"
            class="transition px-3 py-1 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Auto Generate
          </button>
        </div>
        <div class="flex">
          <textarea
            v-model="localPost.previewContent"
            placeholder="Write your post content in markdown..."
            class="w-full border rounded-l rounded-r-none p-2 h-auto max-h-screen outline-none resize-none"
          ></textarea>
          <MarkdownDiv
            :content="localPost.previewContent"
            class="w-full max-h-screen border rounded-r p-4 prose dark:prose-invert overflow-auto"
          />
        </div>
      </div>
      <!-- <div class="">
        <div class="font-semibold mb-2">Series</div>
        <div class="flex">
          <ComboBox />
        </div>
      </div> -->
      <div>
        <div class="font-semibold mb-2">Post text</div>
        <div class="flex">
          <textarea
            v-model="localPost.content"
            ref="editor"
            placeholder="Write your post content in markdown..."
            class="w-full border rounded-l rounded-r-none p-2 h-auto max-h-screen outline-none resize-none"
          ></textarea>
          <MarkdownDiv
            :content="localPost.content"
            class="w-full max-h-screen border rounded-r p-4 prose dark:prose-invert overflow-auto"
          />
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          class="transition px-3 py-1 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
          @click="handlePublish"
        >
          <span v-if="localPost.published">Draft Post</span>
          <span v-else>Publish Post</span>
        </button>
        <button
          @click="handleSave"
          class="transition px-3 py-1 font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Save Post
        </button>
      </div>
    </div>
  </div>
</template>
