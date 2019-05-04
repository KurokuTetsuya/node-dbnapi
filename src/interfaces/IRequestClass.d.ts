import { ResponseType, Response, FetchError, RequestCredentials } from 'node-fetch'

export interface RequestClass {
  url: String
	version: String
  headers: any
  post(endpoint: String, data: JSON | any): Promise<ResponsePost>
  get(endpoint: String): Promise<ResponseGet>
}

export interface ResponseGet {
  Response: Response
  ResponseType: ResponseType
  Credential: RequestCredentials
}

export interface ResponsePost {
  Response: Response
  ResponseType: ResponseType
  Credential: RequestCredentials
}

export type RequestHeaders = Headers | string[][] | { [key: string]: string }
