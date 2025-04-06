<script setup lang="ts">
import ComboBox from '@/components/atoms/ComboBox.vue'
import DateSpan from '@/components/atoms/DateSpan.vue'
import MarkdownDiv from '@/components/atoms/MarkdownDiv.vue'
import ToggleDarkMode from '@/components/molecules/ToggleDarkMode.vue'
import { useFetch } from '@/services/fetchService'
import { usePostEditorStore } from '@/store/postEditor'
import type { GetFullPostById } from '@/types/PostResponse'
import type { GetTrimmedSeriesResponse, TrimmedSeries } from '@/types/SeriesManyResponse'
import { debounce } from '@/utils/debounce'
import {
  BoldIcon,
  ChevronLeftIcon,
  CodeBracketIcon,
  ItalicIcon,
  LinkIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from '@heroicons/vue/24/solid'
import { onBeforeMount, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const store = usePostEditorStore()

const init = ref(false)
const editor = useTemplateRef('editor')
const preview = useTemplateRef('preview')
const localPost = ref<GetFullPostById>()

const fetchPost = async () => {
  if (store.post.id !== route.params.id) {
    await store.fetchPost(String(route.params.id))

    if (store.post) {
      localPost.value = store.post
    }
    return
  }

  localPost.value = store.post
}

// Button's logic

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

// Series combobox logic

const series = ref<TrimmedSeries[]>([])

const { data: response, fetchData } = useFetch<GetTrimmedSeriesResponse>()

const fetchSeries = async () => {
  await fetchData('/series', {
    query: new URLSearchParams({
      limit: '20',
      select: 'id,title',
    }),
  })

  if (response.value) {
    series.value = response.value.data
  }
}

// Markdown insertion

const insertMarkdown = (before: string, after = '') => {
  if (!editor.value || !localPost.value) return

  const textarea = editor.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = textarea.value
  let selectedText = text.substring(start, end)

  if (selectedText.trim() === '' && selectedText.length > 0) return

  if (selectedText.length === 0) {
    const beforeCursor = text.substring(0, start)
    const afterCursor = text.substring(end)

    const wordMatch = beforeCursor.match(/\b\w+$/) || ['']
    const wordStart = start - wordMatch[0].length
    const wordEnd = end + (afterCursor.match(/^\w+\b/)?.[0]?.length || 0)

    selectedText = text.substring(wordStart, wordEnd)

    if (!selectedText.trim()) return

    textarea.selectionStart = wordStart
    textarea.selectionEnd = wordEnd
  }

  if (selectedText.endsWith(' ')) after = `${after} `
  if (selectedText.startsWith(' ')) before = ` ${before}`

  const newText = `${before}${selectedText.trim()}${after}`
  localPost.value.content =
    text.substring(0, textarea.selectionStart) + newText + text.substring(textarea.selectionEnd)
}

// Sync preview scroll

const initSyncScroll = () => {
  if (!editor.value || !preview.value?.markdownDiv) {
    return
  }

  const syncScroll = () => {
    if (!editor.value || !preview.value?.markdownDiv) return

    const editorScrollTop = editor.value.scrollTop
    const editorScrollHeight = editor.value.scrollHeight - editor.value.clientHeight
    const scrollPercentage = editorScrollTop / editorScrollHeight

    const previewScrollHeight =
      preview.value.markdownDiv.scrollHeight - preview.value.markdownDiv.clientHeight
    const targetScrollTop = scrollPercentage * previewScrollHeight

    requestAnimationFrame(() => {
      preview.value?.markdownDiv?.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      })
    })
  }

  editor.value.addEventListener('scroll', debounce(syncScroll, 50))
}

// Watch unsaved changes

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

const preventClose = (event: Event) => {
  if (store.unsavedChanges) {
    event.preventDefault()
  }
}

onBeforeMount(async () => {
  await fetchPost()
  initSyncScroll()
  await fetchSeries()
})

onMounted(async () => {
  window.addEventListener('beforeunload', preventClose)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', preventClose)
})

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
</script>

<template>
  <div class="flex justify-between items-center sticky top-0 bg-slate-50 dark:bg-gray-900 z-10">
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
    <div class="space-y-6">
      <label>
        <div class="font-semibold mb-2">Title</div>
        <input
          type="text"
          v-model="localPost.title"
          placeholder="Post Title"
          class="w-full border dark:border-gray-700 rounded p-2 outline-none"
        />
      </label>
      <div class="">
        <div class="font-semibold mb-2">Series</div>
        <div class="flex">
          <ComboBox :series="series" v-model="localPost.series" />
        </div>
      </div>
      <div class="">
        <div class="font-semibold mb-2">Image Preview</div>
        <img
          v-if="localPost?.imageUrl"
          :src="localPost.imageUrl"
          :alt="localPost.title"
          class="w-full rounded-lg bg-gray-200 dark:bg-gray-700 object-cover group-hover:opacity-75 aspect-[2/1]"
        />
      </div>
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
        <div class="flex bg-white dark:bg-zinc-900">
          <textarea
            v-model="localPost.previewContent"
            placeholder="Write your post content in markdown..."
            class="w-full border dark:border-gray-700 rounded-l rounded-r-none p-2 h-auto max-h-screen outline-none resize-none bg-inherit"
          ></textarea>
          <MarkdownDiv
            :content="localPost.previewContent"
            class="w-full max-h-screen border dark:border-gray-700 rounded-r p-4 prose prose-sm dark:prose-invert overflow-auto"
          />
        </div>
      </div>
      <div class="font-semibold mb-2">Post editor</div>
      <div class="flex bg-white dark:bg-zinc-900 max-h-screen">
        <div class="flex-1 border dark:border-gray-700 flex flex-col">
          <div class="font-semibold my-2 mx-4 text-sm">Markdown</div>
          <div class="flex gap-4 border-b dark:border-b-gray-700 p-2">
            <div class="flex gap-2">
              <button @click="insertMarkdown('**', '**')">
                <BoldIcon class="size-4" />
              </button>
              <button @click="insertMarkdown('*', '*')">
                <ItalicIcon class="size-4" />
              </button>
              <button @click="insertMarkdown('~~', '~~')">
                <StrikethroughIcon class="size-4" />
              </button>
              <button @click="insertMarkdown('++', '++')">
                <UnderlineIcon class="size-4" />
              </button>
            </div>
            <div class="flex gap-2">
              <button @click="insertMarkdown('^', '^')">
                <MarkdownDiv content="X^2^"></MarkdownDiv>
              </button>
              <button @click="insertMarkdown('~', '~')">
                <MarkdownDiv content="X~2~"></MarkdownDiv>
              </button>
            </div>
            <div class="flex gap-2">
              <button @click="insertMarkdown('# ')" class="">H1</button>
              <button @click="insertMarkdown('## ')" class="">H2</button>
              <button @click="insertMarkdown('### ')" class="">H3</button>
            </div>
            <div class="flex gap-2">
              <button @click="insertMarkdown('[', '](LinkHere)')">
                <LinkIcon class="size-4" />
              </button>
              <button @click="insertMarkdown('```\n', '\n```')">
                <CodeBracketIcon class="size-4" />
              </button>
            </div>
          </div>
          <textarea
            v-model="localPost.content"
            ref="editor"
            placeholder="Write your post content in markdown..."
            class="w-full border-none rounded-bl rounded-r-none p-2 outline-none resize-none overflow-visible flex-grow text-base/7 bg-white dark:bg-zinc-900"
          />
        </div>
        <div class="flex-1 border dark:border-gray-700 border-l-0 flex flex-col">
          <div class="font-semibold py-2 px-4 text-sm border-b dark:border-b-gray-700">Preview</div>
          <MarkdownDiv
            ref="preview"
            :content="localPost.content"
            class="w-full rounded-r p-4 prose dark:prose-invert overflow-y-scroll"
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
