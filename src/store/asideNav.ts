import { FetchError, useFetch } from '@/services/fetchService'
import type { GetPostsResponse, Post } from '@/types/PostsResponse'
import type { GetAllSeriesResponse, Series } from '@/types/SeriesManyResponse'
import { defineStore } from 'pinia'

export const useAsideNavStore = defineStore('navbar', {
  state: () => ({
    posts: [] as Post[],
    postCount: 0,
    postIsLoading: false,
    postError: null as FetchError | null,

    series: [] as Series[],
    seriesCount: 0,
    seriesIsLoading: false,
    seriesError: null as FetchError | null,
  }),
  actions: {
    async fetchPosts() {
      const { data, error, fetchData } = useFetch<GetPostsResponse>()

      try {
        this.postIsLoading = true

        await fetchData('/posts', {
          query: new URLSearchParams({ limit: '5' }),
        })

        if (error.value) {
          this.postError = error.value
        }

        if (data.value?.data) {
          this.posts = data.value.data
          this.postCount = data.value.count
        }
      } finally {
        this.postIsLoading = false
      }
    },

    async fetchSeries() {
      const { data, error, fetchData } = useFetch<GetAllSeriesResponse>()

      try {
        this.seriesIsLoading = true

        await fetchData('/series', {
          query: new URLSearchParams({ limit: '10' }),
        })

        if (error.value) {
          this.seriesError = error.value
        }

        if (data.value?.items) {
          this.series = data.value.items
          this.seriesCount = data.value.count
        }
      } finally {
        this.seriesIsLoading = false
      }
    },

    async fetchAll() {
      await Promise.all([this.fetchPosts(), this.fetchSeries()])
    },
  },
})
