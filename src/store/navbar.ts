import { useFetch } from '@/services/fetchService'
import type { GetPostsResponse, Post } from '@/types/PostsResponse'
import type { GetAllSeriesResponse, Series } from '@/types/SeriesManyResponse'
import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useNavbarStore = defineStore('navbar', {
  state: () => ({
    posts: [] as Post[],
    postCount: 0 as number,
    series: [] as Series[],
    seriesCount: 0 as number,
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchPosts() {
      const { data, error, isLoading, fetchData } = useFetch<GetPostsResponse>()

      const watcher = watch([error, isLoading], ([error, isLoading]) => {
        this.isLoading = isLoading
        this.error = error ? String(error) : null
      })

      try {
        await fetchData('/posts', new URLSearchParams({ limit: '5' }))

        if (data.value?.items) {
          this.posts = data.value.items
          this.postCount = data.value.count
        }
      } finally {
        watcher()
      }
    },

    async fetchSeries() {
      const { data, error, isLoading, fetchData } = useFetch<GetAllSeriesResponse>()

      const watcher = watch([error, isLoading], ([error, isLoading]) => {
        this.isLoading = isLoading
        this.error = error ? String(error) : null
      })

      try {
        await fetchData('/series', new URLSearchParams({ limit: '10' }))

        if (data.value?.items) {
          this.series = data.value.items
          this.seriesCount = data.value.count
        }
      } finally {
        watcher()
      }
    },

    async fetchAll() {
      await Promise.all([this.fetchPosts(), this.fetchSeries()])
    },

    async loadMoreSeries() {
      if (this.series.length >= this.seriesCount) return

      const { data, error, isLoading, fetchData } = useFetch<GetAllSeriesResponse>()

      const watcher = watch([error, isLoading], ([error, isLoading]) => {
        this.isLoading = isLoading
        this.error = error ? String(error) : null
      })

      try {
        await fetchData(
          '/series',
          new URLSearchParams({ limit: '10', offset: `${this.series.length}` }),
        )

        if (data.value?.items) {
          this.series.push(...data.value.items)
        }
      } finally {
        watcher()
      }
    },
  },
})
