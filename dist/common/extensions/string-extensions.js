"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conditions_1 = require("../conditions");
var XString = /** @class */ (function () {
    function XString() {
        /**
         * @inheritdoc
         */
        this.append = function (value) {
            return "" + this + value;
        };
        /**
         * @inheritdoc
         */
        this.camelCase = function () {
            return this.replace(/-+(.)?/g, function (match, char) {
                return conditions_1.Conditions.isNullOrEmpty(char) ? '' : char.toUpperCase();
            });
        };
        this.capitalize = function () {
            var char = this[0];
            if (!char)
                return this;
            return char.toUpperCase() + this.slice(1);
        };
        /**
         * @inheritdoc
         */
        this.caseSwap = function () {
            return this.replace(/\S/g, function (char) {
                return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
            });
        };
        /**
         * @inheritdoc
         */
        this.chop = function (value, length) {
            if (conditions_1.Conditions.isNullOrEmpty(value))
                return [];
            length = ~~length;
            return length > 0 ? value.match(new RegExp(".{1," + length + "}", 'g')) : [value];
        };
        /**
         * @inheritdoc
         */
        this.contains = function (value) {
            var regex = conditions_1.Conditions.isString(value) ? new RegExp(value, 'g') : value;
            return regex.test(this);
        };
        /**
         * @inheritdoc
         */
        this.dasherize = function () {
            return this.remove(/[^\w\s]/g)
                .trim()
                .replace(/[-_\s]+/g, '-');
        };
        /**
         * @inheritdoc
         */
        this.escapeRegExp = function () {
            return this.replace(/[\\\[\]\/{}()*+?.$|^-]/g, '\\$&');
        };
        /**
         * @inheritdoc
         */
        this.extractNumber = function (all) {
            if (all === void 0) { all = false; }
            var regex = all ? /\D+/g : /^[^\d-]+/;
            return parseFloat(this.replace(regex, ''));
        };
        /**
         * @inheritdoc
         */
        this.isEmpty = function () {
            return this === '';
        };
        /**
         * @inheritdoc
         */
        this.padZero = function (length, right) {
            if (length === void 0) { length = 1; }
            if (right === void 0) { right = false; }
            var result = [new Array(length + 1).join('0')];
            var operation = 'unshift';
            if (right)
                operation = 'push';
            result[operation](this);
            return result.join('');
        };
        /**
         * @inheritdoc
         */
        this.prepend = function (value) {
            return "" + value + this;
        };
        /**
         * @inheritdoc
         */
        this.quote = function () {
            return this.wrap('"');
        };
        /**
         * @inheritdoc
         */
        this.remove = function (search) {
            return this.replace(search, '');
        };
        /**
         * @inheritdoc
         */
        this.reverse = function () {
            return this.split('').reverse().join('');
        };
        this.snakeCase = function () {
            return this.remove(/[^\w\s]/g)
                .trim()
                .replace(/[-\s]+/g, '_');
        };
        /**
         * @inheritdoc
         */
        this.titleize = function () {
            return this.toLowerCase().replace(/(?:^|\s|-)\S/g, function (char) {
                return char.toUpperCase();
            });
        };
        this.toArray = function () {
            return [this];
        };
        /**
         * @inheritdoc
         */
        this.toNumber = function () {
            try {
                return +this;
            }
            catch (e) {
                return NaN;
            }
        };
        /**
         * @inheritdoc
         */
        this.wrap = function (wrapper) {
            var result = [];
            if (conditions_1.Conditions.isString(wrapper)) {
                result.push(wrapper, this, wrapper);
            }
            else {
                result.push(wrapper.l || '', this, wrapper.r || '');
            }
            return result.join('');
        };
    }
    return XString;
}());
/**
 * Collection of useful extensions to be used on Strings.
 */
var StringExtensions;
(function (StringExtensions) {
    Object.setPrototypeOf(String.prototype, new XString());
})(StringExtensions = exports.StringExtensions || (exports.StringExtensions = {}));
