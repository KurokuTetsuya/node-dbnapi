import { MainClass } from '../interfaces/IMainClass'
import { RequestHeaders } from '../interfaces/IRequestClass'
import { Request } from '../api/Request'
import meta from '../../package.json'

/**
 * Main module, the source of Discord Bots Nation API workflow.
 * Contains classes that wraps function to access DBN REST API.
 * @module Main
 * @author Riichi_Rusdiana#6815
 * @implements {MainClass}
 */
export class Main implements MainClass {
  public request: Request
  public token: string
  public clientid: string
  public ownerid: string
  public version: string = meta.default.version
  constructor(token: string, clientid: string, ownerid: string) {
    const header: RequestHeaders = {'Content-Type': 'application/json', 'User-Agent': `dbnapi.js/${this.version}`}
    this.request = new Request('https://discordbots.xyz/api', header)
    this.token = token
    this.clientid = clientid
    this.ownerid = ownerid

    if (token || token !== undefined || token !== '') {
      this.tokenValidator(token).then((valid) => {
        if (valid === false) {
          throw new RangeError('INVALID_TOKEN')
          // eslint-disable-line
        } else {
          if (valid === true) {
            this.fetchToken(token, clientid, ownerid).then((fetchedToken) => {
              // tslint:disable-next-line: no-console
              console.log(`[DBDAPI] You are logged in as: ${fetchedToken.ownedBy.tag}`)
            })
          }
        }
      })
    }
  }

  /**
   * Fetch User Information
   * @param {string} clientID Resolved User Client ID
   * @public
   * @returns {Promise<any>}
   */
  public async fetchUser(clientID: string): Promise<any> {
    if (!clientID) { throw new Error('INVALID_OWNER_ID_NULL')}
    const { body: user } = await this.request.get(`fetchUser?id=${clientID}`)
    if (user.error === 'unknown_user') { return undefined }
    let userResolved = null
    const body = user

    userResolved = {
        id: body.id,
        username: body.username,
        // tslint:disable-next-line: object-literal-sort-keys
        discriminator: body.discriminator,
        tag: body.tag,
        avatar: body.avatar,
        avatarURL: body.avatarURL,
        displayAvatarURL: body.displayAvatarURL,
        bot: body.bot,
        createdAt: new Date(body.createdTimestamp),
        createdTimestamp: body.createdTimestamp,
    } 

    if (user.bot === true || body.bot === true) { userResolved.ownedBy = body.ownedBy }
    // tslint:disable-next-line: one-line
    else { userResolved.bots = body.bots }

    return userResolved
  }

  /**
   * Validates Token Session
   * @private
   * @returns {boolean}
   */
  private async tokenValidator(token: string): Promise<boolean> {
    // tslint:disable-next-line: object-literal-shorthand
    const response = await this.request.post('tokenValidator', { token: token })
    const body = await response.body
    if (body.isThatTokenValid === false) { return false } else { return true }
  }

  /**
   * Fetch Token Session
   * @private
   * @returns {Promise}
   */
  private async fetchToken(token: string, clientID: string, ownerID: string): Promise<any> {
    // tslint:disable-next-line: object-literal-shorthand
    const response = await this.request.post('fetchToken', { token: token })
    const body = await response.body
    if (body.valid === false) { throw new Error('INVALID_TOKEN') }
    if (body.owned === false) { return 'Unknown Token' }
    if (body.ownedBy === null) { return 'Unknown Token' }
    const returns: any = {
      valid: body.valid,
      // tslint:disable-next-line: object-literal-sort-keys
      owned: body.owned,
      ownedBy: {
        id: body.ownedBy.id,
        username: body.ownedBy.username,
        // tslint:disable-next-line: object-literal-sort-keys
        discriminator: body.ownedBy.discriminator,
        tag: body.ownedBy.tag,
        avatar: body.ownedBy.avatar,
        avatarURL: body.ownedBy.avatarURL,
        displayAvatarURL: body.ownedBy.displayAvatarURL,
        bot: body.ownedBy.bot,
        createdAt: new Date(body.ownedBy.createdTimestamp),
        createdTimestamp: body.ownedBy.createdTimestamp,
        bots: body.ownedBy.bots,
      },
    }

    const bots: Array<string> = []
    // tslint:disable-next-line: no-shadowed-variable
    returns.ownedBy.bots.forEach((bot: any) => {
      bots.push(bot.botID)
    })
    if (!bots.includes(clientID)) {
      const bot = await this.fetchUser(clientID)
      if (!bot) { throw new Error('INVALID_CLIENT_ID_NULL') }
      if (bot.bot !== true) { throw new Error('NOT_A_BOT', clientID) }
      throw new Error('NOT_OWNER', bot.tag)
    }

    const ownerUser = await this.fetchUser(ownerID)
    if (!ownerUser) { throw new Error('INVALID_OWNER_ID_NULL') }

    return returns
  }
}
