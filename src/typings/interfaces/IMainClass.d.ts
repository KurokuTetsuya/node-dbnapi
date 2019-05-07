import { RequestClass, IUser, IBot, IToken, BotsController, ArrayBot } from './IRequestClass'

export interface MainClass {
  request: RequestClass
	clientid: string
	ownerid: string
	sessionid: string | null
	version: string
	fetchUser(clientID: string): Promise<IUser | IBot | undefined>
	fetchToken(token: string, clientID: string, ownerID: string): Promise<IToken>
	tokenValidator(token: string): Promise<boolean>
	bots(index?: number): Promise<BotsController | ArrayBot>
}
