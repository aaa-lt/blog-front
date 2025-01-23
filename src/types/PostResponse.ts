export class GetPostResponse {
  id: string

  title: string

  content: string

  imageUrl?: string

  createdAt: Date

  seriesPostId: number

  path: string

  series: {
    id: string
    title: string
    path: string
  }
}
