import { Animation } from './Dom/Animation';
import { Element } from './Dom/Element';
import { ElementExtensions } from './Common/Extensions/ElementExtensions';
import { Events } from './Dom/Events';

/**
 *
 *
 * @export
 * @class Dom
 */
export class Dom {

  /**
   *
   *
   * @static
   * @memberOf Dom
   */
  static Animation = Animation;

  /**
   *
   *
   * @static
   * @memberOf Dom
   */
  static Element = Element;

  /**
   *
   *
   * @static
   * @memberOf Dom
   */
  static Events = Events;

  /**
   *
   *
   * @static
   * @param {*} content
   * @param {string} [target='body'] The target area of the document container, accepted values are 'body' or 'head'.
   * @memberOf Dom
   */
  static appendTo(content: any, target: string = 'body'): void { // TODO: Change the target to a better implementation... :( sub-optimal
    ElementExtensions.append(document[target.toLocaleLowerCase()], content);
  }

}
