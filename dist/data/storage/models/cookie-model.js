"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conditions_1 = require("../../../common/conditions");
/**
 *
 *
 * @export
 * @class CookieModel
 */
var CookieModel = /** @class */ (function () {
    /**
     * Creates a CookieModel instance.
     *
     * @param {string} name
     * @param {string} value
     * @param {(Date | number | string)} [expiry]
     * @param {string} [path]
     */
    function CookieModel(name, value, expiry, path) {
        this.name = name;
        this.value = value;
        var expiryDate = null;
        var expiryString = '';
        if (!conditions_1.Conditions.isNullOrEmpty(expiry) && conditions_1.Conditions.isNumber(expiry)) {
            expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (expiry * 24 * 60 * 60 * 1000));
        }
        else if (conditions_1.Conditions.isString(expiry)) {
            expiryString = expiry;
        }
        else { // Otherwise this is a date already
            expiryDate = expiry;
        }
        this.expiry = !!expiryDate ? expiryDate.toUTCString() : expiryString;
        this.path = path || '';
        this.raw = this.name + "=" + this.value + "; ";
        if (!!this.expiry)
            this.raw = this.raw + "expires=" + this.expiry + "; ";
        if (!!this.path)
            this.raw = this.raw + "path=" + this.path + "; ";
    }
    return CookieModel;
}());
exports.CookieModel = CookieModel;
