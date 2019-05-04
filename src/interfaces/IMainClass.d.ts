import { RequestClass } from "./IRequestClass";

export interface MainClass {
  session: RequestClass
  token: string
	clientid: string
	ownerid: string
	version: string
	loggedInAs: string
}
