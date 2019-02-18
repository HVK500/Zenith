/// <reference path="../../../src/common/extensions/array-extensions.d.ts" />
import '../../common/extensions/array-extensions';
import { CookieMetadata, RetrievedCookieNameValuePair } from '../storage/cookie-internals';
/**
 *
 *
 * @export
 * @class Cookie
 */
export declare class Cookie {
    /**
     *
     *
     * @private
     * @static
     */
    private static readonly defaultExpiryDate;
    /**
     *
     *
     * @private
     * @static
     * @param {string} cookie
     */
    private static setInContainer;
    /**
     *
     *
     * @private
     * @static
     * @returns {string}
     */
    private static getContainer;
    /**
     *
     *
     * @private
     * @static
     * @returns {string[]}
     */
    private static getCookieCollection;
    /**
     *
     *
     * @static
     * @returns {number}
     */
    static count(): number;
    /**
     *
     *
     * @static
     */
    static clear(): void;
    /**
     *
     *
     * @static
     * @param {string} name
     * @param {string} value
     * @param {(Date | number | string)} [expiry]
     * @param {string} [path]
     */
    static add(name: string, value: string, expiry?: Date | number | string, path?: string): void;
    /**
     *
     *
     * @static
     * @param {CookieMetadata[]} cookieCollection
     */
    static addMultiple(cookieCollection: CookieMetadata[]): void;
    /**
     *
     *
     * @static
     * @param {(string | string[])} name
     */
    static remove(name: string | string[]): void;
    /**
     *
     *
     * @static
     * @param {string} name
     * @returns {RetrievedCookieNameValuePair}
     */
    static fetch(name: string): RetrievedCookieNameValuePair;
    /**
     *
     *
     * @static
     */
    static check(): void;
}
