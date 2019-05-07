import { MainClass } from '../typings/interfaces/IMainClass';
import { RequestClass } from '../typings/interfaces/IRequestClass';
export declare class BrowserClient implements MainClass {
    private token;
    clientid: string;
    ownerid: string;
    static getVersion(): string;
    request: RequestClass;
    sessionid: string | null;
    version: string;
    constructor(token: string, clientid: string, ownerid: string);
    tokenValidator(token: string): Promise<boolean>;
    private fetchToken;
}
//# sourceMappingURL=BrowserClient.d.ts.map