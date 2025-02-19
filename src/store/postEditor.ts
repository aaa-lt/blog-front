import { FetchError, useFetch } from '@/services/fetchService'
import { GetFullPostById } from '@/types/PostResponse'
import { defineStore } from 'pinia'

export const usePostEditorStore = defineStore('postEditor', {
  state: () => ({
    post: {} as GetFullPostById,
    postIsLoading: false,
    postError: null as FetchError | null,
    unsavedChanges: false,
  }),
  actions: {
    async fetchPost(id: string) {
      const { data: post, error, fetchData } = useFetch<GetFullPostById>()

      try {
        this.postIsLoading = true

        await fetchData(`/admin/posts/${id}`)

        if (error.value) {
          this.postError = error.value
        }

        if (post.value) {
          this.post = post.value
        }
      } finally {
        this.postIsLoading = false
      }
    },
    async savePost(updatedPost: GetFullPostById) {
      const { data: post, error, fetchData } = useFetch<GetFullPostById>()

      try {
        this.postIsLoading = true

        await fetchData(`/admin/posts/${updatedPost.id}`, {
          init: {
            method: 'PATCH',
            body: JSON.stringify(updatedPost),
          },
        })

        if (error.value) {
          this.postError = error.value
        }

        if (post.value) {
          this.post = post.value
          console.log('saved!')
        }
      } finally {
        this.postIsLoading = false
      }
    },
    setUnsavedChanges(status: boolean) {
      this.unsavedChanges = status
    },
  },
})
