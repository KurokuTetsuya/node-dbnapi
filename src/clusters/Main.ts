import { MainClass } from '../interfaces/IMainClass'
import { Request } from '../api/Request'

export class Main implements MainClass {
  public session: Request
  constructor() {
    this.session = new Request('https://discordbots.xyz/api')
  }
}
