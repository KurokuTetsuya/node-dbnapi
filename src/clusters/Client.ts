import { MainClass } from '../typings/interfaces/IMainClass'
import { RequestHeaders, IUser, IBot, IToken, ArrayBot, BotsController } from '../typings/interfaces/IRequestClass'
import { Request } from '../api/Request'
import meta from '../../package.json'
import { User } from './User'
import { Bot } from './Bot'
import { ErrCode } from '../errors/Error'

/**
 * Main module, the source of Discord Bots Nation API workflow.
 * Contains classes that wraps function to access DBN REST API.
 * @module Client
 * @author Riichi_Rusdiana#6815
 * @implements {MainClass}
 */
export class Client implements MainClass {
  public request: Request
  public clientid: string
  public ownerid: string
  public sessionid: string | null
  public version: string = meta.version
  /**
   * @constructor
   * @param {string} token The authentication token of your DBN profile.
   * @param {string} clientid The valid registered Discord Client Application ID.
   * @param {string} ownerid The valid registered Owner ID.
   */
  constructor(token: string,
              clientid: string,
              ownerid: string) {
    const header: RequestHeaders = {'Content-Type': 'application/json', 'User-Agent': `dbnapi/${this.version}`}
    this.request    = new Request('discordbots.xyz', header)
    this.clientid   = clientid
    this.ownerid    = ownerid
    this.sessionid  = null
    if (token || token !== undefined || token !== '') {
      this.tokenValidator(token).then((valid) => {
        if (valid === false) {
          throw new ErrCode('INVALID_TOKEN')
        } else {
          if (valid === true) {
            this.fetchToken(token, clientid, ownerid).then((fetchedToken) => {
              this.sessionid = fetchedToken.ownedBy!.username as string
              console.log(`[DBNAPI] You are logged in as: ${fetchedToken.ownedBy!.tag}`)
            })
          }
        }
      })
    }
  }

  /**
   * Fetch User Information.
   * @param {string} clientID Resolved User Client ID.
   * @public
   * @returns {Promise<IUser | IBot>}
   */
  public async fetchUser(clientID: string): Promise<IUser | IBot | undefined> {
    if (!clientID) { throw new ErrCode('INVALID_OWNER_ID_NULL')}
    const user: any = await this.request.get(`fetchUser?id=${clientID}`)
    if (user.error === 'unknown_user') { return undefined }
    if (user.bot === true) {
      const meta: any = await this.request.get(`bots/${clientID}`)
      if (meta.error === 'unknown_user') { return undefined }
      const metadata: ArrayBot = meta
      const body: IBot = user
      const createdUser: IUser = this.constructUser(body.ownedBy as IUser)
      const userResolved: IBot = {
        id:                 body.id,
        username:           body.username,
        discriminator:      body.discriminator,
        tag:                body.tag,
        avatar:             body.avatar,
        avatarURL:          body.avatarURL,
        displayAvatarURL:   body.displayAvatarURL,
        bot:                body.bot,
        createdTimestamp:   body.createdTimestamp,
        createdAt:          new Date(body.createdTimestamp),
        metadata,
        ownedBy:            new User(createdUser),
      }
      return new Bot(userResolved)
    }

    const body: IUser = user
    return new User(this.constructUser(body))
  }

  public constructUser(body: IUser): IUser {
    return {
      id:                 body.id,
      username:           body.username,
      discriminator:      body.discriminator,
      tag:                body.tag,
      avatar:             body.avatar,
      avatarURL:          body.avatarURL,
      displayAvatarURL:   body.displayAvatarURL,
      bot:                body.bot,
      createdAt:          new Date(body.createdTimestamp),
      createdTimestamp:   body.createdTimestamp,
      bots:               body.bots,
    }
  }

  /**
   * Fetch list of bots registered to DiscordBotsNation.
   * @method bots
   * @param {string} index The index number of bot. Use id for precise fetch. Empty to do a full fetch.
   * @returns {Promise<BotsController>}
   */
  public async bots(index?: number): Promise<BotsController | ArrayBot> {
    const response: any = await this.request.get('bots')
    response.Array = await this.request.get('botsArray')
    const body = response
    if (index) {
      if (index.toString().length > 4) {
        return body[index] as ArrayBot
      }
      return body.Array[index] as ArrayBot
    }
    return {
      body,
      array: () => {
        return body.Array as Array<ArrayBot>
      },
      map: () => {
        const resolved: Map<String, ArrayBot> = new Map()
        body.Array.forEach((element: ArrayBot) => {
          resolved.set(element.botID, element)
        })
        return resolved
      },
    }
  }

  /**
   * Validates Token Session.
   * @param {string} token The string token to validate.
   * @private
   * @returns {Promise<Boolean>}
   */
  public async tokenValidator(token: string): Promise<boolean> {
    // tslint:disable-next-line: object-literal-shorthand
    const response: any = await this.request.post('tokenValidator', { token: token })
    const body = response
    if (body.isThatTokenValid === false) { return false } else { return true }
  }

  /**
   * Fetch Token Session.
   * @public
   * @returns {Promise<IToken>}
   */
  public async fetchToken(token: string, clientID: string, ownerID: string): Promise<IToken> {
    // tslint:disable-next-line: object-literal-shorthand
    const response: any = await this.request.post('fetchToken', { token: token })
    const body = response as IToken
    let ownedBy: IUser | undefined = body.ownedBy as IUser
    let returns: IToken = { valid: body.valid, owned: body.owned, ownedBy }
    if (body.valid === false) { throw new ErrCode('INVALID_TOKEN') }
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
