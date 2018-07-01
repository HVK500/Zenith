import { GenericProvider } from '../../ProviderInternals';
import { List } from '../List';

/**
 *
 *
 * @export
 * @class ListProvider
 */
export class ListProvider extends GenericProvider {

  /**
   *
   *
   * @static
   * @param {...any[]} items
   * @returns
   */
  static getInstance(...items: any[]): List<any> {
    return new List(...items);
  }

}
