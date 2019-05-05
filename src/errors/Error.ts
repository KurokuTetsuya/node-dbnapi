import { RequestError, ResolvedError } from '../interfaces/IError'

const header: string = '[DBNAPI Error]'
const listOfMessages: Map<String, String> = new Map()

const errnoList = {
  404: 'Not Found',
  403: 'Forbidden',
  401: 'Unauthorized',
  200: 'OK',
}

export class ErrCode extends Base implements RequestError {
  public name: string
  public code: string
  public errno: number
  constructor(key: String, ...args: Array<String>) {
    const body = messages(key, args)
    super(body.content)
    this.name = header
    this.code = body.content
    this.errno = body.errno
  }
}

function messages(key: String, args: Array<String>): ResolvedError {
  const messageToFixed = (message: String): String => {
    return header + ' ' + message
  }
  let resolved: ResolvedError
  switch (key) {
    case 'INVALID_TOKEN':
      resolved = {
        content: messageToFixed('Your token is invalid!') as string,
        errno: 401,
      }
    case 'TEST':
      resolved = {
        content: messageToFixed('This is a test error. Connection is fast and steady!') as string,
        errno: 200,
      }
    default:
      resolved = {
        content: messageToFixed('Connection is going on and on!') as string,
        errno: 200,
      }
  }
  return resolved
}

export function register(sym: string, val: string): void {
  listOfMessages.set(sym, typeof val === 'function' ? val : String(val))
}
