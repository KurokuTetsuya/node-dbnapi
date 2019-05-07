import { RequestClass, ResponseGet, ResponsePost, RequestHeaders } from '../typings/interfaces/IRequestClass';
/**
 * Request module, contains shorthand for doing request using node-fetch.
 * @module Request
 * @author Riichi_Rusdiana#6815
 * @implements {RequestClass}
 */
export declare class Request implements RequestClass {
    url: string;
    headers: any;
    version: string;
    /**
     * @constructor
     * @param {String} url The base URL of REST API, contains the root url for later use.
     * @param {RequestHeaders} headers The headers that will be sent for each request.
     */
    constructor(url: string, headers?: RequestHeaders);
    /**
     * Creates a POST request.
     * @method post
     * @param {String} endpoint resolved API Endpoint.
     * @param {JSON} data resolved data to write.
     * @private
     * @returns {Promise<ResponsePost>}
     */
    post(endpoint: string, data: any): Promise<ResponsePost>;
    /**
     * Creates a GET request.
     * @method get
     * @param {String} endpoint resolved API Endpoint.
     * @private
     * @returns {Promise<ResponseGet>}
     */
    get(endpoint: string): Promise<ResponseGet>;
}
//# sourceMappingURL=Request.d.ts.map