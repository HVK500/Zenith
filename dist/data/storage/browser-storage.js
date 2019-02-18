"use strict";
/// <reference path="../../common/extensions/array-extensions.d.ts" />
/// <reference path="../../common/extensions/object-extensions.d.ts" />
/// <reference path="../../common/extensions/string-extensions.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var conditions_1 = require("../../common/conditions");
require("../../common/extensions/array-extensions");
require("../../common/extensions/object-extensions");
require("../../common/extensions/string-extensions");
/**
 *
 *
 * @export
 * @class BrowserStorage
 */
var BrowserStorage = /** @class */ (function () {
    /**
     * Creates an instance of BrowserStorage.
     *
     * @param {Storage} context
     */
    function BrowserStorage(context) {
        this.context = context;
    }
    /**
     *
     *
     * @returns {number}
     */
    BrowserStorage.prototype.count = function () {
        return this.context.length;
    };
    /**
     *
     *
     */
    BrowserStorage.prototype.clear = function () {
        this.context.clear();
    };
    /**
     *
     *
     * @param {string} key
     * @param {*} value
     */
    BrowserStorage.prototype.add = function (key, value) {
        this.context.setItem(key, value);
    };
    /**
     *
     *
     * @param {{ [key: string]: string }} keyAndValue
     */
    BrowserStorage.prototype.addMultiple = function (keyAndValue) {
        var _this = this;
        keyAndValue.each(function (value, key) {
            if (conditions_1.Conditions.isNullOrEmpty(key))
                return;
            _this.add(key, value);
        });
    };
    /**
     *
     *
     * @param {(string | string[])} key
     */
    BrowserStorage.prototype.remove = function (key) {
        var _this = this;
        if (conditions_1.Conditions.isString(key))
            key = key.toArray();
        key.each(function (item) {
            _this.context.removeItem(item);
        });
    };
    /**
     *
     *
     * @param {string} key
     * @returns {string}
     */
    BrowserStorage.prototype.fetch = function (key) {
        return this.context.getItem(key);
    };
    return BrowserStorage;
}());
exports.BrowserStorage = BrowserStorage;
