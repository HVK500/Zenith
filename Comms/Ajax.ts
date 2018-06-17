import { Conditions } from '../Common/Conditions';
import { Events } from '../Dom/Events';
import { RequestEventHandlers, RequestOptions } from './AjaxInternals';
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
   * @param {RequestOptions} options
   * @returns {RequestOptions}
   */
  private static setStandardRequestOptions(options: RequestOptions): RequestOptions {
    options.method = options.method || 'GET';
    options.contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
    // options.mimeType || 'text/plain';
    // options.responseType = options.responseType || 'text';
    options.async = options.async || true;
    options.cache = options.cache || true;
    options.sendData = options.sendData || null;

    return options;
  }

  /**
   *
   *
   * @private
   * @static
   * @param {XMLHttpRequest} xhr
   * @param {RequestEventHandlers} handlers
   * @returns {{ afterSend: Function, beforeSend: Function }}
   */
  private static attachRequestEvents(xhr: XMLHttpRequest, handlers: RequestEventHandlers): { afterSend: Function, beforeSend: Function } {
    // "readystatechange" | "abort" | "error" | "load" | "loadend" | "loadstart" | "progress" | "timeout"
    let result = {
      error: (xhr: XMLHttpRequest, options: RequestOptions) => {},
      afterSend: (xhr: XMLHttpRequest, options: RequestOptions) => {},
      beforeSend: (xhr: XMLHttpRequest, options: RequestOptions) => {},
    };

    if (!handlers) return;

    const defaultCompleteHandler = (xhr: XMLHttpRequest, status: number) => {
      handlers.complete && handlers.complete(xhr, status);
    };

    switch (true) {
      case !!handlers.afterSend: {
        result.afterSend = handlers.afterSend;
      }
      case !!handlers.beforeSend: {
        result.beforeSend = handlers.beforeSend;
      }
      // case !!handlers.complete: {
      // 	// Complete
      // }
      case !!handlers.error || !!handlers.complete: {
        const errorHandler = () => {
          handlers.error && handlers.error(xhr, '', ''); // TODO: Figure out if the two last params are needed
          defaultCompleteHandler(xhr, xhr.status);
        };

        result.error = errorHandler;

        handlers.error && Events.on(xhr, 'error', errorHandler, false);
      }
      case !!handlers.progress: {
        // Progress
        Events.on(xhr, 'progress', () => {
          handlers.progress(xhr);
        }, false);
      }
      // case !!handlers.statusCodes: {
      // 	// StatusCode
      // }
      case !!handlers.success: {
        // Setup the default success callback
        Events.on(xhr, 'readystatechange', () => {
          if ((xhr.readyState !== 4 && !(xhr.status >= 200 && xhr.status < 300))) return;
          handlers.success(xhr.response, xhr.status, xhr);
          defaultCompleteHandler(xhr, xhr.status);
        }, false);
      }
      case !!(handlers.timeout && handlers.timeout.time && handlers.timeout.callback): {
        xhr.timeout = handlers.timeout.time;
        Events.on(xhr, 'timeout', (event) => {
          handlers.timeout.callback(event);
        }, false);
      }
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
    const bustIt = { _: new Date().getTime().toString() };
    return Ajax.params(baseUrl, bustIt);
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
    const containsStart = StringExtensions.contains(baseUrl, '?');
    let result = containsStart ? '' : '?';

    if (Conditions.isObject(value)) {
      Util.each(value, (paramName, paramValue, index) => {
        // If empty, skip
        if (Conditions.isNullOrEmpty(paramName)) return;
        const param = StringExtensions.concat(paramName, '=', paramValue);
        result += index === 0 && !containsStart ? param : StringExtensions.concat('&', param);
      });
    } else if (Conditions.isString(value)) {
      result = Conditions.beginsWith(<string>value, '?') ? <string>value : StringExtensions.concat(result, value);
    }

    return StringExtensions.concat(baseUrl, encodeURIComponent(result));
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

    let processHandlers = null;

    try {
      // Set option defaults here
      options = Ajax.setStandardRequestOptions(options);

      processHandlers = Ajax.attachRequestEvents(xhr, options.handlers);

      // Prepare the request url with the required params to be appended
      if (options.params) {
        url = Ajax.params(url, options.params);
      }

      if (!options.cache) {
        url = Ajax.cacheBust(url);
      }

      xhr.open(options.method, url, options.async, options.username, options.password);

      processHandlers.beforeSend(xhr, options);
      xhr.send(options.sendData);
      processHandlers.afterSend(xhr, options);
    } catch (err) {
      processHandlers.error();
    }
  }

}
