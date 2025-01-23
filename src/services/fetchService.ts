import type { GetPostResponse } from '@/types/PostResponse'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const fetchPostByRoute = async (route: string) => {
  try {
    const response: GetPostResponse = await fetch(`${baseUrl}/posts/${route}`).then((res) =>
      res.json(),
    )
    return response
  } catch (err) {
    console.log(err)
  }
}
