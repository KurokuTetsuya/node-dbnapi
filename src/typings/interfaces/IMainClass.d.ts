import { RequestClass } from './IRequestClass'

export interface MainClass {
  request: RequestClass
	clientid: string
	ownerid: string
	sessionid: string | null
	version: string
}
