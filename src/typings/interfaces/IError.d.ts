import { FetchError } from 'node-fetch'

export interface RequestError {
  header: string
  code?: string
  errno?: number
}

export interface ResolvedError {
  content: string
  errno: number
}
