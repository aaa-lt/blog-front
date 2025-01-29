import { PostOrder } from '@/types/PostOrder.enum'
import type { GetFullPostResponse } from '@/types/PostResponse'
import type { GetPostsResponse } from '@/types/PostsResponse'
import type { GetAllSeriesResponse } from '@/types/SeriesManyResponse'
import type { GetSeriesByPathResponse } from '@/types/SeriesOneResponse'

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const fetchPostByRoute = async (route: string) => {
  try {
    const response: GetFullPostResponse = await fetch(`${baseUrl}/posts/${route}`).then((res) =>
      res.json(),
    )

    return response
  } catch (err) {
    console.log(err)
  }
}

export const fetchRecentPosts = async (
  limit: number = 10,
  offset: number = 0,
  order: PostOrder = PostOrder.DESC,
  seriesPath?: string,
) => {
  try {
    const response: GetPostsResponse = await fetch(
      `${baseUrl}/posts?` +
        new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
          order: order,
          ...(seriesPath && { seriesPath }),
        }),
    ).then((res) => res.json())

    return response
  } catch (err) {
    console.log(err)
  }
}

export const fetchAllSeries = async (limit: number = 10, offset: number = 0) => {
  try {
    const response: GetAllSeriesResponse = await fetch(
      `${baseUrl}/series?` +
        new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
        }),
    ).then((res) => res.json())

    return response
  } catch (err) {
    console.log(err)
  }
}

export const fetchSeriesByPath = async (path: string) => {
  try {
    const response: GetSeriesByPathResponse = await fetch(`${baseUrl}/series/${path}`).then((res) =>
      res.json(),
    )

    return response
  } catch (err) {
    console.log(err)
  }
}
