import { Ajax } from '../comms/ajax';
import { Dom } from '../dom';
import { Element } from './element';

/**
 *
 *
 * @export
 * @class Script
 */
export class Script {

  /**
   *
   *
   * @static
   * @param {string} src
   * @param {() => void} [callback]
   * @param {string} [container='head']
   */
  static getScript(src: string, callback?: () => void, container: string = 'head'): void { // TODO: Figure what to do with the callback
    // Disable caching for this request
    Ajax.sendRequest(src, {
      cache: false,
      handlers: {
        success: (responseContent): void => {
          const scriptElement = Element.create('script');
          scriptElement.inner = responseContent;
          Dom.appendTo(scriptElement.element, container);
        }
      }
    });
  }

  //// Use this snippet to reappoach the jsonp functionality - https://codepen.io/CWSpear/pen/srulx
  // /**
  //  *
  //  *
  //  * @static
  //  * @param {string} src
  //  * @param {() => void} [callback]
  //  */
  // static getJsonp(src: string, callback?: () => void): void { // TODO: Figure what to do with the callback
  //   // Disable cache for this request - use cache busting timestamp
  //   Dom.appendTo(Element.create('script')
  //       .setAttribute('src', Ajax.cacheBust(src)).element, 'head');
  // }

}
