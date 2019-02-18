"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var applyMethods = function (methods) {
    var result = {};
    for (var key in methods) {
        result[key] = {
            value: methods[key],
            writable: true
        };
    }
    return result;
};
/**
 * Collection of useful extensions to be used on Objects.
 */
var ObjectExtensions;
(function (ObjectExtensions) {
    Object.defineProperties(Object.prototype, applyMethods({
        each: function (callback) {
            var index = 0;
            for (var key in this) {
                if (!this.hasOwnProperty(key))
                    continue;
                callback.call(null, this[key], key, index); // TODO: Pass the context through, currently null
                index++;
            }
            return this;
        },
        fetch: function (keyPath) {
            var props = keyPath.split('.');
            var result = this;
            for (var i = 0; i < props.length; i++) {
                var prop = result[props[i]];
                if (typeof prop === 'undefined' || prop === null) {
                    // // when default exists use it
                    // if (hasDefaultValue) {
                    //   return defaultValue;
                    // } else {
                    // special case when path exists but is null
                    if (i === props.length - 1) {
                        return prop;
                    }
                    else {
                        // other return undefined
                        return void 0;
                    }
                    // }
                }
                result = prop;
            }
            return result;
        },
        isEmpty: function () {
            for (var key in this) {
                if (this.hasOwnProperty(key))
                    return false;
            }
            return true;
        },
        isEqualTo: function (value) {
            return JSON.stringify(this) === JSON.stringify(value);
        },
        toArray: function () {
            return [this];
        }
    }));
})(ObjectExtensions = exports.ObjectExtensions || (exports.ObjectExtensions = {}));
