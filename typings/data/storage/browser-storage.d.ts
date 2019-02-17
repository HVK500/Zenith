/// <reference path="../../common/extensions/array-extensions.d.ts" />
/// <reference path="../../common/extensions/object-extensions.d.ts" />
/// <reference path="../../common/extensions/string-extensions.d.ts" />
import { KeyValuePair } from '../../common/common-internals';
import '../../common/extensions/array-extensions';
import '../../common/extensions/object-extensions';
import '../../common/extensions/string-extensions';
/**
 *
 *
 * @export
 * @class BrowserStorage
 */
export declare class BrowserStorage {
    /**
     *
     *
     * @private
     * @type {Storage}
     */
    private context;
    /**
     * Creates an instance of BrowserStorage.
     *
     * @param {Storage} context
     */
    constructor(context: Storage);
    /**
     *
     *
     * @returns {number}
     */
    count(): number;
    /**
     *
     *
     */
    clear(): void;
    /**
     *
     *
     * @param {string} key
     * @param {*} value
     */
    add(key: string, value: string): void;
    /**
     *
     *
     * @param {{ [key: string]: string }} keyAndValue
     */
    addMultiple(keyAndValue: KeyValuePair<string>): void;
    /**
     *
     *
     * @param {(string | string[])} key
     */
    remove(key: string | string[]): void;
    /**
     *
     *
     * @param {string} key
     * @returns {string}
     */
    fetch(key: string): string;
}
