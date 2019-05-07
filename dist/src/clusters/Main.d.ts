import { MainClass } from '../typings/interfaces/IMainClass';
import { IUser, IBot } from '../typings/interfaces/IRequestClass';
import { Request } from '../api/Request';
/**
 * Main module, the source of Discord Bots Nation API workflow.
 * Contains classes that wraps function to access DBN REST API.
 * @module Main
 * @author Riichi_Rusdiana#6815
 * @implements {MainClass}
 */
export declare class Client implements MainClass {
    request: Request;
    token: string;
    clientid: string;
    ownerid: string;
    sessionid: string | null;
    version: string;
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
    private fetchToken;
}
//# sourceMappingURL=Main.d.ts.map