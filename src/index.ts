import { Client } from './clusters/Main'
import { Request } from './api/Request'
import { Bot } from './clusters/Bot'
import { User } from './clusters/User'
import http from 'http'
import https from 'https'

export default Client
export {
  Client, Request, Bot, User, http, https,
}
