import { RequestError, ResolvedError } from '../typings/interfaces/IError'
import CodeProtocol from './CodeList'

const header: string = '[DBNAPI Error]'

export class ErrCode extends Error implements RequestError {
  public header: string
  public code: string
  public errno: number
  constructor(key: String, ...args: Array<String>) {
    const body: ResolvedError = messages(key, args) as ResolvedError
    super(body.content)
    this.header   = header
    this.code     = body.content
    this.errno    = body.errno
    this.name     = `${this.errno} || ${CodeProtocol(this.errno)}`
  }
}

function messages(key: String, args: Array<String>): ResolvedError | undefined {
  const messageToFixed = (message: String): String => {
    return header + ' ' + message
  }
  switch (key) {
    case 'INVALID_TOKEN':
      return {
        content: messageToFixed('Your token is invalid!') as string,
        errno: 401,
      } as ResolvedError
    case 'NOT_AN_USER':
      return {
        content: messageToFixed(`${args[0]} is not a valid User!`) as string,
        errno: 401,
      } as ResolvedError
    case 'INVALID_OWNER_ID_NULL':
      return {
        content: messageToFixed('Invalid Owner ID!!') as string,
        errno: 401,
      } as ResolvedError
    case 'INVALID_CLIENT_ID_NULL':
      return {
        content: messageToFixed('Invalid Client ID!!') as string,
        errno: 401,
      } as ResolvedError
    case 'INVALID_ID':
      return {
        content: messageToFixed(`Cannot find User with ID ${args[0]}`) as string,
        errno: 401,
      } as ResolvedError
    case 'NOT_OWNER':
      return {
        content: messageToFixed(`You are not Owner of ${args[0]} Bot!`) as string,
        errno: 401,
      } as ResolvedError
    case 'NOT_A_BOT':
      return {
        content: messageToFixed(`The ${args[0]} ID doesn't belong to any bot`) as string,
        errno: 401,
      } as ResolvedError
    case 'TEST':
      return {
        content: messageToFixed('This is a test error. Connection is fast and steady!') as string,
        errno: 200,
      } as ResolvedError
  }
}
