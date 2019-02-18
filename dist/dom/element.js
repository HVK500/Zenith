"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dom_element_1 = require("./models/dom-element");
var Element = /** @class */ (function () {
    function Element() {
    }
    Element.create = function (tagName) {
        return new dom_element_1.DomElement("<" + tagName + ">");
    };
    Element.fetch = function (selector) {
        return new dom_element_1.DomElement(selector);
    };
    Element.fetchAll = function (selector) {
        return document.querySelectorAll(selector);
    };
    return Element;
}());
exports.Element = Element;
