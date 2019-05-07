(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Main"] = factory();
	else
		root["Main"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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
const https_1 = __importDefault(__webpack_require__(1));
const node_fetch_1 = __importDefault(__webpack_require__(7));
const meta = __importStar(__webpack_require__(2));
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
     * @param {String} url The base URL of REST API, contains the root url for later use.
     * @param {RequestHeaders} headers The headers that will be sent for each request.
     */
    constructor(url, headers = {}) {
        this.version = meta.version;
        this.url = url;
        if (!headers) {
            headers = {
                'Content-Type': 'application/json',
                'User-Agent': 'dbnapi/' + this.version,
            };
        }
    }
    /**
     * Creates a POST request.
     * @method post
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
     * @method get
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 2 */
/***/ (function(module) {

module.exports = {"name":"node-dbnapi","version":"1.0.0","scripts":{"tsc":"tsc","gulp:lint":"gulp tslint","lint":"npm run gulp:lint -s","webpack":"webpack","docs":"jsdoc2md src/index.ts"},"main":"dist/index.js","license":"MIT","author":{"name":"Billy Addlers <Riichi Rusdiana>","email":"finnsonalca123@gmail.com","url":"https://j-dev.xyz"},"contributors":[{"name":"Billy Addlers <Riichi Rusdiana>","email":"finnsonalca123@gmail.com","url":"https://j-dev.xyz"}],"devDependencies":{"@types/node":"^12.0.0","@types/node-fetch":"^2.3.3","chalk":"^2.4.2","dts-bundle-webpack":"^1.0.2","dts-webpack-bundler":"^1.0.3","dts-webpack-plugin":"^0.0.9","dtsbundler-webpack-plugin":"^1.0.0","gulp":"^4.0.1","gulp-tslint":"^8.1.4","gulp-typescript":"^5.0.1","jsdoc-to-markdown":"^4.0.1","ora":"^3.4.0","rimraf":"^2.6.3","ts-loader":"^5.4.5","tslint":"^5.16.0","tslint-eslint-rules":"^5.4.0","typescript":"^3.4.5","webpack":"^4.30.0","webpack-cli":"^3.3.2","webpack-node-externals":"^1.7.2"},"dependencies":{"node-fetch":"^2.5.0"}};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * User resolved module, contains getter and setter for interface {IBot}.
 * @module BotClass
 * @author Riichi_Rusdiana#6815
 * @implements {IBot}
 */
class Bot {
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
        this.metadata = usermeta.metadata;
        this.ownedBy = usermeta.ownedBy;
    }
    getMeta() {
        return this.metadata;
    }
}
exports.Bot = Bot;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = __webpack_require__(6);
exports.Main = Main_1.Main;
const Request_1 = __webpack_require__(0);
exports.Request = Request_1.Request;
const Bot_1 = __webpack_require__(4);
exports.Bot = Bot_1.Bot;
const User_1 = __webpack_require__(3);
exports.User = User_1.User;
const http_1 = __importDefault(__webpack_require__(10));
exports.http = http_1.default;
const https_1 = __importDefault(__webpack_require__(1));
exports.https = https_1.default;
exports.default = Main_1.Main;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = __webpack_require__(0);
const package_json_1 = __importDefault(__webpack_require__(2));
const User_1 = __webpack_require__(3);
const Bot_1 = __webpack_require__(4);
const Error_1 = __webpack_require__(8);
/**
 * Main module, the source of Discord Bots Nation API workflow.
 * Contains classes that wraps function to access DBN REST API.
 * @module Main
 * @author Riichi_Rusdiana#6815
 * @implements {MainClass}
 */
class Main {
    /**
     * @constructor
     * @param {string} token The authentication token of your DBN profile.
     * @param {string} clientid The valid registered Discord Client Application ID.
     * @param {string} ownerid The valid registered Owner ID.
     */
    constructor(token, clientid, ownerid) {
        this.version = package_json_1.default.version;
        const header = { 'Content-Type': 'application/json', 'User-Agent': `dbnapi/${this.version}` };
        this.request = new Request_1.Request('https://discordbots.xyz/api', header);
        this.token = token;
        this.clientid = clientid;
        this.ownerid = ownerid;
        this.sessionid = null;
        if (token || token !== undefined || token !== '') {
            this.tokenValidator(token).then((valid) => {
                if (valid === false) {
                    throw new Error_1.ErrCode('INVALID_TOKEN');
                }
                else {
                    if (valid === true) {
                        this.fetchToken(token, clientid, ownerid).then((fetchedToken) => {
                            this.sessionid = fetchedToken.ownedBy.username;
                            console.log(`[DBNAPI] You are logged in as: ${fetchedToken.ownedBy.tag}`);
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
            throw new Error_1.ErrCode('INVALID_OWNER_ID_NULL');
        }
        const { body: user } = await this.request.get(`fetchUser?id=${clientID}`);
        if (user.error === 'unknown_user') {
            return undefined;
        }
        if (user.bot === true) {
            const { body: meta } = await this.request.get(`bots/${clientID}`);
            const metadata = meta;
            const body = user;
            const userResolved = {
                id: body.id,
                username: body.username,
                discriminator: body.discriminator,
                tag: body.tag,
                avatar: body.avatar,
                avatarURL: body.avatarURL,
                displayAvatarURL: body.displayAvatarURL,
                bot: body.bot,
                createdTimestamp: body.createdTimestamp,
                createdAt: new Date(body.createdTimestamp.toString()),
                metadata,
                ownedBy: body.ownedBy,
            };
            return new Bot_1.Bot(userResolved);
        }
        const body = user;
        const userResolved = {
            id: body.id,
            username: body.username,
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
     * Validates Token Session.
     * @param {string} token The string token to validate.
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
     * Fetch Token Session.
     * @private
     * @returns {Promise}
     */
    async fetchToken(token, clientID, ownerID) {
        // tslint:disable-next-line: object-literal-shorthand
        const { body: response } = await this.request.post('fetchToken', { token: token });
        const body = response;
        let ownedBy = body.ownedBy;
        let returns = { valid: body.valid, owned: body.owned, ownedBy };
        if (body.valid === false) {
            throw new Error_1.ErrCode('INVALID_TOKEN');
        }
        if (body.owned === false || body.ownedBy === undefined) {
            ownedBy = undefined;
            return returns = { valid: false, owned: false, ownedBy };
        }
        if (body.ownedBy === null || body.ownedBy === undefined) {
            ownedBy = undefined;
            return returns = { valid: false, owned: false, ownedBy };
        }
        const bots = [];
        ownedBy.bots.forEach((bot) => {
            bots.push(bot.botID);
        });
        if (!bots.includes(clientID)) {
            const bot = await this.fetchUser(clientID);
            if (!bot) {
                throw new Error_1.ErrCode('INVALID_CLIENT_ID_NULL');
            }
            if (bot.bot !== true) {
                throw new Error_1.ErrCode('NOT_A_BOT', clientID);
            }
            throw new Error_1.ErrCode('NOT_OWNER', bot.tag);
        }
        const ownerUser = await this.fetchUser(ownerID);
        if (!ownerUser) {
            throw new Error_1.ErrCode('INVALID_OWNER_ID_NULL');
        }
        return returns;
    }
}
exports.Main = Main;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CodeList_1 = __importDefault(__webpack_require__(9));
const header = '[DBNAPI Error]';
class ErrCode extends Error {
    constructor(key, ...args) {
        const body = messages(key, args);
        super(body.content);
        this.header = header;
        this.code = body.content;
        this.errno = body.errno;
        this.name = `${this.errno} || ${CodeList_1.default(this.errno)}`;
    }
    get name() {
        return this.name;
    }
    set name(vari) {
        throw new Error('"name" is unfathomable!');
    }
}
exports.ErrCode = ErrCode;
function messages(key, args) {
    const messageToFixed = (message) => {
        return header + ' ' + message;
    };
    let resolved;
    switch (key) {
        case 'INVALID_TOKEN':
            resolved = {
                content: messageToFixed('Your token is invalid!'),
                errno: 401,
            };
        case 'NOT_AN_USER':
            resolved = {
                content: messageToFixed(`${args[0]} is not a valid User!`),
                errno: 401,
            };
        case 'INVALID_OWNER_ID_NULL':
            resolved = {
                content: messageToFixed('Invalid Owner ID!!'),
                errno: 401,
            };
        case 'INVALID_CLIENT_ID_NULL':
            resolved = {
                content: messageToFixed('Invalid Client ID!!'),
                errno: 401,
            };
        case 'INVALID_ID':
            resolved = {
                content: messageToFixed(`Cannot find User with ID ${args[0]}`),
                errno: 401,
            };
        case 'NOT_OWNER':
            resolved = {
                content: messageToFixed(`You are not Owner of ${args[0]} Bot!`),
                errno: 401,
            };
        case 'NOT_A_BOT':
            resolved = {
                content: messageToFixed(`The ${args[0]} ID doesn't belong to any bot`),
                errno: 401,
            };
        case 'TEST':
            resolved = {
                content: messageToFixed('This is a test error. Connection is fast and steady!'),
                errno: 200,
            };
        default:
            resolved = {
                content: messageToFixed('Connection is going on and on!'),
                errno: 200,
            };
    }
    return resolved;
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const indexing = new Map();
const ErrCodeList = {
    100: 'Continue',
    101: 'Switching Protocol',
    102: 'Processing',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    300: 'Multiple Choice',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    306: 'Unused',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot',
    419: 'Misdirected Request',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    507: 'Insufficient Storage',
    511: 'Network Authentication Required',
};
function default_1(code) {
    for (const [i, content] of Object.entries(ErrCodeList)) {
        indexing.set(parseInt(i), content);
    }
    return indexing.get(code);
}
exports.default = default_1;
function getErrCodeList() {
    return {
        default: ErrCodeList,
        toMap: () => {
            for (const [i, content] of Object.entries(ErrCodeList)) {
                indexing.set(parseInt(i), content);
            }
            return indexing;
        },
        keys: () => {
            return Object.keys(ErrCodeList);
        },
        values: () => {
            return Object.values(ErrCodeList);
        },
        entries: () => {
            return Object.entries(ErrCodeList);
        },
    };
}
exports.getErrCodeList = getErrCodeList;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })
/******/ ]);
});