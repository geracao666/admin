export type PaginationParams = {
  page: number
  limit: number
}

export type PaginationResponse<T = unknown> = PaginationParams & {
  data: T[]
  total: number
}