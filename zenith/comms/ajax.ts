/// <reference path="../common/extensions/array-extensions.d.ts" />
/// <reference path="../common/extensions/object-extensions.d.ts" />
/// <reference path="../common/extensions/string-extensions.d.ts" />

import { Conditions } from '../common/conditions';
import '../common/extensions/array-extensions';
import '../common/extensions/object-extensions';
import '../common/extensions/string-extensions';
import { Events } from '../dom/events';
import { RequestEventHandlers, RequestOptions } from './ajax-internals';

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
   * @static
   * @param {string} baseUrl
   * @returns {string}
   */
  public static cacheBust(baseUrl: string): string {
    return Ajax.params(baseUrl, {
      '_': `${+new Date}`
    });
  }

  /**
   *
   *
   * @static
   * @param {string} baseUrl
   * @param {({ [paramName: string]: string } | string)} params
   * @returns {string}
   */
  public static params(baseUrl: string, params: { [paramName: string]: string } | URLSearchParams): string {
    baseUrl = baseUrl.remove(/\?/g);
    let result: URLSearchParams = null;

    if (Conditions.isInstance<URLSearchParams>(params, URLSearchParams)) {
      if (params.toString().isEmpty()) {
        return baseUrl;
      }
      result = params;
    }

    result = new URLSearchParams();
    params.each((value: string, paramName: string): void => {
      result.append(paramName, value);
    });

    return baseUrl.concat('?', result.toString());
  }

  /**
   *
   *
   * @static
   * @param {string} url
   * @param {RequestOptions} [options]
   */
  public static sendRequest(url: string, options?: RequestOptions): void {
    const xhr = new XMLHttpRequest();

    options = Ajax.setDefaultRequestOptions(options);
    const processHandlers = Ajax.attachRequestEvents(xhr, options.handlers);

    try {
      if (!Conditions.isNullOrEmpty(options.params)) {
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
    } catch (err) {
      processHandlers.error(err.message || '', err.name || '', xhr);
      processHandlers.complete(xhr);
      delete options.handlers.abort && xhr.abort();
    }
  }

  /**
   *
   *
   * @static
   * @param {string} url
   * @param {RequestOptions} [options]
   */
  public static sendRequestAsync(url: string, options?: RequestOptions): void {
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
    const defaultCompleteHandler = (xhr: XMLHttpRequest): void => {
      Conditions.callOrVoid(handlers.complete, xhr);
      // Clear the handler once it has been called
      handlers.complete = null;
    };

    const result = {
      // The wrapper error handler
      error: (message: string, errorType?: string, xhr?: XMLHttpRequest): void => {
        Conditions.callOrVoid(handlers.error, message, errorType, xhr);
        defaultCompleteHandler(xhr);
      },
      // This event is fired after send off the Ajax request.
      afterSend: Conditions.getValueOrDefault(handlers.afterSend, (xhr: XMLHttpRequest): void => { }),
      // This event is fired before send off the Ajax request.
      beforeSend: Conditions.getValueOrDefault(handlers.beforeSend, (xhr: XMLHttpRequest): void => { }),
      complete: defaultCompleteHandler
    };

    // The error event is fired when an error has occured while making a request or during the request.
    Events.on(xhr, 'error', (error: ErrorEvent): void => {
      Conditions.callOrVoid(result.error, error.message || 'General error', error.type, xhr);
    }, false);

    // Handle any state change and then status events
    Events.on(xhr, 'readystatechange', (): void => {
      // Handle state changes
      if (Ajax.handleRequestStateChange(xhr, handlers)) return;

      // Handle status change
      if (Ajax.handleRequestStatusChange(xhr, handlers)) return;

      // Fire off the complete request callback
      Conditions.callOrVoid(result.complete, xhr);
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
    ].each((eventName: string): void => {
      eventName = eventName.toLowerCase();
      Conditions.objectContains(handlers, eventName) && Events.on(xhr, eventName, (): void => {
        Conditions.callOrVoid(handlers[eventName], xhr);
      }, false);
    });

    // The timeout event is fired when Progression is terminated due to preset time expiring.
    if (handlers.timeout && Conditions.isNumber(handlers.timeout.time) && handlers.timeout.callback) {
      xhr.timeout = handlers.timeout.time;
      Events.on(xhr, 'timeout', (event: Event): void => {
        Conditions.callOrVoid(handlers.timeout.callback, event);
      }, false);
    }

    return result;
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
  private static handleRequestStateChange(xhr: XMLHttpRequest, handlers: RequestEventHandlers): boolean {
    // Ignore state 4, complete handler is used for 4
    const isDone = xhr.readyState === 4;

    if (!isDone && handlers && Conditions.objectContains(handlers.state, xhr.readyState)) {
      Conditions.callOrVoid(handlers.state[xhr.readyState], xhr);
    }

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
   * @returns {boolean}
   */
  private static handleRequestStatusChange(xhr: XMLHttpRequest, handlers: RequestEventHandlers): boolean {
    if (xhr.status === 0) return true;

    // The success event is fired when the request has been successful.
    // Ignore status 200, success handler is used for 200
    if (xhr.status === 200) {
      Conditions.callOrVoid(handlers.success, xhr.response, xhr);
    } else if (Conditions.objectContains(handlers.status, xhr.status)) {
      // Fire any given status code specific callbacks
      Conditions.callOrVoid(handlers.status[xhr.status], xhr);
    }

    return false;
  }

  /**
   *
   *
   * @private
   * @static
   * @param {RequestOptions} [options]
   * @returns {RequestOptions}
   */
  private static setDefaultRequestOptions(options?: RequestOptions): RequestOptions {
    options = Conditions.getValueOrDefault<RequestOptions>(options, {});

    options.method = Conditions.getValueOrDefault<string>(options.method, 'GET');
    options.async = Conditions.getValueOrDefault<boolean>(options.async, true);
    options.cache = Conditions.getValueOrDefault<boolean>(options.cache, true);
    options.sendData = Conditions.getValueOrDefault(options.sendData, null);
    options.handlers = Conditions.getValueOrDefault(options.handlers, { state: {}, status: {} });

    const passedHeaders = options.headers;
    options.headers = {
      'Content-Type': Conditions.getValueOrDefault<string>(options.contentType, 'application/x-www-form-urlencoded; charset=UTF-8'),
      'Response-Type': Conditions.getValueOrDefault<string>(options.responseType, 'text')
    };

    if (!Conditions.isNullOrEmpty(passedHeaders)) {
      passedHeaders.each((value: string, header: string): void => {
        options.headers[header] = value;
      });
    }

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
  private static setRequestHeaders(xhr: XMLHttpRequest, headers: { [header: string]: string }) {
    headers.each((value: string, header: string): void => {
      xhr.setRequestHeader(header, value);
    });
  }
}
