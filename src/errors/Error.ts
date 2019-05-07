import { RequestError, ResolvedError } from '../typings/interfaces/IError'
import CodeProtocol from './CodeList'

const header: string = '[DBNAPI Error]'

export class ErrCode extends Error implements RequestError {
  public header: string
  public code: string
  public errno: number
  constructor(key: String, ...args: Array<String>) {
    const body = messages(key, args)
    super(body.content)
    this.header = header
    this.code = body.content
    this.errno = body.errno
    this.name = `${this.errno} || ${CodeProtocol(this.errno)}`
  }
  get name(): string {
    return this.name
  }
  set name(vari) {
    throw new Error('"name" is unfathomable!')
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
    case 'NOT_AN_USER':
      resolved = {
        content: messageToFixed(`${args[0]} is not a valid User!`) as string,
        errno: 401,
      }
    case 'INVALID_OWNER_ID_NULL':
      resolved = {
        content: messageToFixed('Invalid Owner ID!!') as string,
        errno: 401,
      }
    case 'INVALID_CLIENT_ID_NULL':
      resolved = {
        content: messageToFixed('Invalid Client ID!!') as string,
        errno: 401,
      }
    case 'INVALID_ID':
      resolved = {
        content: messageToFixed(`Cannot find User with ID ${args[0]}`) as string,
        errno: 401,
      }
    case 'NOT_OWNER':
      resolved = {
        content: messageToFixed(`You are not Owner of ${args[0]} Bot!`) as string,
        errno: 401,
      }
    case 'NOT_A_BOT':
      resolved = {
        content: messageToFixed(`The ${args[0]} ID doesn't belong to any bot`) as string,
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
