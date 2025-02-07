<script setup lang="ts">
import AsideNav from '../structures/AsideNav.vue'

defineProps<{ isShown: boolean }>()
</script>

<template>
  <div class="bg-slate-50 dark:bg-gray-900 tramsition ease-out duration-300 h-full">
    <main class="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
      <section class="pb-24 pt-12">
        <div v-if="isShown" class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div class="lg:block">
            <AsideNav />
          </div>
          <div class="lg:col-span-3">
            <slot />
          </div>
        </div>
        <div v-else>
          <slot />
        </div>
      </section>
    </main>
  </div>
</template>
