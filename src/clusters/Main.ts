import { MainClass } from '../typings/interfaces/IMainClass'
import { RequestHeaders, IUser, IBot, IToken, ArrayBot } from '../typings/interfaces/IRequestClass'
import { Request } from '../api/Request'
import meta from '../../package.json'
import { User } from './User'
import { Bot } from './Bot'
import { ErrCode } from '../errors/Error'

/**
 * Main module, the source of Discord Bots Nation API workflow.
 * Contains classes that wraps function to access DBN REST API.
 * @module Main
 * @author Riichi_Rusdiana#6815
 * @implements {MainClass}
 */
export class Client implements MainClass {
  public request: Request
  public token: string
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
  constructor(token: string, clientid: string, ownerid: string) {
    const header: RequestHeaders = {'Content-Type': 'application/json', 'User-Agent': `dbnapi/${this.version}`}
    this.request = new Request('discordbots.xyz', header)
    this.token = token
    this.clientid = clientid
    this.ownerid = ownerid
    this.sessionid = null
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
   * @returns {Promise<any>}
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
        ownedBy: body.ownedBy,
      }
      return new Bot(userResolved)
    }

    const body: IUser = user
    const userResolved: IUser = {
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
    return new User(userResolved)
  }

  /**
   * Validates Token Session.
   * @param {string} token The string token to validate.
   * @private
   * @returns {boolean}
   */
  public async tokenValidator(token: string): Promise<boolean> {
    // tslint:disable-next-line: object-literal-shorthand
    const response: any = await this.request.post('tokenValidator', { token: token })
    const body = response
    if (body.isThatTokenValid === false) { return false } else { return true }
  }

  /**
   * Fetch Token Session.
   * @private
   * @returns {Promise}
   */
  private async fetchToken(token: string, clientID: string, ownerID: string): Promise<IToken> {
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

    // MALAH BIKIN ERROR NI LINE, KONTOL!
    // const bots: Array<string> = []
    // ownedBy.bots!.forEach((bot: ArrayBot) => {
    //   bots.push(bot.botID as string)
    // })
    // if (!bots.includes(clientID)) {
    //   const bot = await this.fetchUser(clientID)
    //   if (!bot) { throw new ErrCode('INVALID_CLIENT_ID_NULL') }
    //   if (bot.bot !== true) { throw new ErrCode('NOT_A_BOT', clientID) }
    //   throw new ErrCode('NOT_OWNER', bot.tag)
    // }

    // const ownerUser = await this.fetchUser(ownerID)
    // if (!ownerUser) { throw new ErrCode('INVALID_OWNER_ID_NULL') }

    return returns
  }
}
