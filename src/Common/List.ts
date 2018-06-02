import { Common } from '../Common';
import { Conditions } from '../Common/Conditions';

/**
 *
 *
 * @export
 * @class List
 * @template T
 */
export class List<T> {

	/**
	 * The container that holds all the List's members.
	 *
	 * @private
	 * @type {T[]}
	 * @memberOf List
	 */
	private container: T[];

	/**
	 *
	 *
	 * @readonly
	 * @memberOf List
	 */
	get members() {
		return this.container.slice(0);
	}

	/**
	 * Creates an instance of a List.
	 *
	 * @param {...T[]} addItems
	 * @memberOf List
	 */
	constructor(...addItems: T[]) {
		this.container.push(...addItems);
	}

	/**
	 *
	 *
	 * @returns {number}
	 * @memberOf List
	 */
	count(): number {
		return this.container.length;
	}

	/**
	 *
	 *
	 * @param {*} value
	 * @param {boolean} [beginning=false]
	 * @returns {this}
	 * @memberOf List
	 */
	add(value: any, beginning: boolean = false): this {
		if (beginning) {
			this.container.unshift(value);
		} else {
			this.container.push(value);
		}

		return this;
	}

	/**
	 *
	 *
	 * @returns {this}
	 * @memberOf List
	 */
	removeFirst(): this {
		this.container.shift();
		return this;
	}

	/**
	 *
	 *
	 * @returns {this}
	 * @memberOf List
	 */
	removeLast(): this {
		this.container.pop();
		return this;
	}

	/**
	 *
	 *
	 * @param {(any | any[])} value
	 * @returns {this}
	 * @memberOf List
	 */
	removeByValue(value: T | T[]): this {
		if (!Conditions.isArray(value)) {
			value = [<T>value];
		}

		Common.each(value, (targetValue: T) => {
			this.container = Common.filter<T>(this.container, (listItem: T) => {
				return targetValue === listItem;
			});
		});

		return this;
	}

	/**
	 *
	 *
	 * @param {(number | number[])} index
	 * @returns {this}
	 * @memberOf List
	 */
	removeByIndex(index: number | number[]): this {
		if (!Conditions.isArray(index)) {
			index = [<number>index];
		}

		Common.each(<number[]>index, (targetIndex: number) => {
			this.container.splice(targetIndex, 1);
		});

		return this;
	}

	/**
	 *
	 *
	 * @returns {this}
	 * @memberOf List
	 */
	flush(): this {
		this.container = [];
		return this;
	}

	/**
	 *
	 *
	 * @param {(item: T, index: number, list: T[]) => boolean} callback
	 * @returns {*}
	 * @memberOf List
	 */
	find(callback: (item: T, index: number, list: T[]) => boolean): T {
		return this.container.find(callback) || null;
	}


	/**
	 * Determines whether all the members of an List satisfy the specified test.
	 *
	 * @param {(item: T, index: number, list: T[]) => boolean} callback Test logic to be executed against each member of the List.
	 * @returns {boolean} Whether all members have passed the specified test.
	 * @memberOf List
	 */
	all(callback: (item: T, index: number, list: T[]) => boolean): boolean {
		return this.container.every(callback);
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberOf List
	 */
	contains(): boolean {
		// TODO: do logic

		return true;
	}

	/**
	 *
	 *
	 * @param {string} [delimiter]
	 * @returns {string}
	 * @memberOf List
	 */
	concatAll(delimiter?: string): string {
		return this.container.join(delimiter);
	}

	/**
	 *
	 *
	 * @param {number} index
	 * @param {T} value
	 * @returns {this}
	 * @memberOf List
	 */
	replace(index: number, value: T): this {
		// TODO look for the item at index, and replace it

		return this;
	}

	/**
	 *
	 *
	 * @param {T} value
	 * @param {number} [startIndex=0]
	 * @returns {number}
	 * @memberOf List
	 */
	indexOf(value: T, startIndex: number = 0): number {
		return this.container.indexOf(value, startIndex);
	}

	/**
	 *
	 *
	 * @param {(a: any, b: any) => number} [callback]
	 * @returns {this}
	 * @memberOf List
	 */
	sort(callback?: (a: any, b: any) => number): this {
		this.container.sort(callback);
		return this;
	}

	/**
	 *
	 *
	 * @returns {this}
	 * @memberOf List
	 */
	reverse(): this {
		this.container.reverse();
		return this;
	}

	// /**
	//  *
	//  *
	//  * @returns {IterableIterator<T>}
	//  * @memberOf List
	//  */
	// getIterator(): IterableIterator<T> {
	// 	return this.container.values();
	// }

}
