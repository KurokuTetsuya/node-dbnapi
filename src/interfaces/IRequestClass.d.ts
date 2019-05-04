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
  body: any
  Response: Response
  ResponseType: ResponseType
  Credential: RequestCredentials
}

export type RequestHeaders = Headers | string[][] | { [key: string]: string }

export interface User {
  id: String,
  username: String
  discriminator: String
  tag: String
  avatar: String
  avatarURL: String
  displayAvatarURL: String
  bot: Boolean
  createdTimestamp: Number
  bots: Array<ArrayBot>
}

export interface ArrayBot {
  ownerID: String
  botID: String
  prefix: String
  accepted: Boolean
  claimed: Boolean
}

export interface OwnedBy {
  
}

export interface Bot {
  id: String
  username: String
  discriminator: String
  tag: String
  avatar: String
  avatarURL: String
  displayAvatarURL: String
  bot: Boolean
  createdTimestamp: Number
  ownedBy: 
}