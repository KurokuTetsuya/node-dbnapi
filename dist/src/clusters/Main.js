"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = require("../api/Request");
const package_json_1 = __importDefault(require("../../package.json"));
const User_1 = require("./User");
const Bot_1 = require("./Bot");
/**
 * Main module, the source of Discord Bots Nation API workflow.
 * Contains classes that wraps function to access DBN REST API.
 * @module Main
 * @author Riichi_Rusdiana#6815
 * @implements {MainClass}
 */
class Main {
    constructor(token, clientid, ownerid) {
        this.version = package_json_1.default.version;
        const header = { 'Content-Type': 'application/json', 'User-Agent': `dbnapi/${this.version}` };
        this.request = new Request_1.Request('https://discordbots.xyz/api', header);
        this.token = token;
        this.clientid = clientid;
        this.ownerid = ownerid;
        if (token || token !== undefined || token !== '') {
            this.tokenValidator(token).then((valid) => {
                if (valid === false) {
                    throw new RangeError('INVALID_TOKEN');
                    // eslint-disable-line
                }
                else {
                    if (valid === true) {
                        this.fetchToken(token, clientid, ownerid).then((fetchedToken) => {
                            // tslint:disable-next-line: no-console
                            console.log(`[DBDAPI] You are logged in as: ${fetchedToken.ownedBy.tag}`);
                        });
                    }
                }
            });
        }
    }
    /**
     * Fetch User Information.
     * @param {string} clientID Resolved User Client ID.
     * @public
     * @returns {Promise<any>}
     */
    async fetchUser(clientID) {
        if (!clientID) {
            throw new Error('INVALID_OWNER_ID_NULL');
        }
        const { body: user } = await this.request.get(`fetchUser?id=${clientID}`);
        if (user.error === 'unknown_user') {
            return undefined;
        }
        if (user.bot === true) {
            const body = user;
            const userResolved = {
                id: body.id,
                username: body.username,
                // tslint:disable-next-line: object-literal-sort-keys
                discriminator: body.discriminator,
                tag: body.tag,
                avatar: body.avatar,
                avatarURL: body.avatarURL,
                displayAvatarURL: body.displayAvatarURL,
                bot: body.bot,
                createdTimestamp: body.createdTimestamp,
                createdAt: new Date(body.createdTimestamp.toString()),
                ownedBy: body.ownedBy,
            };
            return new Bot_1.Bot(userResolved);
        }
        let userResolved;
        const body = user;
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
            createdAt: new Date(body.createdTimestamp.toString()),
            createdTimestamp: body.createdTimestamp,
            bots: body.bots,
        };
        return new User_1.User(userResolved);
    }
    /**
     * Validates Token Session
     * @private
     * @returns {boolean}
     */
    async tokenValidator(token) {
        // tslint:disable-next-line: object-literal-shorthand
        const response = await this.request.post('tokenValidator', { token: token });
        const body = await response.body;
        if (body.isThatTokenValid === false) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Fetch Token Session
     * @private
     * @returns {Promise}
     */
    async fetchToken(token, clientID, ownerID) {
        // tslint:disable-next-line: object-literal-shorthand
        const response = await this.request.post('fetchToken', { token: token });
        const body = await response.body;
        if (body.valid === false) {
            throw new Error('INVALID_TOKEN');
        }
        if (body.owned === false) {
            return 'Unknown Token';
        }
        if (body.ownedBy === null) {
            return 'Unknown Token';
        }
        const returns = {
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
        };
        const bots = [];
        // tslint:disable-next-line: no-shadowed-variable
        returns.ownedBy.bots.forEach((bot) => {
            bots.push(bot.botID);
        });
        if (!bots.includes(clientID)) {
            const bot = await this.fetchUser(clientID);
            if (!bot) {
                throw new Error('INVALID_CLIENT_ID_NULL');
            }
            if (bot.bot !== true) {
                throw new Error('NOT_A_BOT', clientID);
            }
            throw new Error('NOT_OWNER', bot.tag);
        }
        const ownerUser = await this.fetchUser(ownerID);
        if (!ownerUser) {
            throw new Error('INVALID_OWNER_ID_NULL');
        }
        return returns;
    }
}
exports.Main = Main;
//# sourceMappingURL=Main.js.map