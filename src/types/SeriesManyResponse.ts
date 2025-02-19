export interface GetAllSeriesResponse {
  data: Series[]
  meta: Meta
  links: Links
}

export interface Series {
  id: string

  title: string

  createdAt: Date

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
