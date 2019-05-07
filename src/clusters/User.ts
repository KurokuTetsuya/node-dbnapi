import { IUser, ArrayBot } from '../typings/interfaces/IRequestClass'

/**
 * User resolved module, contains getter and setter for interface {IUser}.
 * @module UserClass
 * @author Riichi_Rusdiana#6815
 * @implements {IUser}
 */
export class User implements IUser {
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
  public bots?: Array<ArrayBot>
  constructor(usermeta: IUser) {
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
    this.bots = usermeta.bots
  }
}
