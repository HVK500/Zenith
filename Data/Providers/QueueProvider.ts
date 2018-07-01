import { GenericProvider } from '../../ProviderInternals';
import { Queue } from '../Queue';

/**
 *
 *
 * @export
 * @class QueueProvider
 * @extends {GenericProvider}
 */
export class QueueProvider extends GenericProvider {

  /**
   *
   *
   * @static
   * @param {...any[]} items
   * @returns {Queue<any>}
   */
  static getInstance(...items: any[]): Queue<any> {
    return new Queue(...items);
  }

}
