"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../common/extensions/array-extensions.d.ts" />
/// <reference path="../common/extensions/object-extensions.d.ts" />
/// <reference path="../common/extensions/string-extensions.d.ts" />
require("../common/extensions/array-extensions");
require("../common/extensions/object-extensions");
require("../common/extensions/string-extensions");
var conditions_1 = require("../common/conditions");
var events_1 = require("../dom/events");
/**
 *
 *
 * @export
 * @class Ajax
 */
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    /**
     *
     *
     * @static
     * @param {string} baseUrl
     * @returns {string}
     */
    Ajax.cacheBust = function (baseUrl) {
        return Ajax.params(baseUrl, {
            '_': "" + +new Date
        });
    };
    /**
     *
     *
     * @static
     * @param {string} baseUrl
     * @param {({ [paramName: string]: string } | string)} params
     * @returns {string}
     */
    Ajax.params = function (baseUrl, params) {
        baseUrl = baseUrl.remove(/\?/g);
        var result = null;
        if (conditions_1.Conditions.isInstance(params, URLSearchParams)) {
            if (params.toString().isEmpty()) {
                return baseUrl;
            }
            result = params;
        }
        result = new URLSearchParams();
        params.each(function (value, paramName) {
            result.append(paramName, value);
        });
        return baseUrl.concat('?', result.toString());
    };
    /**
     *
     *
     * @static
     * @param {string} url
     * @param {RequestOptions} [options]
     */
    Ajax.sendRequest = function (url, options) {
        var xhr = new XMLHttpRequest();
        options = Ajax.setDefaultRequestOptions(options);
        var processHandlers = Ajax.attachRequestEvents(xhr, options.handlers);
        try {
            if (!conditions_1.Conditions.isNullOrEmpty(options.params)) {
                url = Ajax.params(url, options.params);
            }
            if (options.cache === false) {
                url = Ajax.cacheBust(url);
            }
            xhr.open(options.method, url, options.async, options.username, options.password);
            !!options.headers && Ajax.setRequestHeaders(xhr, options.headers);
            processHandlers.beforeSend(xhr);
            xhr.send(options.sendData);
            processHandlers.afterSend(xhr);
        }
        catch (err) {
            processHandlers.error(err.message || '', err.name || '', xhr);
            processHandlers.complete(xhr);
            delete options.handlers.abort && xhr.abort();
        }
    };
    /**
     *
     *
     * @static
     * @param {string} url
     * @param {RequestOptions} [options]
     */
    Ajax.sendRequestAsync = function (url, options) {
    };
    /**
     *
     *
     * @private
     * @static
     * @param {XMLHttpRequest} xhr
     * @param {RequestEventHandlers} [handlers]
     * @returns {RequestEventHandlers}
     */
    Ajax.attachRequestEvents = function (xhr, handlers) {
        // The complete event is fired when the request has reached the end, regardless of whether the request was successful or failed.
        var defaultCompleteHandler = function (xhr) {
            conditions_1.Conditions.callOrVoid(handlers.complete, xhr);
            // Clear the handler once it has been called
            handlers.complete = null;
        };
        var result = {
            // The wrapper error handler
            error: function (message, errorType, xhr) {
                conditions_1.Conditions.callOrVoid(handlers.error, message, errorType, xhr);
                defaultCompleteHandler(xhr);
            },
            // This event is fired after send off the Ajax request.
            afterSend: conditions_1.Conditions.getValueOrDefault(handlers.afterSend, function (xhr) { }),
            // This event is fired before send off the Ajax request.
            beforeSend: conditions_1.Conditions.getValueOrDefault(handlers.beforeSend, function (xhr) { }),
            complete: defaultCompleteHandler
        };
        // The error event is fired when an error has occured while making a request or during the request.
        events_1.Events.on(xhr, 'error', function (error) {
            conditions_1.Conditions.callOrVoid(result.error, error.message || 'General error', error.type, xhr);
        }, false);
        // Handle any state change and then status events
        events_1.Events.on(xhr, 'readystatechange', function () {
            // Handle state changes
            if (Ajax.handleRequestStateChange(xhr, handlers))
                return;
            // Handle status change
            if (Ajax.handleRequestStatusChange(xhr, handlers))
                return;
            // Fire off the complete request callback
            conditions_1.Conditions.callOrVoid(result.complete, xhr);
        }, false);
        [
            // The abort event is fired when the loading of a resource has been aborted.
            'abort',
            // The progress event is fired to indicate that an operation is in progress.
            'progress',
            // The loadstart event is fired when progress has begun on the loading of a resource.
            'loadStart',
            // The load event is fired when a resource and its dependent resources have finished loading.
            'load',
            // The loadend event is fired when progress has stopped on the loading of a resource (e.g. after "error", "abort", or "load" have been dispatched).
            'loadEnd'
        ].each(function (eventName) {
            eventName = eventName.toLowerCase();
            conditions_1.Conditions.objectContains(handlers, eventName) && events_1.Events.on(xhr, eventName, function () {
                conditions_1.Conditions.callOrVoid(handlers[eventName], xhr);
            }, false);
        });
        // The timeout event is fired when Progression is terminated due to preset time expiring.
        if (handlers.timeout && conditions_1.Conditions.isNumber(handlers.timeout.time) && handlers.timeout.callback) {
            xhr.timeout = handlers.timeout.time;
            events_1.Events.on(xhr, 'timeout', function (event) {
                conditions_1.Conditions.callOrVoid(handlers.timeout.callback, event);
            }, false);
        }
        return result;
    };
    /**
     *
     *
     * @private
     * @static
     * @param {XMLHttpRequest} xhr
     * @param {RequestEventHandlers} handlers
     * @returns {boolean}
     */
    Ajax.handleRequestStateChange = function (xhr, handlers) {
        // Ignore state 4, complete handler is used for 4
        var isDone = xhr.readyState === 4;
        if (!isDone && handlers && conditions_1.Conditions.objectContains(handlers.state, xhr.readyState)) {
            conditions_1.Conditions.callOrVoid(handlers.state[xhr.readyState], xhr);
        }
        // 0	UNSENT	Client has been created. open() not called yet.
        // 1	OPENED	open() has been called.
        // 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
        // 3	LOADING	Downloading; responseText holds partial data.
        // 4	DONE	The operation is complete.
        return !isDone;
    };
    /**
     *
     *
     * @private
     * @static
     * @param {XMLHttpRequest} xhr
     * @param {RequestEventHandlers} handlers
     * @returns {boolean}
     */
    Ajax.handleRequestStatusChange = function (xhr, handlers) {
        if (xhr.status === 0)
            return true;
        // The success event is fired when the request has been successful.
        // Ignore status 200, success handler is used for 200
        if (xhr.status === 200) {
            conditions_1.Conditions.callOrVoid(handlers.success, xhr.response, xhr);
        }
        else if (conditions_1.Conditions.objectContains(handlers.status, xhr.status)) {
            // Fire any given status code specific callbacks
            conditions_1.Conditions.callOrVoid(handlers.status[xhr.status], xhr);
        }
        return false;
    };
    /**
     *
     *
     * @private
     * @static
     * @param {RequestOptions} [options]
     * @returns {RequestOptions}
     */
    Ajax.setDefaultRequestOptions = function (options) {
        options = conditions_1.Conditions.getValueOrDefault(options, {});
        options.method = conditions_1.Conditions.getValueOrDefault(options.method, 'GET');
        options.async = conditions_1.Conditions.getValueOrDefault(options.async, true);
        options.cache = conditions_1.Conditions.getValueOrDefault(options.cache, true);
        options.sendData = conditions_1.Conditions.getValueOrDefault(options.sendData, null);
        options.handlers = conditions_1.Conditions.getValueOrDefault(options.handlers, { state: {}, status: {} });
        var passedHeaders = options.headers;
        options.headers = {
            'Content-Type': conditions_1.Conditions.getValueOrDefault(options.contentType, 'application/x-www-form-urlencoded; charset=UTF-8'),
            'Response-Type': conditions_1.Conditions.getValueOrDefault(options.responseType, 'text')
        };
        if (!conditions_1.Conditions.isNullOrEmpty(passedHeaders)) {
            passedHeaders.each(function (value, header) {
                options.headers[header] = value;
            });
        }
        return options;
    };
    /**
     *
     *
     * @private
     * @static
     * @param {XMLHttpRequest} xhr
     * @param {{ [header: string]: string }} headers
     */
    Ajax.setRequestHeaders = function (xhr, headers) {
        headers.each(function (value, header) {
            xhr.setRequestHeader(header, value);
        });
    };
    return Ajax;
}());
exports.Ajax = Ajax;
