import { GenericBaseFactory } from '../Common/GenericBaseFactory';
import { Queue } from './Queue';

/**
 *
 *
 * @export
 * @class QueueFactory
 * @extends {GenericBaseFactory}
 */
export class QueueFactory extends GenericBaseFactory {

  /**
   *
   *
   * @static
   * @param {...any[]} items
   * @returns {Queue<any>}
   */
  static create(...items: any[]): Queue<any> {
    return new Queue(...items);
  }

}
