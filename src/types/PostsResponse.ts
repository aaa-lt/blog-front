export interface GetPostsResponse {
  data: Post[]
  meta: Meta
  links: Links
}

export interface Post {
  id: string

  title: string

  previewContent: string

  imageUrl?: string

  createdAt: Date

  seriesPostId: number

  path: string

  series: Series
}

export interface Series {
  id: string

  title: string

  path: string
}

export interface Meta {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  totalPages: number
  sortBy: [string, string][]
  searchBy: string[]
  search: string
  select: string[]
  filter: Record<string, string>
}

export interface Links {
  first: string
  previous: string
  current: string
  next: string
  last: string
}
