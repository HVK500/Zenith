/**
 *
 *
 * @export
 * @class CookieModel
 */
export declare class CookieModel {
    /**
     *
     *
     * @type {string}
     */
    expiry: string;
    /**
     *
     *
     * @type {string}
     */
    name: string;
    /**
     *
     *
     * @type {string}
     */
    path: string;
    /**
     *
     *
     * @type {string}
     */
    raw: string;
    /**
     *
     *
     * @type {string}
     */
    value: string;
    /**
     * Creates a CookieModel instance.
     *
     * @param {string} name
     * @param {string} value
     * @param {(Date | number | string)} [expiry]
     * @param {string} [path]
     */
    constructor(name: string, value: string, expiry?: Date | number | string, path?: string);
}
