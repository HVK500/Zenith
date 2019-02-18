"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
// https://www.polymer-project.org/3.0/start/quick-tour
// https://devdocs.io/dom/shadowroot
/**
 *
 *
 * @export
 * @class Shadow
 */
var Shadow = /** @class */ (function () {
    function Shadow() {
    }
    Shadow.create = function (selector, options, element) {
        if (element === void 0) { element = document; }
        return element.querySelector(selector).attachShadow(options);
    };
    Shadow.onChange = function (element, callback, options) {
        events_1.Events.on(element, 'change', callback, options);
    };
    return Shadow;
}());
exports.Shadow = Shadow;
