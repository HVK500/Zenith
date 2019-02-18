"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PseudoRandom = /** @class */ (function () {
    function PseudoRandom() {
    }
    /**
     *
     *
     * @static
     * @param {number} [amount=1]
     * @returns {number[]}
     */
    PseudoRandom.generateRandom = function (amount) {
        if (amount === void 0) { amount = 1; }
        var result = [];
        var collection = new Uint32Array(amount);
        (window.crypto || window['msCrypto']).getRandomValues(collection);
        collection.forEach(function (element) {
            result.push(element);
        });
        return result;
    };
    /**
     *
     *
     * @static
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    PseudoRandom.generateRandomFloat = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(parseFloat("0." + PseudoRandom.generateRandom()[0]) * (max - min + 1)) + min;
    };
    /**
     *
     *
     * @static
     * @param {number} min
     * @param {number} max
     * @param {number} [amount=1]
     * @returns {number[]}
     */
    PseudoRandom.getRandomBetween = function (min, max, amount) {
        if (amount === void 0) { amount = 1; }
        var result = [];
        for (var index = 0; index < amount; index++) {
            result.push(PseudoRandom.generateRandomFloat(min, max));
        }
        return result;
    };
    return PseudoRandom;
}());
exports.PseudoRandom = PseudoRandom;
