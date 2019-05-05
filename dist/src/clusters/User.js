"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * User resolved module, contains getter and setter for interface {IUser}.
 * @module UserClass
 * @author Riichi_Rusdiana#6815
 * @implements {IUser}
 */
class User {
    constructor(usermeta) {
        this.id = usermeta.id;
        this.username = usermeta.username;
        this.discriminator = usermeta.discriminator;
        this.tag = usermeta.tag;
        this.avatar = usermeta.avatar;
        this.avatarURL = usermeta.avatarURL;
        this.displayAvatarURL = usermeta.displayAvatarURL;
        this.bot = usermeta.bot;
        this.createdTimestamp = usermeta.createdTimestamp;
        this.createdAt = usermeta.createdAt;
        this.bots = usermeta.bots;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map