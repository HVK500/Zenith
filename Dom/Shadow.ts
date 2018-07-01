import { Events } from './Events';

// https://www.polymer-project.org/3.0/start/quick-tour
// https://devdocs.io/dom/shadowroot

/**
 *
 *
 * @export
 * @class Shadow
 */
export class Shadow {

  /**
   *
   *
   * @static
   * @param {*} selector
   * @param {*} [element=document]
   * @returns {*}
   */
  static create(selector: any, options: any, element: any = document): any {
    return element.querySelector(selector).attachShadow(options);
  }

  /**
   *
   *
   * @static
   * @param {*} element
   * @param {EventListenerOrEventListenerObject} callback
   * @param {(boolean | AddEventListenerOptions)} [options]
   */
  static onChange(element: any, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    Events.on(element, 'change', callback, options);
  }

}
