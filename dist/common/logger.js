"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../common/extensions/object-extensions.d.ts" />
require("common/extensions/object-extensions");
var logger_internals_1 = require("./logger-internals");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Object.defineProperty(Logger.prototype, "level", {
        set: function (value) {
            Logger.level = value;
        },
        enumerable: true,
        configurable: true
    });
    // public static counter(label: string): LogCounterFunc {
    //   return Logger.invokeUtilLogContext<LogCounterFunc>(label, {
    //     count: console.count,
    //     reset: console.countReset
    //   });
    // }
    Logger.error = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        Logger.invokeLogContext.apply(Logger, ['ERROR', message].concat(options));
    };
    // public static formatOrigin(originPath: string | string[], delimiter: string = '=>'): string {
    //   // originPath = <string[]>Util.convertSingleToCollection(<string>originPath);
    //   return originPath.join(delimiter);
    // }
    Logger.information = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        Logger.invokeLogContext.apply(Logger, ['INFO', message].concat(options));
    };
    Logger.stackTrace = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        Logger.invokeLogContext.apply(Logger, ['TRACE', message].concat(options));
    };
    Logger.timer = function (label) {
        return Logger.invokeUtilLogContext(label, {
            log: console.time,
            end: console.timeEnd
        });
    };
    Logger.warning = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        Logger.invokeLogContext.apply(Logger, ['WARN', message].concat(options));
    };
    Logger.formatMessage = function (level, message) {
        return "(" + level + ") " + new Date().toISOString().replace('T', ' ').replace('Z', '') + " - " + message;
    };
    Logger.invokeUtilLogContext = function (label, action) {
        if (!Logger.shouldLog(logger_internals_1.LogLevel.INFO))
            return;
        var result = {};
        action.each(function (method, name) {
            result[name] = function () {
                method(label);
            };
        });
        return result;
    };
    Logger.invokeLogContext = function (contextLevel, message) {
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        if (!Logger.shouldLog(logger_internals_1.LogLevel[contextLevel]))
            return;
        console[contextLevel.toLowerCase()].apply(console, [Logger.formatMessage(contextLevel, message)].concat(options));
    };
    Logger.shouldLog = function (contextLevel) {
        if (contextLevel >= Logger.level)
            return true;
        return false;
    };
    Logger.level = logger_internals_1.LogLevel.OFF;
    Logger.specifiers = logger_internals_1.Specifiers;
    return Logger;
}());
exports.Logger = Logger;
