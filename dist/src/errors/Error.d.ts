import { RequestError } from '../typings/interfaces/IError';
export declare class ErrCode extends Error implements RequestError {
    header: string;
    code: string;
    errno: number;
    constructor(key: String, ...args: Array<String>);
}
//# sourceMappingURL=Error.d.ts.map