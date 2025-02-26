<script setup lang="ts">
import UsersTableRow from '@/components/molecules/UsersTableRow.vue'
import { useFetch } from '@/services/fetchService'
import type { User } from '@/types/UsersResponse'
import { onBeforeMount, ref } from 'vue'

const users = ref<User[]>([])

const { data, fetchData } = useFetch<User[]>()

const fetchPosts = async () => {
  await fetchData('/admin/users')

  if (data.value) {
    users.value = data.value
  }
}

onBeforeMount(() => {
  fetchPosts()
})
</script>

<template>
  <div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900 dark:text-white">Users</h1>
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add user
        </button>
      </div>
    </div>

    <div class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white md:pl-0"
              >
                Name
              </th>
              <th
                scope="col"
                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white md:table-cell"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
              >
                Role
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 md:pr-0">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">
              <UsersTableRow :user="user" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
