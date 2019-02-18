"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 *
 * @export
 * @class ElementExtensions
 */
var ElementExtensions = /** @class */ (function () {
    function ElementExtensions() {
    }
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} name
     * @returns {string}
     */
    ElementExtensions.getAttribute = function (element, name) {
        return element.getAttribute(name);
    };
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} name
     * @param {string} value
     */
    ElementExtensions.setAttribute = function (element, name, value) {
        element.setAttribute(name, value);
    };
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} name
     */
    ElementExtensions.removeAttribute = function (element, name) {
        element.removeAttribute(name);
    };
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} content
     * @param {boolean} [overwrite=false]
     */
    ElementExtensions.append = function (element, content) {
        // if (overwrite || Conditions.isString(element)) {
        //   element.innerHTML = `${element.innerHTML}${content}`;
        //   return;
        // }
        element.appendChild(content);
    };
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {*} beforeElement
     * @param {string} content
     * @param {boolean} [overwrite=false]
     */
    ElementExtensions.prepend = function (element, content, beforeElement) {
        // if (overwrite || Conditions.isString(element)) {
        //   element.innerHTML = `${content}${element.innerHTML}`;
        //   return;
        // }
        // TODO: Allow a slector to be passed in for the beforeElement
        element.insertBefore(content, (beforeElement || element.firstChild || null));
    };
    /**
     *
     *
     * @static
     * @param {*} element
     * @param {string} selector
     */
    ElementExtensions.only = function (element, selector) {
        element.querySelectorAll(selector).forEach(function (node) {
            element.removeChild(node);
        });
    };
    return ElementExtensions;
}());
exports.ElementExtensions = ElementExtensions;
