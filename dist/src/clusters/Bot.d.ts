import { IBot, IUser, ArrayBot } from '../typings/interfaces/IRequestClass';
/**
 * User resolved module, contains getter and setter for interface {IBot}.
 * @module BotClass
 * @author Riichi_Rusdiana#6815
 * @implements {IBot}
 */
export declare class Bot implements IBot {
    id: String;
    username: String;
    discriminator: String;
    tag: String;
    avatar: String;
    avatarURL: String;
    displayAvatarURL: String;
    bot: Boolean;
    createdTimestamp: Number;
    createdAt: Object;
    metadata?: ArrayBot;
    ownedBy?: IUser;
    constructor(usermeta: IBot);
    getMeta(): ArrayBot;
}
//# sourceMappingURL=Bot.d.ts.map