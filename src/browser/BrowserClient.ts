import { Agent } from 'https'
import fetch from 'cross-fetch'
import { MainClass } from '../typings/interfaces/IMainClass'
import { RequestClass, RequestHeaders, IToken, IUser, IBot, ArrayBot } from '../typings/interfaces/IRequestClass'
import { User } from '../clusters/User'
import { Bot } from '../clusters/Bot'
import * as Es6Polyfill from 'es6-promise'
Es6Polyfill.polyfill()
import meta from '../../package.json'
const header = '[DBNAPI Error]'
let agent: Agent
if (Agent) { agent = new Agent({ keepAlive: true }) }
export class BrowserClient implements MainClass {
  public static getVersion() { return meta.version as string }
  public request: RequestClass
  public sessionid: string | null = null
  public version: string = BrowserClient.getVersion()
  constructor(private token: string, public clientid: string, public ownerid: string) {
    // tslint:disable-next-line: new-parens max-classes-per-file
    this.request = new (class Request implements RequestClass {
      public version: String = BrowserClient.getVersion()
      public agent: Agent = agent
      constructor(public url: String, public headers: RequestHeaders) {}
      public post(endpoint: String, data: any): Promise<import('../typings/interfaces/IRequestClass').ResponsePost> {
        const headers = this.headers
        // tslint:disable-next-line: no-empty
        return new Promise((resolve, reject) => {
          try {
            fetch(`https://${this.url}/api/${endpoint}`, {
              method: 'post',
              // tslint:disable-next-line: object-literal-sort-keys
              body: JSON.stringify(data),
              headers }).then((res) => resolve(res.json()))
          } catch (err) { reject(err) }
        })
      }
      public get(endpoint: String): Promise<import('../typings/interfaces/IRequestClass').ResponseGet> {
        const headers = this.headers
        // tslint:disable-next-line: no-empty
        return new Promise((resolve, reject) => {
          try {
            fetch(`https://${this.url}/api/${endpoint}`, {
              method: 'get',
              // tslint:disable-next-line: object-literal-sort-keys
              headers }).then((res) => resolve(res.json()))
          } catch (err) { reject(err) }
        })
      }
    })('discordbots.xyz', { 'Content-Type': 'application/json', 'User-Agent': 'dbnapi/' + this.version })
    if (token || token !== undefined || token !== '') {
      this.tokenValidator(token).then((valid) => {
        if (valid === false) { throw new Error(`${header} Your token is invalid!`) } else {
          if (valid === true) { this.fetchToken(token, clientid, ownerid).then((fetchedToken) => {
            this.sessionid = fetchedToken.ownedBy!.username as string
            console.log(`[DBNAPI] You are logged in as: ${fetchedToken.ownedBy!.tag}`)
          })}
        }
      })
    }
  }
  public async fetchUser(clientID: string): Promise<IUser | IBot | undefined> {
    if (!clientID) { throw new Error(`${header} Invalid Client ID!`)}
    const user: any = await this.request.get(`fetchUser?id=${clientID}`)
    if (user.error === 'unknown_user') { return undefined }
    if (user.bot === true) {
      const meta: any = await this.request.get(`bots/${clientID}`)
      if (meta.error === 'unknown_user') { return undefined }
      const metadata: ArrayBot = meta
      const body: IBot = user
      const createdUser: IUser = this.constructUser(body.ownedBy as IUser)
      const userResolved: IBot = {
        id: body.id,
        username: body.username,
        discriminator: body.discriminator,
        tag: body.tag,
        avatar: body.avatar,
        avatarURL: body.avatarURL,
        displayAvatarURL: body.displayAvatarURL,
        bot: body.bot,
        createdTimestamp: body.createdTimestamp,
        createdAt: new Date(body.createdTimestamp),
        metadata,
        ownedBy: new User(createdUser),
      }
      return new Bot(userResolved)
    }
    const body: IUser = user
    return new User(this.constructUser(body))
  }
  public constructUser(body: IUser): IUser {
    return {
      id: body.id,
      username: body.username,
      discriminator: body.discriminator,
      tag: body.tag,
      avatar: body.avatar,
      avatarURL: body.avatarURL,
      displayAvatarURL: body.displayAvatarURL,
      bot: body.bot,
      createdAt: new Date(body.createdTimestamp),
      createdTimestamp: body.createdTimestamp,
      bots: body.bots,
    }
  }
  public async tokenValidator(token: string): Promise<boolean> {
    // tslint:disable-next-line: object-literal-shorthand
    const response: any = await this.request.post('tokenValidator', { token: token })
    const body = response
    if (body.isThatTokenValid === false) { return false } else { return true }
  }
  public async fetchToken(token: string, clientID: string, ownerID: string): Promise<IToken> {
    // tslint:disable-next-line: object-literal-shorthand
    const response: any = await this.request.post('fetchToken', { token: token })
    const body = response as IToken
    let ownedBy: IUser | undefined = body.ownedBy as IUser
    let returns: IToken = { valid: body.valid, owned: body.owned, ownedBy }
    if (body.valid === false) { throw new Error(`${header} Your token is invalid!`) }
    if (body.owned === false || body.ownedBy === undefined) {
      ownedBy = undefined
      return returns = { valid: false, owned: false, ownedBy }
    }
    if (body.ownedBy === null || body.ownedBy === undefined) {
      ownedBy = undefined
      return returns = { valid: false, owned: false, ownedBy }
    }
    return returns
  }
}
