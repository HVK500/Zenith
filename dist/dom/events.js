"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conditions_1 = require("../common/conditions");
var Events = /** @class */ (function () {
    function Events() {
    }
    Events.load = function (callback, parent) {
        if (parent === void 0) { parent = document; }
        Events.on(parent, 'readystatechange', function () {
            if (document.readyState === 'complete') { // This state is equivalent "load"
                conditions_1.Conditions.callOrVoid(callback);
            }
        }, false);
    };
    Events.off = function (element, eventType, handler, options) {
        element.removeEventListener(eventType, handler, options);
    };
    Events.on = function (element, eventType, handler, options) {
        element.addEventListener(eventType, handler, options);
    };
    Events.once = function (element, eventType, handler, options) {
        var resultOptions = {};
        if (conditions_1.Conditions.isBool(options)) {
            // 'Options' are considered as useCapture
            // IE does not support the 'once' property
            resultOptions['capture'] = options;
        }
        resultOptions['once'] = true;
        Events.on(element, eventType, handler, resultOptions);
    };
    Events.ready = function (callback, parent) {
        if (parent === void 0) { parent = document; }
        Events.on(parent, 'readystatechange', function () {
            if (document.readyState === 'interactive') { // This state is equivalent "DOMContentLoaded"
                conditions_1.Conditions.callOrVoid(callback);
            }
        }, false);
    };
    return Events;
}());
exports.Events = Events;
