import { List } from './List';

/**
 *
 *
 * @export
 * @class Queue
 * @template T
 */
export class Queue<T> {

	/**
	 *
	 *
	 * @private
	 * @type {List<T>}
	 * @memberOf Queue
	 */
	private container: List<T>;

	/**
	 *
	 *
	 * @private
	 * @type {T}
	 * @memberOf Queue
	 */
	private previousCache: T;

	/**
	 *
	 *
	 * @readonly
	 * @memberOf Queue
	 */
	get members() {
		return this.container.members;
	}

	/**
	 * Creates an instance of a Queue.
	 *
	 * @param {...T[]} addItems
	 * @memberOf Queue
	 */
	constructor(...addItems: T[]) {
		this.container = new List(...addItems);
		this.previousCache = null;
	}

	/**
	 *
	 *
	 * @returns {T}
	 * @memberOf Queue
	 */
	next(): T { // TODO: and a callcback here and plugin the next value in to the callback, then proceed with the logic
		const result = this.container.members[0];
		this.previousCache = result;
		this.container.removeFirst();
		return result;
	}

	/**
	 *
	 *
	 * @returns {T}
	 * @memberOf Queue
	 */
	previous(): T {
		return this.previousCache;
	}

	/**
	 *
	 *
	 * @param {T} value
	 * @param {boolean} [beginning=false]
	 * @returns {this}
	 * @memberOf Queue
	 */
	add(value: T, beginning: boolean = false): this {
		this.container.add(value, beginning);
		return this;
	}

	/**
	 *
	 *
	 * @param {(T | T[])} value
	 * @returns {this}
	 * @memberOf Queue
	 */
	removeByValue(value: T | T[]): this {
		this.container.removeByValue(value);
		return this;
	}

	/**
	 *
	 *
	 * @param {(number | number[])} index
	 * @returns {this}
	 * @memberOf Queue
	 */
	removeByIndex(index: number | number[]): this {
		this.container.removeByIndex(index);
		return this;
	}

	/**
	 *
	 *
	 * @param {(a: any, b: any) => number} [callback]
	 * @returns {this}
	 * @memberOf Queue
	 */
	sort(callback?: (a: any, b: any) => number): this {
		this.container.sort(callback);
		return this;
	}

	/**
	 *
	 *
	 * @returns {this}
	 * @memberOf Queue
	 */
	reverse(): this {
		this.container.reverse();
		return this;
	}

}
