import { Animation } from '../Zenith/Dom/Animation';
import { Element } from '../Zenith/Dom/Element';
import { ElementExtensions } from '../Zenith/Common/Extensions/ElementExtensions';
import { Events } from '../Zenith/Dom/Events';

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
