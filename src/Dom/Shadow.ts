import { Events } from './Events';

export class Shadow {

  static create(selector: any, element: any = document): any {
    return element.querySelectorAll(selector).createShadowRoot();
  }

  static onChange(element: any, callback: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    Events.on(element, 'change', callback, options);
  }

}