import { GenericBaseFactory } from './GenericBaseFactory';
import { StringBuilder } from './StringBuilder';

/**
 *
 *
 * @export
 * @class StringBuilderFactory
 * @extends {GenericBaseFactory}
 */
export class StringBuilderFactory extends GenericBaseFactory {

  /**
   *
   *
   * @static
   * @param {string} [base]
   * @returns {StringBuilder}
   */
  static create(base?: string): StringBuilder {
    return new StringBuilder(base);
  }

}
