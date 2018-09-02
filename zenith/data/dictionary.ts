import { Util } from '../common/util';
import { DictionaryLoopCallback } from '../common-internals';

/**
 *
 *
 * @export
 * @class Dictionary
 * @template TKey
 * @template TValue
 */
export class Dictionary<TKey, TValue> {

  /**
   *
   *
   * @private
   * @type {Map<TKey, TValue>}
   */
  private container: Map<TKey, TValue>;

  /**
   *
   *
   */
  private addCallback: (addedItemValue: TValue, addedItemKey: TKey) => void;
  set onAdd(callback: (addedItemValue: TValue, addedItemKey: TKey) => void) {
    this.addCallback = callback;
  }

  /**
   *
   *
   */
  private removeCallback: (removedItemKey: TKey) => void;
  set onRemove(callback: (removedItemKey: TKey) => void) {
    this.removeCallback = callback;
  }

  /**
   *
   *
   * @readonly
   * @type {[ TKey, TValue ][]}
   */
  get entries(): [ TKey, TValue ][]  {
    return Array.from(this.container.entries());
  }

  /**
   *
   *
   * @readonly
   * @type {TKey[]}
   */
  get keys(): TKey[]  {
    return Array.from(this.container.keys());
  }

  /**
   *
   *
   * @readonly
   * @type {TValue[]}
   */
  get values(): TValue[]  {
    return Array.from(this.container.values());
  }

  /**
   *
   *
   * @readonly
   * @type {number}
   */
  get count(): number {
    return this.container.size;
  }

  /**
   * Creates an instance of Dictionary.
   * @param {...[ TKey, TValue ][]} items
   */
  constructor(...items: [ TKey, TValue ][]) {
    this.container = new Map(items);
  }

  /**
   *
   *
   * @param {TKey[]} keys
   * @returns {TValue[]}
   */
  fetchMany(keys: TKey[]): TValue[] {
    const result: TValue[] = [];
    Util.each(keys, (key: TKey) => {
      result.push(this.fetch(key));
    });

    return result;
  }

  /**
   *
   *
   * @param {TKey} key
   * @returns {TValue}
   */
  fetch(key: TKey): TValue {
    return this.container.get(key);
  }

  // addMany(keyValuePairs: [ Tkey, Tvalue ][]): this {
  //   Util.each(keyValuePairs, (key: Tkey, value: Tvalue) => {
  //     this.container.set(key, value);
  //   });

  //   return this;
  // }

  /**
   *
   *
   * @param {TKey} key
   * @param {TValue} value
   * @returns {this}
   */
  add(key: TKey, value: TValue): this {
    this.container.set(key, value);
    Util.executeCallback(this.addCallback, key, value);
    return this;
  }

  /**
   *
   *
   * @param {TKey} key
   * @returns {this}
   */
  remove(key: TKey): this {
    this.container.delete(key);
    Util.executeCallback(this.removeCallback, key);
    return this;
  }

  /**
   *
   *
   * @param {DictionaryLoopCallback<TKey, TValue>} callback
   * @returns {this}
   */
  each(callback: DictionaryLoopCallback<TKey, TValue>): this {
    this.container.forEach((value, key) => {
      callback(value, key, this);
    });

    return this;
  }

  /**
   *
   *
   * @returns {boolean}
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   *
   *
   * @returns {this}
   */
  clear(): this {
    this.container.clear();
    return this;
  }

  /**
   *
   *
   * @param {TKey} key
   * @returns {boolean}
   */
  contains(key: TKey): boolean {
    return this.container.has(key);
  }

}
