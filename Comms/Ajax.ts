import { Conditions } from '../Common/Conditions';
import { Events } from '../Dom/Events';
import { RequestEventHandlers, RequestOptions } from './AjaxInternals';
import { StringExtensions } from '../Common/Extensions/StringExtensions';
import { Util } from '../Common/Util';
import { StringBuilder } from '../Common/StringBuilder';

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
  private static setStandardRequestOptions(options?: RequestOptions): RequestOptions {
    if (options == null) options = {};

    options.method = options.method || 'GET';
    options.async = options.async || true;
    options.cache = options.cache || false;
    options.sendData = options.sendData || null;
    options.handlers = options.handlers || null;

    let headers = {
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
      'Response-Type': options.responseType || 'text'
    };

    if (options.headers == null) {
      Util.each(headers, (header, value) => {
        options.headers[header] = value;
      });
    } else {
      options.headers = headers;
    }

    return options;
  }

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
   * @param {RequestEventHandlers} [handlers]
   * @returns {RequestEventHandlers}
   */
  private static attachRequestEvents(xhr: XMLHttpRequest, handlers?: RequestEventHandlers): RequestEventHandlers {
    let result = {
      error: (xhr: XMLHttpRequest, errorType?: string, error?: string | Error) => {},
      afterSend: (xhr: XMLHttpRequest, options: RequestOptions) => {},
      beforeSend: (xhr: XMLHttpRequest, options: RequestOptions) => {},
    };

    if (!handlers) return;

    // The complete event is fired when the request has reached the end, regardless of whether the request was successful or failed.
    const defaultCompleteHandler = (xhr: XMLHttpRequest, status: number) => {
      handlers.complete && handlers.complete(xhr, status);
    };

    // The success event is fired when the request has been successful.
    if (!!handlers.success) {
      // Setup the default success callback
      Events.on(xhr, 'readystatechange', () => {
        if (xhr.status === 0 || (xhr.readyState !== 4 && !(xhr.status >= 200 && xhr.status < 300))) return;
        handlers.success(xhr.response, xhr.status, xhr);
        defaultCompleteHandler(xhr, xhr.status);
      }, false);
    }

    // The error event is fired when an error has occured while making a request or during the request.
    if (!!handlers.error || !!handlers.complete) {
      const errorHandler = (event) => {
        handlers.error && handlers.error(xhr); // TODO: Figure out how to get error detail handed to this method
        defaultCompleteHandler(xhr, xhr.status);
      };

      result.error = errorHandler;
      handlers.error && Events.on(xhr, 'error', errorHandler, false);
    }

    // The abort event is fired when the loading of a resource has been aborted.
    if (!!handlers.abort) {
      Events.on(xhr, 'abort', () => {
        handlers.abort(xhr, xhr.status);
      }, false);
    }

    // This event is fired after send off the Ajax request.
    if (!!handlers.afterSend) {
      result.afterSend = handlers.afterSend;
    }

    // This event is fired before send off the Ajax request.
    if (!!handlers.beforeSend) {
      result.beforeSend = handlers.beforeSend;
    }

    // The progress event is fired to indicate that an operation is in progress.
    if (!!handlers.progress) {
      Events.on(xhr, 'progress', () => {
        handlers.progress(xhr);
      }, false);
    }

    // The loadstart event is fired when progress has begun on the loading of a resource.
    if (!!handlers.loadStart) {
      Events.on(xhr, 'loadstart', () => {
        handlers.loadStart(xhr);
      }, false);
    }

    // The load event is fired when a resource and its dependent resources have finished loading.
    if (!!handlers.load) {
      Events.on(xhr, 'load', () => {
        handlers.load(xhr);
      }, false);
    }

    // The loadend event is fired when progress has stopped on the loading of a resource (e.g. after "error", "abort", or "load" have been dispatched).
    if (!!handlers.loadEnd) {
      Events.on(xhr, 'loadend', () => {
        handlers.loadEnd(xhr);
      }, false);
    }

    // The timeout event is fired when Progression is terminated due to preset time expiring.
    if (!!handlers.timeout && handlers.timeout.time && !!handlers.timeout.callback) {
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
    StringExtensions.contains(stringBuilder.result, '?') ? '' : stringBuilder.add('?');

    if (Conditions.isObject(value)) {
      Util.each(value, (name, value) => {
        // If empty, skip
        if (Conditions.isNullOrEmpty(name)) return;
        stringBuilder.add(StringExtensions.concat('&', name, '=', value));
      });
    } else if (Conditions.isString(value)) {
      stringBuilder.add(value);
    }

    return StringExtensions.replace(stringBuilder.result, '?&', '?'); // TODO: encodeURIComponent(result)?
  }

  /**
   *
   *
   * @static
   * @param {string} url
   * @param {RequestOptions} [options]
   * @returns {(any | void)}
   */
  static request(url: string, options?: RequestOptions): any | void {
    const xhr = new XMLHttpRequest();

    options = Ajax.setStandardRequestOptions(options);
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
