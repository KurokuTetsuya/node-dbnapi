import { IBot, IUser } from '../interfaces/IRequestClass'

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
  public createdTimestamp: Number
  public createdAt: Object
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
    this.ownedBy = usermeta.ownedBy
  }
}
