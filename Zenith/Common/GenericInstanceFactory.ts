/**
 * A base factory in which a given instanceable class can be easily returned in a static manner.
 *
 * @export
 * @class GenericInstanceFactory
 * @template T The specific target classes type.
 */
export class GenericInstanceFactory<T> {

  /**
   * Creates an instance of GenericInstanceFactory.
   * @param {T} instance The specific target class to be created.
   */
  constructor(private instance: any) { }

  /**
   * Acts a static constructor to provide a new instance of the target class.
   *
   * @param {...any[]} args The necessary arguments that need to be handed when a new instance that is being created.
   * @returns {T} A new instance of the given target class.
   */
  create(...args: any[]): T {
    return new this.instance(...args);
  }

}
