"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_storage_1 = require("./storage/browser-storage");
var cookie_1 = require("./storage/cookie");
/**
 *
 *
 * @export
 * @class Storage
 */
var Storage = /** @class */ (function () {
    function Storage() {
    }
    /**
     *
     *
     * @static
     */
    Storage.Cookie = cookie_1.Cookie;
    /**
     *
     *
     * @static
     */
    Storage.Local = new browser_storage_1.BrowserStorage(window.localStorage);
    /**
     *
     *
     * @static
     */
    Storage.Session = new browser_storage_1.BrowserStorage(window.sessionStorage);
    return Storage;
}());
exports.Storage = Storage;
