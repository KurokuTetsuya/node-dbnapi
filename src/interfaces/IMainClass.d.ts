import { RequestClass } from "./IRequestClass";

export interface MainClass {
  request: RequestClass
  token: string
	clientid: string
	ownerid: string
	version: string
}
