<script setup lang="ts">
import type { User } from '@/types/UsersResponse'

defineProps<{ user: User }>()
</script>

<template>
  <td
    class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:w-auto sm:max-w-none sm:pl-0"
  >
    {{ user.name }}
    <dl class="font-normal lg:hidden">
      <dt class="sr-only sm:hidden">Email</dt>
      <dd class="mt-1 truncate text-gray-500 dark:text-gray-400 sm:hidden">
        {{ user.email }}
      </dd>
    </dl>
  </td>
  <td class="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-400 sm:table-cell">
    {{ user.email }}
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
    {{ user.isOp ? 'Admin' : 'Editor' }}
  </td>
  <td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
    <a href="#" class="text-indigo-600 hover:text-indigo-900"
      >Edit<span class="sr-only">, {{ user.name }}</span></a
    >
  </td>
</template>
