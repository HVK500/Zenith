import { BrowserStorage } from './storage/browser-storage';
import { Cookie } from './storage/cookie';
/**
 *
 *
 * @export
 * @class Storage
 */
export declare class Storage {
    /**
     *
     *
     * @static
     */
    static Cookie: typeof Cookie;
    /**
     *
     *
     * @static
     */
    static Local: BrowserStorage;
    /**
     *
     *
     * @static
     */
    static Session: BrowserStorage;
}
