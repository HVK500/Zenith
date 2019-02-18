/// <reference path="../../src/common/extensions/array-extensions.d.ts" />
/// <reference path="../../src/common/extensions/object-extensions.d.ts" />
/// <reference path="../../src/common/extensions/string-extensions.d.ts" />
import '../common/extensions/array-extensions';
import '../common/extensions/object-extensions';
import '../common/extensions/string-extensions';
import { RequestOptions } from './ajax-internals';
/**
 *
 *
 * @export
 * @class Ajax
 */
export declare class Ajax {
    /**
     *
     *
     * @static
     * @param {string} baseUrl
     * @returns {string}
     */
    static cacheBust(baseUrl: string): string;
    /**
     *
     *
     * @static
     * @param {string} baseUrl
     * @param {({ [paramName: string]: string } | string)} params
     * @returns {string}
     */
    static params(baseUrl: string, params: {
        [paramName: string]: string;
    } | URLSearchParams): string;
    /**
     *
     *
     * @static
     * @param {string} url
     * @param {RequestOptions} [options]
     */
    static sendRequest(url: string, options?: RequestOptions): void;
    /**
     *
     *
     * @static
     * @param {string} url
     * @param {RequestOptions} [options]
     */
    static sendRequestAsync(url: string, options?: RequestOptions): void;
    /**
     *
     *
     * @private
     * @static
     * @param {XMLHttpRequest} xhr
     * @param {RequestEventHandlers} [handlers]
     * @returns {RequestEventHandlers}
     */
    private static attachRequestEvents;
    /**
     *
     *
     * @private
     * @static
     * @param {XMLHttpRequest} xhr
     * @param {RequestEventHandlers} handlers
     * @returns {boolean}
     */
    private static handleRequestStateChange;
    /**
     *
     *
     * @private
     * @static
     * @param {XMLHttpRequest} xhr
     * @param {RequestEventHandlers} handlers
     * @returns {boolean}
     */
    private static handleRequestStatusChange;
    /**
     *
     *
     * @private
     * @static
     * @param {RequestOptions} [options]
     * @returns {RequestOptions}
     */
    private static setDefaultRequestOptions;
    /**
     *
     *
     * @private
     * @static
     * @param {XMLHttpRequest} xhr
     * @param {{ [header: string]: string }} headers
     */
    private static setRequestHeaders;
}
