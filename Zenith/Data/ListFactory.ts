import { GenericBaseFactory } from '../Common/GenericBaseFactory';
import { List } from './List';

/**
 *
 *
 * @export
 * @class ListFactory
 */
export class ListFactory extends GenericBaseFactory {

  /**
   *
   *
   * @static
   * @param {...any[]} items
   * @returns {List<any>}
   */
  static create(...items: any[]): List<any> {
    return new List(...items);
  }

}
