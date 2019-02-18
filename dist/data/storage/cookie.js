"use strict";
/// <reference path="../../common/extensions/array-extensions.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var conditions_1 = require("../../common/conditions");
require("../../common/extensions/array-extensions");
var cookie_model_1 = require("../storage/models/cookie-model");
/**
 *
 *
 * @export
 * @class Cookie
 */
var Cookie = /** @class */ (function () {
    function Cookie() {
    }
    /**
     *
     *
     * @private
     * @static
     * @param {string} cookie
     */
    Cookie.setInContainer = function (cookie) {
        document.cookie = cookie;
    };
    /**
     *
     *
     * @private
     * @static
     * @returns {string}
     */
    Cookie.getContainer = function () {
        return document.cookie;
    };
    /**
     *
     *
     * @private
     * @static
     * @returns {string[]}
     */
    Cookie.getCookieCollection = function () {
        return decodeURIComponent(Cookie.getContainer()).split(';');
    };
    /**
     *
     *
     * @static
     * @returns {number}
     */
    Cookie.count = function () {
        return Cookie.getCookieCollection().length;
    };
    /**
     *
     *
     * @static
     */
    Cookie.clear = function () {
        // TODO Get all cookies and set the expiry to 1970
        // Use the remove method
        var removalItemNames = [];
        Cookie.getCookieCollection().each(function (raw) {
            removalItemNames.push(raw.split('=')[0]);
        });
        Cookie.remove(removalItemNames);
    };
    /**
     *
     *
     * @static
     * @param {string} name
     * @param {string} value
     * @param {(Date | number | string)} [expiry]
     * @param {string} [path]
     */
    Cookie.add = function (name, value, expiry, path) {
        var cookie = new cookie_model_1.CookieModel(name, value, expiry, path);
        Cookie.setInContainer(cookie.raw);
    };
    /**
     *
     *
     * @static
     * @param {CookieMetadata[]} cookieCollection
     */
    Cookie.addMultiple = function (cookieCollection) {
        cookieCollection.each(function (cookie) {
            if (conditions_1.Conditions.isNullOrEmpty(cookie))
                return;
            Cookie.add(cookie.name, cookie.value, cookie.expiry, cookie.path);
        });
    };
    /**
     *
     *
     * @static
     * @param {(string | string[])} name
     */
    Cookie.remove = function (name) {
        if (conditions_1.Conditions.isString(name))
            name = name.toArray();
        name.each(function (item) {
            var cookie = Cookie.fetch(item);
            if (!cookie.raw)
                return;
            Cookie.add(cookie.name, cookie.value, Cookie.defaultExpiryDate);
        });
    };
    /**
     *
     *
     * @static
     * @param {string} name
     * @returns {RetrievedCookieNameValuePair}
     */
    Cookie.fetch = function (name) {
        name = name.concat(name, '=');
        var collection = Cookie.getCookieCollection();
        var result = {
            raw: null,
            name: null,
            value: null
        };
        var filteredResult = collection.filter(function (nameValuePair) {
            // tslint:disable-next-line:triple-equals
            return nameValuePair.trim().indexOf(name) == 0;
        });
        if (filteredResult.isEmpty()) {
            return null;
        }
        result.raw = filteredResult[0].trim();
        var _a = result.raw.split('='), rawName = _a[0], rawValue = _a[1];
        result.name = rawName;
        result.value = rawValue || '';
        return result;
    };
    /**
     *
     *
     * @static
     */
    Cookie.check = function () {
        // TODO: apply check logic here - https://www.w3schools.com/js/js_cookies.asp
    };
    /**
     *
     *
     * @private
     * @static
     */
    Cookie.defaultExpiryDate = 'Thu, 01 Jan 1970 00:00:00 UTC';
    return Cookie;
}());
exports.Cookie = Cookie;
