import { ResponseType, Response, FetchError, RequestCredentials } from 'node-fetch'

export interface RequestClass {
  url: String
	version: String
  headers: any
  post(endpoint: String, data: JSON | any): Promise<ResponsePost>
  get(endpoint: String): Promise<ResponseGet>
}

export interface ResponseGet {
  body: any
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

export interface IUser {
  id: String
  username: String
  discriminator: String
  tag: String
  avatar: String
  avatarURL: String
  displayAvatarURL: String
  bot: Boolean
  createdTimestamp: Number
  createdAt: Object
  bots?: Array<ArrayBot>
}

export interface ArrayBot {
  ownerID: String
  botID: String
  prefix: String
  accepted: Boolean
  claimed: Boolean
}

export interface IBot {
  id: String
  username: String
  discriminator: String
  tag: String
  avatar: String
  avatarURL: String
  displayAvatarURL: String
  bot: Boolean
  createdTimestamp: Number
  createdAt: Object
  metadata?: ArrayBot
  ownedBy?: IUser
}

export interface IToken {
	valid: boolean
	owned: boolean
	ownedBy?: IUser
}
