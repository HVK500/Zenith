import { Common } from '../../Common';
import { Conditions } from '../Conditions';

/**
 *
 *
 * @export
 * @class ElementExtensions
 */
export class ElementExtensions {

	/**
	 *
	 *
	 * @static
	 * @param {*} element
	 * @param {string} name
	 * @returns {string}
	 * @memberOf ElementExtensions
	 */
	static getAttribute(element: any, name: string): string {
		return element.getAttribute(name);
	}

	/**
	 *
	 *
	 * @static
	 * @param {*} element
	 * @param {string} name
	 * @param {string} value
	 * @memberOf ElementExtensions
	 */
	static setAttribute(element: any, name: string, value: string): void {
		element.setAttribute(name, value);
	}

	/**
	 *
	 *
	 * @static
	 * @param {*} element
	 * @param {string} name
	 * @memberOf ElementExtensions
	 */
	static removeAttribute(element: any, name: string): void {
		element.removeAttribute(name);
	}

	/**
	 *
	 *
	 * @static
	 * @param {*} element
	 * @param {string} content
	 * @param {boolean} [overwrite=false]
	 * @returns {void}
	 * @memberOf ElementExtensions
	 */
	static append(element: any, content: string, overwrite: boolean = false): void {
		if (overwrite || Conditions.isString(element)) {
			element.innerHTML = `${element.innerHTML}${content}`;
			return;
		}
		element.appendChild(content);
	}

	/**
	 *
	 *
	 * @static
	 * @param {*} element
	 * @param {*} beforeElement
	 * @param {string} content
	 * @param {boolean} [overwrite=false]
	 * @returns {void}
	 * @memberOf ElementExtensions
	 */
	static prepend(element: any, content: string, beforeElement?: any, overwrite: boolean = false): void {
		if (overwrite || Conditions.isString(element)) {
			element.innerHTML = `${content}${element.innerHTML}`;
			return;
		}

		// TODO Allow a slector to be passed in for the beforeElement
		element.insertBefore(content, (beforeElement || element.firstChild || null));
	}

	/**
	 *
	 *
	 * @static
	 * @param {*} element
	 * @param {string} selector
	 * @memberOf ElementExtensions
	 */
	static only(element: any, selector: string): void {
		const selectedNodes = element.querySelectorAll(selector);

		Common.each(selectedNodes, (node) => { // TODO: type these
			element.removeChild(node);
		});
	}

}
