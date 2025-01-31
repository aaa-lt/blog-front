<script lang="ts" setup>
import { ChevronRightIcon } from '@heroicons/vue/16/solid'

type itemsType = {
  title: string
  path: string
}

defineProps({
  title: String,
  items: {
    type: Array as () => itemsType[],
    required: true,
  },
})
</script>

<template>
  <div v-if="items.length > 0">
    <div class="flex gap-2 items-center justify-between mb-4">
      <p class="text-xl font-medium text-gray-900 dark:text-white">{{ title }}</p>
    </div>

    <ul
      role="list"
      class="space-y-2 border-b border-gray-200 dark:border-gray-700 mb-4 pb-6 text-sm text-gray-900 dark:text-gray-300"
    >
      <li v-for="item in items" :key="item.path">
        <RouterLink :to="'/series/' + item.path" class="flex items-start gap-x-0.5 group">
          <ChevronRightIcon
            class="size-4 min-w-4 object-contain mt-[0.2rem] transition group-hover:scale-125 group-hover:translate-x-[0.05rem] group-hover:fill-indigo-700 dark:group-hover:fill-indigo-500"
          />
          <div class="flex-grow">{{ item.title }}</div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
