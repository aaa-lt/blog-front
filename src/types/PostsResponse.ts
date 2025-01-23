export class GetPostsResponse {
  items: Post[]
  count: number
}

export class Post {
  id: string

  title: string

  previewContent: string

  imageUrl?: string

  createdAt: Date

  seriesPostId: number

  path: string

  series: {
    id: string
    title: string
  }
}
