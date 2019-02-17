/// <reference path="../common/extensions/array-extensions.d.ts" />
import '../common/extensions/array-extensions';
import { DictionaryLoopCallback } from '../common/common-internals';
/**
 *
 *
 * @export
 * @class Dictionary
 * @template TKey
 * @template TValue
 */
export declare class Dictionary<TKey, TValue> {
    /**
     *
     *
     * @private
     * @type {Map<TKey, TValue>}
     */
    private container;
    /**
     *
     *
     * @readonly
     * @type {[ TKey, TValue ][]}
     */
    readonly entries: [TKey, TValue][];
    /**
     *
     *
     * @readonly
     * @type {TKey[]}
     */
    readonly keys: TKey[];
    /**
     *
     *
     * @readonly
     * @type {TValue[]}
     */
    readonly values: TValue[];
    /**
     *
     *
     * @readonly
     * @type {number}
     */
    readonly count: number;
    /**
     * Creates an instance of Dictionary.
     * @param {...[ TKey, TValue ][]} items
     */
    constructor(...items: [TKey, TValue][]);
    /**
     *
     *
     * @param {TKey[]} keys
     * @returns {TValue[]}
     */
    fetchMany(keys: TKey[]): TValue[];
    /**
     *
     *
     * @param {TKey} key
     * @returns {TValue}
     */
    fetch(key: TKey): TValue;
    /**
     *
     *
     * @param {TKey} key
     * @param {TValue} value
     * @returns {this}
     */
    add(key: TKey, value: TValue): this;
    /**
     *
     *
     * @param {TKey} key
     * @returns {this}
     */
    remove(key: TKey): this;
    /**
     *
     *
     * @param {DictionaryLoopCallback<TKey, TValue>} callback
     * @returns {this}
     */
    each(callback: DictionaryLoopCallback<TKey, TValue>): this;
    /**
     *
     *
     * @returns {boolean}
     */
    isEmpty(): boolean;
    /**
     *
     *
     * @returns {this}
     */
    clear(): this;
    /**
     *
     *
     * @param {TKey} key
     * @returns {boolean}
     */
    contains(key: TKey): boolean;
}
