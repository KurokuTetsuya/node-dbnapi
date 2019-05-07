import { IBot, IUser, ArrayBot } from '../typings/interfaces/IRequestClass'

/**
 * User resolved module, contains getter and setter for interface {IBot}.
 * @module BotClass
 * @author Riichi_Rusdiana#6815
 * @implements {IBot}
 */
export class Bot implements IBot {
  public id: String
  public username: String
  public discriminator: String
  public tag: String
  public avatar: String
  public avatarURL: String
  public displayAvatarURL: String
  public bot: Boolean
  public createdTimestamp: number
  public createdAt: Object
  public metadata?: ArrayBot
  public ownedBy?: IUser
  constructor(usermeta: IBot) {
    this.id = usermeta.id
    this.username = usermeta.username
    this.discriminator = usermeta.discriminator
    this.tag = usermeta.tag
    this.avatar = usermeta.avatar
    this.avatarURL = usermeta.avatarURL
    this.displayAvatarURL = usermeta.displayAvatarURL
    this.bot = usermeta.bot
    this.createdTimestamp = usermeta.createdTimestamp
    this.createdAt = usermeta.createdAt
    this.metadata = usermeta.metadata
    this.ownedBy = usermeta.ownedBy
  }

  public getMeta(): ArrayBot {
    return this.metadata as ArrayBot
  }
}
