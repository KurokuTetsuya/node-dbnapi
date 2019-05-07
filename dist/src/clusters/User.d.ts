import { IUser, ArrayBot } from '../typings/interfaces/IRequestClass';
/**
 * User resolved module, contains getter and setter for interface {IUser}.
 * @module UserClass
 * @author Riichi_Rusdiana#6815
 * @implements {IUser}
 */
export declare class User implements IUser {
    id: String;
    username: String;
    discriminator: String;
    tag: String;
    avatar: String;
    avatarURL: String;
    displayAvatarURL: String;
    bot: Boolean;
    createdTimestamp: number;
    createdAt: Object;
    bots?: Array<ArrayBot>;
    constructor(usermeta: IUser);
}
//# sourceMappingURL=User.d.ts.map