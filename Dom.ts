import { Animation } from './Dom/Animation';
import { Element } from './Dom/Element';
import { ElementExtensions } from './Common/Extensions/ElementExtensions';
import { Events } from './Dom/Events';
import { Shadow } from './Dom/Shadow';

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
   */
  static Animation = Animation;

  /**
   *
   *
   * @static
   */
  static Element = Element;

  /**
   *
   *
   * @static
   */
  static Events = Events;

  /**
   *
   *
   * @static
   */
  static Shadow = Shadow;

  /**
   *
   *
   * @static
   * @param {*} content
   * @param {string} [target='body'] The target area of the document container, accepted values are 'body' or 'head'.
   */
  static appendTo(content: any, target: string = 'body'): void { // TODO: Change the target to a better implementation... :( sub-optimal
    ElementExtensions.append(document[target.toLocaleLowerCase()], content);
  }

}
