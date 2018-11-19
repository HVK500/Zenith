import { Conditions } from '../common/conditions';

export class Events {
  public static load(callback: Function, parent: Document | Window = document): void {
    Events.on(parent, 'readystatechange', (): void => {
      if (document.readyState === 'complete') { // This state is equivalent "load"
        Conditions.callOrVoid(callback);
      }
    }, false);
  }

  public static off(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    element.removeEventListener(eventType, handler, options);
  }

  public static on(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    element.addEventListener(eventType, handler, options);
  }

  public static once(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    let resultOptions = {};

    if (Conditions.isBool(options)) {
      // 'Options' are considered as useCapture
      // IE does not support the 'once' property
      resultOptions['capture'] = options;
    }

    resultOptions['once'] = true;

    Events.on(element, eventType, handler, resultOptions);
  }

  public static ready(callback: Function, parent: Document | Window = document): void {
    Events.on(parent, 'readystatechange', (): void => {
      if (document.readyState === 'interactive') { // This state is equivalent "DOMContentLoaded"
        Conditions.callOrVoid(callback);
      }
    }, false);
  }
}
