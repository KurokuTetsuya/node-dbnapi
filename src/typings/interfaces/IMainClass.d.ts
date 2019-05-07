import { RequestClass } from './IRequestClass'

export interface MainClass {
  request: RequestClass
  token: string
	clientid: string
	ownerid: string
	sessionid: string | null
	version: string
}