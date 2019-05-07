import { Main } from './clusters/Main'
import { Request } from './api/Request'
import { Bot } from './clusters/Bot'
import { User } from './clusters/User'
import http from 'http'
import https from 'https'
import * as IRequestClass from './typings/interfaces/IRequestClass'
import * as IMainClass from './typings/interfaces/IMainClass'
import * as IError from './typings/interfaces/IError'

const typings = {
  IRequestClass, IMainClass, IError,
}

export default Main
export {
  Main, Request, Bot, User, http, https, typings,
}
