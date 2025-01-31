import { ref } from 'vue'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

class FetchError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.name = 'FetchError'
  }
}

export const useFetch = <T>() => {
  const data = ref<T | null>(null)
  const error = ref<FetchError | null>(null)
  const isLoading = ref(false)

  const fetchData = async (url: string, params?: URLSearchParams) => {
    isLoading.value = true
    try {
      const query = params ? `?${params}` : ''

      const res = await fetch(`${baseUrl}${url}${query}`)

      if (!res.ok) throw new FetchError(res.status, res.statusText)

      const jsonData: T = await res.json()
      data.value = jsonData
    } catch (err) {
      if (err instanceof FetchError) {
        error.value = err
      }
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, fetchData }
}
