import { Conditions } from '../Common/Conditions';
import { Events } from '../Dom/Events';
import { RequestEventHandlers, RequestOptions } from './AjaxInternals';
import { StringBuilder } from '../Common/StringBuilder';
import { StringExtensions } from '../Common/Extensions/StringExtensions';
import { Util } from '../Common/Util';

/**
 *
 *
 * @export
 * @class Ajax
 */
export class Ajax {

  /**
   *
   *
   * @private
   * @static
   * @param {RequestOptions} [options]
   * @returns {RequestOptions}
   */
  private static setDefaultRequestOptions(options?: RequestOptions): RequestOptions {
    if (options == null) options = {};

    options.method = options.method || 'GET';
    options.async = options.async || true;
    options.cache = options.cache || false;
    options.sendData = options.sendData || null;
    options.handlers = options.handlers || { state: {}, status: {} };

    const passedHeaders = options.headers;
    options.headers = {
      // 'Access-Control-Allow-Origin': options.cors || '*',
      'Content-Type': options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
      'Response-Type': options.responseType || 'text'
    };

    !Conditions.isNullOrEmpty(passedHeaders) && Util.each(passedHeaders, (header, value) => {
      options.headers[header] = value;
    });

    return options;
  }

  /**
   *
   *
   * @private
   * @static
   * @param {XMLHttpRequest} xhr
   * @param {{ [header: string]: string }} headers
   */
  private static setRequestHeaders(xhr: XMLHttpRequest, headers: { [header: string]: string }): void {
    Util.each(headers, (header, value) => {
      xhr.setRequestHeader(header, value);
    });
  }

  /**
   *
   *
   * @private
   * @static
   * @param {XMLHttpRequest} xhr
   * @param {RequestEventHandlers} handlers
   * @returns {boolean}
   */
  private static handleStateChange(xhr: XMLHttpRequest, handlers: RequestEventHandlers): boolean {
    // Ignore state 4, complete handler is used for 4
    const isDone = xhr.readyState === 4;

    !isDone && handlers &&
    Conditions.objectContains(handlers.state, xhr.readyState) &&
    handlers.state[xhr.readyState](xhr);

    // 0	UNSENT	Client has been created. open() not called yet.
    // 1	OPENED	open() has been called.
    // 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
    // 3	LOADING	Downloading; responseText holds partial data.
    // 4	DONE	The operation is complete.
    return !isDone;
  }

  /**
   *
   *
   * @private
   * @static
   * @param {XMLHttpRequest} xhr
   * @param {RequestEventHandlers} handlers
   */
  private static handleStatusChange(xhr: XMLHttpRequest, handlers: RequestEventHandlers): void {
    // The success event is fired when the request has been successful.
    // Ignore status 200, success handler is used for 200
    if (handlers.success && xhr.status === 200) {
      handlers.success(xhr.response, xhr);
      return;
    }

    // Fire any given status code specific callbacks
    Conditions.objectContains(handlers.status, xhr.status) && handlers.status[xhr.status](xhr);
  }

  /**
   *
   *
   * @private
   * @static
   * @param {XMLHttpRequest} xhr
   * @param {RequestEventHandlers} [handlers]
   * @returns {RequestEventHandlers}
   */
  private static attachRequestEvents(xhr: XMLHttpRequest, handlers?: RequestEventHandlers): RequestEventHandlers {
    // The complete event is fired when the request has reached the end, regardless of whether the request was successful or failed.
    const defaultCompleteHandler = (xhr: XMLHttpRequest) => {
      handlers.complete && handlers.complete(xhr);
    };

    const result = {
      // The wrapper error handler
      error: (event) => {
        handlers.error && handlers.error(xhr); // TODO: Figure out how to get error detail handed to this method
        defaultCompleteHandler(xhr);
      },
      // This event is fired after send off the Ajax request.
      afterSend: handlers.afterSend || ((xhr: XMLHttpRequest, options: RequestOptions) => {}),
      // This event is fired before send off the Ajax request.
      beforeSend: handlers.beforeSend || ((xhr: XMLHttpRequest, options: RequestOptions) => {})
    };

    // The error event is fired when an error has occured while making a request or during the request.
    Events.on(xhr, 'error', result.error, false);

    // Handle any state change and then status events
    Events.on(xhr, 'readystatechange', () => {
      // Handle state changes
      if (Ajax.handleStateChange(xhr, handlers)) return;

      // Handle status change
      Ajax.handleStatusChange(xhr, handlers);

      // Fire off the complete request callback
      defaultCompleteHandler(xhr);
    }, false);

    Util.each([
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
    ], (eventName: string) => {
      eventName = eventName.toLowerCase();
      const handler = handlers[eventName];
      handler && Events.on(xhr, eventName, () => {
        handler(xhr);
      }, false);
    });

    // The timeout event is fired when Progression is terminated due to preset time expiring.
    if (handlers.timeout && Conditions.isNumber(handlers.timeout.time) && handlers.timeout.callback) {
      xhr.timeout = handlers.timeout.time;
      Events.on(xhr, 'timeout', (event) => {
        handlers.timeout.callback(event);
      }, false);
    }

    return result;
  }

  /**
   *
   *
   * @static
   * @param {string} baseUrl
   * @returns {string}
   */
  static cacheBust(baseUrl: string): string {
    return Ajax.params(baseUrl, {
      '_': new Date().getTime().toString()
    });
  }

  /**
   *
   *
   * @static
   * @param {string} baseUrl
   * @param {({ [paramName: string]: string } | string)} value
   * @returns {string}
   */
  static params(baseUrl: string, value: { [paramName: string]: string } | string): string {
    const stringBuilder = new StringBuilder(baseUrl);
    !stringBuilder.contains('?') && stringBuilder.append('?');

    if (Conditions.isObject(value)) {
      Util.each(value, (name, value) => {
        // If empty, skip
        if (Conditions.isNullOrEmpty(name)) return;
        stringBuilder.append(StringExtensions.concat('&', name, '=', value));
      });
    } else if (Conditions.isString(value)) {
      stringBuilder.append(value);
    }

    return stringBuilder.replace('?&', '?').toString(); // TODO: encodeURIComponent(result)?
  }

  /**
   *
   *
   * @static
   * @param {string} url
   * @param {RequestOptions} [options]
   * @returns {(any | void)}
   */
  static sendRequest(url: string, options?: RequestOptions): any | void {
    const xhr = new XMLHttpRequest();

    options = Ajax.setDefaultRequestOptions(options);
    const processHandlers = Ajax.attachRequestEvents(xhr, options.handlers);

    try {
      if (Conditions.isString(options.params) || Conditions.isObject(options.params)) {
        url = Ajax.params(url, options.params);
      }

      if (options.cache) {
        url = Ajax.cacheBust(url);
      }

      xhr.open(options.method, url, options.async, options.username, options.password);
      !!options.headers && Ajax.setRequestHeaders(xhr, options.headers);

      processHandlers.beforeSend(xhr, options);
      xhr.send(options.sendData);
      processHandlers.afterSend(xhr, options);
    } catch (err) {
      processHandlers.error(xhr, err.name || '', err);
    }
  }

}
