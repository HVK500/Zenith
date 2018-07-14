/**
 * A generic base factory that that is extended when implementing a new factory.
 *
 * @export
 * @class GenericBaseFactory
 */
export class GenericInstanceFactory<T> {

  /**
   * Creates an instance of GenericInstanceFactory.
   * @param {T} instance
   */
  constructor(private instance: any) { }

  /**
   *
   *
   * @static
   * @param {*} instance
   * @param {...any[]} args
   * @returns {*}
   */
  create(...args: any[]): T {
    return new this.instance(...args);
  }

}
