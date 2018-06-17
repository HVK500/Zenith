import { Events } from './Events';

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
  static create(selector: any, element: any = document): any {
    return element.querySelectorAll(selector).createShadowRoot();
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
