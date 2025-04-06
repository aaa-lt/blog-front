<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import type { TrimmedSeries } from '@/types/SeriesManyResponse'

const props = defineProps<{
  series: TrimmedSeries[]
}>()

const selected = defineModel<TrimmedSeries>()

const query = ref('')

const filteredSeries = computed(() =>
  query.value === ''
    ? props.series
    : props.series.filter((item) =>
        item.title
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, '')),
      ),
)
</script>

<template>
  <Combobox v-model="selected" nullable>
    <div class="relative mt-1 w-full">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      >
        <ComboboxInput
          class="w-full border rounded p-2 outline-none"
          :displayValue="(item) => (item as TrimmedSeries)?.title"
          @change="query = $event.target.value"
          placeholder="No series selected"
        />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredSeries.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="item in filteredSeries"
            as="template"
            :key="item.id"
            :value="item"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-teal-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ item.title }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>
