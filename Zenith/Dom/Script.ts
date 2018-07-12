import { Ajax } from '../Comms/Ajax';
import { Dom } from '../Dom';
import { Element } from './Element';

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
    Ajax.request(src, {
      cache: false,
      handlers: {
        success: (scriptContent, status, xhr): void => {
          Dom.appendTo(scriptContent, container);
        }
      }
    });
  }

  /**
   *
   *
   * @static
   * @param {string} src
   * @param {() => void} [callback]
   */
  static getJsonp(src: string, callback?: () => void): void { // TODO: Figure what to do with the callback
    // Disable cache for this request - use cache busting timestamp
    Dom.appendTo(Element.create('script')
       .setAttribute('src', Ajax.cacheBust(src)).element);
  }

}
