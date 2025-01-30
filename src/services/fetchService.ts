import { ref } from 'vue'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const useFetch = <T>() => {
  const data = ref<T | null>(null)
  const error = ref<unknown>(null)
  const isLoading = ref(false)

  const fetchData = async (url: string, params?: URLSearchParams) => {
    isLoading.value = true
    try {
      const query = params ? `?${params}` : ''

      const res = await fetch(`${baseUrl}${url}${query}`)

      const jsonData: T = await res.json()
      data.value = jsonData
    } catch (err) {
      error.value = err
    } finally {
      setTimeout(() => (isLoading.value = false), 1200)
    }
  }

  return { data, error, isLoading, fetchData }
}
