import { Animation } from './dom/animation';
import { Element } from './dom/element';
import { ElementExtensions } from './common/extensions/element-extensions';
import { Events } from './dom/events';
import { Script } from './dom/script';
import { Shadow } from './dom/shadow';

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
   */
  static Script = Script;

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
