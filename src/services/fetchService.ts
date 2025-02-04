import { useAuthStore } from '@/store/auth'
import { ref } from 'vue'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export class FetchError extends Error {
  status: number | null

  constructor(status: number | null, message: string) {
    super(message)
    this.status = status
    this.name = 'FetchError'
  }
}

interface FetchSettings {
  query?: URLSearchParams
  init?: RequestInit
}

const buildHeaders = (accessToken: string | null) => {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (accessToken) {
    Object.assign(headers, { Authorization: `Bearer ${accessToken}` })
  }
  return headers
}

export const useFetch = <T>() => {
  const data = ref<T | null>(null)
  const error = ref<FetchError | null>(null)
  const isLoading = ref(false)

  const fetchData = async (url: string, settings?: FetchSettings) => {
    const authStore = useAuthStore()
    isLoading.value = true

    try {
      const query = settings?.query ? `?${settings.query}` : ''
      const headers = buildHeaders(authStore.accessToken)

      const res = await fetch(`${baseUrl}${url}${query}`, {
        headers,
        ...settings?.init,
      })

      if (!res.ok) throw new FetchError(res.status, res.statusText)

      const jsonData: T = await res.json()
      data.value = jsonData
    } catch (err) {
      if (err instanceof FetchError) {
        error.value = err
        return
      }

      error.value = new FetchError(null, String(err))
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, fetchData }
}
