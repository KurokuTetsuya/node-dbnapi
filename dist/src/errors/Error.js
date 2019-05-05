"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const header = '[DBNAPI Error]';
const listOfMessages = new Map();
const errnoList = {
    404: 'Not Found',
    403: 'Forbidden',
    401: 'Unauthorized',
    200: 'OK',
};
function throwError(Base) {
    return class ErrCode extends Base {
        constructor(key, ...args) {
            const body = messages(key, args);
            super(body.content);
            this.name = header;
            this.code = body.content;
            this.errno = body.errno;
        }
    };
}
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
function register(sym, val) {
    listOfMessages.set(sym, typeof val === 'function' ? val : String(val));
}
exports.register = register;
exports = {
    ErrCode: throwError(Error),
};
//# sourceMappingURL=Error.js.map