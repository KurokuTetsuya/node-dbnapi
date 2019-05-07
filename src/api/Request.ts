import https from 'https'
import fetch from 'node-fetch'
import { RequestClass, ResponseGet, ResponsePost, RequestHeaders } from '../typings/interfaces/IRequestClass'
import * as meta from '../../package.json'

let agent: https.Agent
if (https.Agent) { agent = new https.Agent({ keepAlive: true }) }

/**
 * Request module, contains shorthand for doing request using node-fetch.
 * @module Request
 * @author Riichi_Rusdiana#6815
 * @implements {RequestClass}
 */
export class Request implements RequestClass {
  public url: string
  public headers: any
  public version: string = meta.version
  /**
   * @constructor
   * @param {String} url The base URL of REST API, contains the root url for later use.
   * @param {RequestHeaders} headers The headers that will be sent for each request.
   */
  constructor(url: string, headers: RequestHeaders = {}) {
    this.url = url
    if (!headers) {
      headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'dbnapi/' + this.version,
      }
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
  public post(endpoint: string, data: any): Promise<ResponsePost> {
    const headers = this.headers
    // tslint:disable-next-line: no-empty
    return new Promise((resolve, reject) => {
      try {
        fetch(`https://${this.url}/api/${endpoint}`, {
          method: 'post',
          // tslint:disable-next-line: object-literal-sort-keys
          body: JSON.stringify(data),
          headers,
          agent }).then((res) => resolve(res.json()))
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * Creates a GET request.
   * @method get
   * @param {String} endpoint resolved API Endpoint.
   * @private
   * @returns {Promise<ResponseGet>}
   */
  public get(endpoint: string): Promise<ResponseGet> {
    const headers = this.headers
    // tslint:disable-next-line: no-empty
    return new Promise((resolve, reject) => {
      try {
        fetch(`https://${this.url}/api/${endpoint}`, {
          method: 'get',
          // tslint:disable-next-line: object-literal-sort-keys
          headers,
          agent }).then((res) => resolve(res.json()))
      } catch (err) {
        reject(err)
      }
    })
  }
}
