<script setup lang="ts">
import hljs from 'highlight.js'
import MarkDownIt from 'markdown-it'
import { onBeforeMount, ref, watch } from 'vue'
import 'highlight.js/styles/atom-one-dark.min.css'

const md = new MarkDownIt({
  highlight: function (str, lang): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch {}
    }

    return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
  },
})

const props = defineProps<{ content: string }>()
const renderedMD = ref<string>()

const render = (content: string) => {
  renderedMD.value = md.render(content)
}

onBeforeMount(() => {
  render(props.content)
})

watch(props, () => {
  render(props.content)
})
</script>
<template>
  <div v-if="renderedMD" class="mx-auto" v-html="renderedMD"></div>
</template>
