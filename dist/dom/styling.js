"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../common/extensions/array-extensions.d.ts" />
/// <reference path="../common/extensions/object-extensions.d.ts" />
/// <reference path="../common/extensions/string-extensions.d.ts" />
require("../common/extensions/array-extensions");
require("../common/extensions/object-extensions");
require("../common/extensions/string-extensions");
var conditions_1 = require("../common/conditions");
var Styling = /** @class */ (function () {
    function Styling() {
    }
    Styling.addClass = function (element, classNames) {
        Styling.processClassName(classNames, function (name) {
            if (Styling.hasClass(element, name))
                return;
            element.classList.add(name);
        });
    };
    Styling.css = function (element, styles) {
        styles.each(function (value, key) {
            element.style[key] = value;
        });
    };
    Styling.fadeIn = function (element) {
        // TODO: needs css()
    };
    Styling.fadeOut = function (element) {
        // TODO: needs css()
    };
    Styling.hasClass = function (element, className) {
        return element.classList.contains(className);
    };
    Styling.hide = function (element) {
        return Styling.css(element, { display: 'none' });
    };
    Styling.toggleClass = function (element, classNames) {
        Styling.processClassName(classNames, function (name) {
            element.classList.toggle(name);
        });
    };
    Styling.removeClass = function (element, classNames) {
        Styling.processClassName(classNames, function (name) {
            if (Styling.hasClass(element, name))
                return;
            element.classList.remove(name);
        });
    };
    Styling.replaceClass = function (element, classNames) {
        Styling.processClassName(classNames, function (replacement) {
            if (Styling.hasClass(element, replacement.oldClass))
                return;
            element.classList.replace(replacement.oldClass, replacement.newClass);
        });
    };
    Styling.show = function (element) {
        return Styling.css(element, { display: '' });
    };
    Styling.processClassName = function (classNames, callback) {
        if (!conditions_1.Conditions.isArray(classNames))
            classNames = [classNames];
        classNames.each(function (item) { return callback(item); });
    };
    return Styling;
}());
exports.Styling = Styling;
