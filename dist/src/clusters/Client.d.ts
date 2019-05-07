import { MainClass } from '../typings/interfaces/IMainClass';
import { IUser, IBot, IToken } from '../typings/interfaces/IRequestClass';
import { Request } from '../api/Request';
/**
 * Main module, the source of Discord Bots Nation API workflow.
 * Contains classes that wraps function to access DBN REST API.
 * @module Client
 * @author Riichi_Rusdiana#6815
 * @implements {MainClass}
 */
export declare class Client implements MainClass {
    request: Request;
    clientid: string;
    ownerid: string;
    sessionid: string | null;
    version: string;
    private token;
    /**
     * @constructor
     * @param {string} token The authentication token of your DBN profile.
     * @param {string} clientid The valid registered Discord Client Application ID.
     * @param {string} ownerid The valid registered Owner ID.
     */
    constructor(token: string, clientid: string, ownerid: string);
    /**
     * Fetch User Information.
     * @param {string} clientID Resolved User Client ID.
     * @public
     * @returns {Promise<any>}
     */
    fetchUser(clientID: string): Promise<IUser | IBot | undefined>;
    constructUser(body: IUser): IUser;
    /**
     * Validates Token Session.
     * @param {string} token The string token to validate.
     * @private
     * @returns {boolean}
     */
    tokenValidator(token: string): Promise<boolean>;
    /**
     * Fetch Token Session.
     * @private
     * @returns {Promise}
     */
    fetchToken(token: string, clientID: string, ownerID: string): Promise<IToken>;
}
//# sourceMappingURL=Client.d.ts.map