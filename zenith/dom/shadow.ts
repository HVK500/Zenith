import { Events } from './events';

// https://www.polymer-project.org/3.0/start/quick-tour
// https://devdocs.io/dom/shadowroot

/**
 *
 *
 * @export
 * @class Shadow
 */
export class Shadow {
  public static create(selector: any, options: any, element: any = document): any {
    return element.querySelector(selector).attachShadow(options);
  }

  public static onChange(element: any, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    Events.on(element, 'change', callback, options);
  }
}
