import { FetchError } from 'node-fetch'

export interface RequestError {
  name: string
  code?: string
  errno?: number
}

export interface ResolvedError {
  content: string
  errno: number
}
