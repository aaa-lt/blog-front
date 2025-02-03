import router from '@/router'
import { useFetch } from '@/services/fetchService'
import type { AuthState } from '@/types/AuthState'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: null,
    user: null,
  }),
  persist: true,

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    async login(email: string, password: string) {
      const { data, error, fetchData } = useFetch<AuthState>()

      await fetchData('/auth/login', {
        init: {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        },
      })

      if (error.value) {
        console.log(error.value)
        return
      }

      if (data.value) {
        this.accessToken = data.value.accessToken
        this.user = data.value.user

        router.push({ name: 'home' })
      }
    },

    logout() {
      this.accessToken = null
      this.user = null
    },
  },
})
