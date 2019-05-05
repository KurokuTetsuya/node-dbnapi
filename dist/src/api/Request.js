"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const meta = __importStar(require("../../package.json"));
let agent;
if (https_1.default.Agent) {
    agent = new https_1.default.Agent({ keepAlive: true });
}
/**
 * Request module, contains shorthand for doing request using node-fetch.
 * @module Request
 * @author Riichi_Rusdiana#6815
 * @implements {RequestClass}
 */
class Request {
    /**
     * @constructor
     * @param {String} url
     * @param {RequestHeaders} headers
     */
    constructor(url, headers = {}) {
        this.url = url;
        this.version = meta.default.version;
        if (!headers) {
            headers = {
                'Content-Type': 'application/json',
                'User-Agent': 'dbnapi.js/' + this.version,
            };
        }
    }
    /**
     * Creates a POST request.
     * @param {String} endpoint resolved API Endpoint.
     * @param {JSON} data resolved data to write.
     * @private
     * @returns {Promise<ResponsePost>}
     */
    post(endpoint, data) {
        const headers = this.headers;
        // tslint:disable-next-line: no-empty
        return new Promise((resolve, reject) => {
            try {
                node_fetch_1.default(`https://${this.url}/api/${endpoint}`, {
                    method: 'post',
                    // tslint:disable-next-line: object-literal-sort-keys
                    body: JSON.stringify(data),
                    headers,
                    agent
                }).then((res) => resolve(res.json()));
            }
            catch (err) {
                reject(err);
            }
        });
    }
    /**
     * Creates a GET request.
     * @param {String} endpoint resolved API Endpoint.
     * @private
     * @returns {Promise<ResponseGet>}
     */
    get(endpoint) {
        const headers = this.headers;
        // tslint:disable-next-line: no-empty
        return new Promise((resolve, reject) => {
            try {
                node_fetch_1.default(`https://${this.url}/api/${endpoint}`, {
                    method: 'get',
                    // tslint:disable-next-line: object-literal-sort-keys
                    headers,
                    agent
                }).then((res) => resolve(res.json()));
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.Request = Request;
//# sourceMappingURL=Request.js.map