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
          credentials: 'include',
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

    async register(name: string, email: string, password: string) {
      const { data, error, fetchData } = useFetch<AuthState>()

      await fetchData('/auth/register', {
        init: {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
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

    async logout() {
      const { fetchData } = useFetch()

      await fetchData('/auth/logout', {
        init: {
          method: 'POST',
          credentials: 'include',
        },
      })

      this.accessToken = null
      this.user = null

      router.push({ name: 'login' })
    },

    async refreshToken() {
      const { data, error, fetchData } = useFetch<{ accessToken: string | null }>()

      await fetchData('/auth/refresh', {
        init: {
          method: 'POST',
          credentials: 'include',
        },
      })

      if (error.value) {
        return this.logout()
      }

      if (data.value) {
        this.accessToken = data.value.accessToken
        return true
      }
    },
  },
})
