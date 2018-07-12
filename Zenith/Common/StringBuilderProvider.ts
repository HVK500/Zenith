import { StringBuilder } from './StringBuilder';
import { GenericProvider } from './../ProviderInternals';

/**
 *
 *
 * @export
 * @class StringBuilderProvider
 * @extends {GenericProvider}
 */
export class StringBuilderProvider extends GenericProvider {

  /**
   *
   *
   * @static
   * @param {string} [base]
   * @returns {StringBuilder}
   */
  static getInstance(base?: string): StringBuilder {
    return new StringBuilder(base);
  }

}
