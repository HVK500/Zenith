import { Conditions } from '../common/conditions';

/**
 *
 *
 * @export
 * @class Events
 */
export class Events {

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} eventType
   * @param {EventListenerOrEventListenerObject} handler
   * @param {(boolean | AddEventListenerOptions)} [options]
   */
  static once(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    let resultOptions = {};

    if (Conditions.isBool(options)) {
      // 'Options' are considered as useCapture
      // IE does not support the 'once' property
      resultOptions['capture'] = options;
    }

    resultOptions['once'] = true;

    Events.on(element, eventType, handler, resultOptions);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} eventType
   * @param {EventListenerOrEventListenerObject} handler
   * @param {(boolean | AddEventListenerOptions)} [options]
   */
  static on(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    element.addEventListener(eventType, handler, options);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {string} eventType
   * @param {EventListenerOrEventListenerObject} handler
   * @param {(boolean | AddEventListenerOptions)} [options]
   */
  static off(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    element.removeEventListener(eventType, handler, options);
  }

  /**
   *
   *
   * @static
   * @param {Function} callback
   */
  static ready(callback: Function, parent: Document | Window = document): void {
    Events.on(parent, 'readystatechange', () => {
      if (document.readyState === 'interactive') {
        callback();
      }
    }, false);
  }

  /**
   *
   *
   * @static
   * @param {Function} callback
   */
  static load(callback: Function, parent: Document | Window = document): void {
    Events.on(parent, 'readystatechange', () => {
      if (document.readyState === 'complete') {
        callback();
      }
    }, false);
  }

}
