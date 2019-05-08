import { MainClass } from '../typings/interfaces/IMainClass';
import { RequestClass, IToken, IUser, IBot, ArrayBot } from '../typings/interfaces/IRequestClass';
export declare class BrowserClient implements MainClass {
    private token;
    clientid: string;
    ownerid: string;
    static getVersion(): string;
    request: RequestClass;
    sessionid: string | null;
    version: string;
    constructor(token: string, clientid: string, ownerid: string);
    bots(index?: number): Promise<import('../typings/interfaces/IRequestClass').BotsController | ArrayBot>;
    fetchUser(clientID: string): Promise<IUser | IBot | undefined>;
    constructUser(body: IUser): IUser;
    tokenValidator(token: string): Promise<boolean>;
    fetchToken(token: string, clientID: string, ownerID: string): Promise<IToken>;
}
//# sourceMappingURL=BrowserClient.d.ts.map