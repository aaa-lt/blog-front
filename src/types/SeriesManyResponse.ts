export class GetAllSeriesResponse {
  items: Series[]
  count: number
}

export class Series {
  title: string

  createdAt: Date

  path: string
}
