<script setup lang="ts">
import MarkDownIt from 'markdown-it'

const md = new MarkDownIt()

const props = defineProps<{ content: string }>()

const renderedMD = md.render(props.content)

console.log(renderedMD)
</script>
<template>
  <div v-html="renderedMD"></div>
</template>
