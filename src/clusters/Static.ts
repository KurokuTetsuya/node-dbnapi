import { IUser, IBot, ArrayBot } from '../typings/interfaces/IRequestClass'

/**
 * This module serve as a static function without constructor.
 * @module Static
 * @author Riichi_Rusdiana#6815
 */
export class Static {
  public static fetchUser(): Promise<IUser> {
    return new Promise((resolve, reject) => {
    })
  }
  constructor() {
    throw new Error('[DBNAPI Error] This constructor cannot be instantiated.')
  }
}
