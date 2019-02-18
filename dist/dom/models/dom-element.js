"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conditions_1 = require("../../common/conditions");
var element_extensions_1 = require("../../common/extensions/element-extensions");
var events_1 = require("../events");
var styling_1 = require("../styling");
/**
 *
 *
 * @export
 * @class DomElement
 */
var DomElement = /** @class */ (function () {
    /**
     * Creates an instance of a DomElement.
     *
     * @param {string} selector
     */
    function DomElement(selector) {
        this.selector = conditions_1.Conditions.getValueOrDefault(selector, null);
        this.element = null;
        // Check whether the selector is a tag, if so create a new element
        if (!conditions_1.Conditions.beginsWith(selector, '<')) {
            this.element = document.querySelector(this.selector);
            if (conditions_1.Conditions.isNullOrEmpty(this.element)) {
                throw 'Invalid Selector / Node';
            }
        }
        else {
            var matches = this.selector.match(/<([\w-]*)>/);
            if (conditions_1.Conditions.isNullOrEmpty(matches) || !matches[1]) {
                throw 'Invalid Selector / Node';
            }
            this.element = document.createElement(matches[1]);
        }
        return this;
    }
    Object.defineProperty(DomElement.prototype, "id", {
        /**
         *
         *
         * @type {string}
         */
        get: function () {
            return this.element.id;
        },
        set: function (identifier) {
            this.element.id = identifier;
        },
        enumerable: true,
        configurable: true
    });
    DomElement.prototype.setId = function (identifier) {
        this.id = identifier;
        return this;
    };
    Object.defineProperty(DomElement.prototype, "inner", {
        /**
         *
         *
         * @type {string}
         */
        get: function () {
            return this.element.innerHTML;
        },
        set: function (content) {
            this.element.innerHTML = content;
        },
        enumerable: true,
        configurable: true
    });
    DomElement.prototype.setInner = function (content) {
        this.inner = content;
        return this;
    };
    Object.defineProperty(DomElement.prototype, "text", {
        // /**
        //  *
        //  *
        //  * @type {string}
        //  */
        // get inputText(): string {
        //   // 'HTMLInputElement' here counts for any controls that contain the value property
        //   return (<HTMLInputElement>this.element).value || null;
        // }
        // set inputText(content: string) {
        //   if ((<HTMLInputElement>this.element).value) {
        //     // 'HTMLInputElement' here counts for any controls that contain the value property
        //     (<HTMLInputElement>this.element).value = content;
        //   }
        // }
        /**
         *
         *
         * @type {string}
         */
        get: function () {
            return this.element.innerText;
        },
        set: function (content) {
            this.element.innerText = content;
        },
        enumerable: true,
        configurable: true
    });
    DomElement.prototype.setText = function (content) {
        this.text = content;
        return this;
    };
    /**
     *
     *
     * @param {(string | string[])} className
     * @returns {this}
     */
    DomElement.prototype.addClass = function (className) {
        styling_1.Styling.addClass(this.element, className);
        return this;
    };
    /**
     *
     *
     * @param {Node} content
     * @returns {this}
     */
    DomElement.prototype.append = function (content) {
        element_extensions_1.ElementExtensions.append(this.element, content);
        return this;
    };
    /**
     *
     *
     * @param {{ [ styleName: string ]: string }} styles
     * @returns {this}
     */
    DomElement.prototype.css = function (styles) {
        styling_1.Styling.css(this.element, styles);
        return this;
    };
    /**
     *
     *
     * @param {boolean} [value=null]
     * @returns {this}
     */
    DomElement.prototype.disable = function (value) {
        var _this = this;
        if (value === void 0) { value = null; }
        // if left as null it will toggle
        if (value === null) {
            value = conditions_1.Conditions.isString(this.getAttribute('disabled'));
        }
        // if given a boolean value it will respect that
        conditions_1.Conditions.if(value, function () { return _this.setAttribute('disabled', ''); }, function () { return _this.removeAttribute('disabled'); });
        return this;
    };
    /**
     *
     *
     * @returns {this}
     */
    DomElement.prototype.fadeIn = function () {
        styling_1.Styling.fadeIn(this.element);
        return this;
    };
    /**
     *
     *
     * @returns {this}
     */
    DomElement.prototype.fadeOut = function () {
        styling_1.Styling.fadeOut(this.element);
        return this;
    };
    /**
     *
     *
     * @param {string} name
     * @returns {string}
     */
    DomElement.prototype.getAttribute = function (name) {
        return element_extensions_1.ElementExtensions.getAttribute(this.element, name);
    };
    /**
     *
     *
     * @param {string} classNames
     * @returns {boolean}
     */
    DomElement.prototype.hasClass = function (classNames) {
        return styling_1.Styling.hasClass(this.element, classNames);
    };
    /**
     *
     *
     * @returns {this}
     */
    DomElement.prototype.hide = function () {
        styling_1.Styling.hide(this.element);
        return this;
    };
    /**
     *
     *
     * @param {string} eventType
     * @param {EventListenerOrEventListenerObject} handler
     * @param {(boolean | AddEventListenerOptions)} [options]
     * @returns {this}
     */
    DomElement.prototype.off = function (eventType, handler, options) {
        events_1.Events.off(this.element, eventType, handler, options);
        return this;
    };
    /**
     *
     *
     * @param {string} eventType
     * @param {EventListenerOrEventListenerObject} handler
     * @param {(boolean | AddEventListenerOptions)} [options]
     * @returns {this}
     */
    DomElement.prototype.on = function (eventType, handler, options) {
        events_1.Events.on(this.element, eventType, handler, options);
        return this;
    };
    /**
     *
     *
     * @param {string} eventType
     * @param {EventListenerOrEventListenerObject} handler
     * @param {(boolean | AddEventListenerOptions)} [options]
     * @returns {this}
     */
    DomElement.prototype.once = function (eventType, handler, options) {
        events_1.Events.once(this.element, eventType, handler, options);
        return this;
    };
    /**
     *
     *
     * @param {string} selector
     * @returns {this}
     */
    DomElement.prototype.only = function (selector) {
        element_extensions_1.ElementExtensions.only(this.element, selector);
        return this;
    };
    /**
     *
     *
     * @param {Node} content
     * @param {Node} [beforeElement]
     * @returns {this}
     */
    DomElement.prototype.prepend = function (content, beforeElement) {
        element_extensions_1.ElementExtensions.prepend(this.element, content, (beforeElement || this.element.firstChild));
        return this;
    };
    /**
     *
     *
     * @param {string} name
     * @returns {this}
     */
    DomElement.prototype.removeAttribute = function (name) {
        element_extensions_1.ElementExtensions.removeAttribute(this.element, name);
        return this;
    };
    /**
     *
     *
     * @param {(string | string[])} classNames
     * @returns {this}
     */
    DomElement.prototype.toggleClass = function (classNames) {
        styling_1.Styling.toggleClass(this.element, classNames);
        return this;
    };
    /**
     *
     *
     * @param {(string | string[])} classNames
     * @returns {this}
     */
    DomElement.prototype.removeClass = function (classNames) {
        styling_1.Styling.removeClass(this.element, classNames);
        return this;
    };
    /**
     *
     *
     * @param {(ReplacementClass | ReplacementClass[])} classNames
     * @returns {this}
     */
    DomElement.prototype.replaceClass = function (classNames) {
        styling_1.Styling.replaceClass(this.element, classNames);
        return this;
    };
    /**
     *
     *
     * @param {string} name
     * @param {string} value
     * @returns {this}
     */
    DomElement.prototype.setAttribute = function (name, value) {
        element_extensions_1.ElementExtensions.setAttribute(this.element, name, value);
        return this;
    };
    /**
     *
     *
     * @returns {this}
     */
    DomElement.prototype.show = function () {
        styling_1.Styling.show(this.element);
        return this;
    };
    /**
     *
     *
     * @returns {string}
     */
    DomElement.prototype.toString = function () {
        return this.element.outerHTML;
    };
    return DomElement;
}());
exports.DomElement = DomElement;
