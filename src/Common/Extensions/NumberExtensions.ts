import { StringExtensions } from './StringExtensions';
import { Common } from '../../Common';

/**
 *
 *
 * @export
 * @class NumberExtensions
 */
export class NumberExtensions {

	/**
	 *
	 *
	 * @private
	 * @static
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 * @memberOf NumberExtensions
	 */
	private static generateRandomFloat(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(parseFloat('0.' + <number>NumberExtensions.getRandom()) * (max - min + 1)) + min;
	}


	/**
	 *
	 *
	 * @static
	 * @param {number} value
	 * @param {number} outOf
	 * @param {boolean} [useSymbol=false]
	 * @returns {(number | string)}
	 *
	 * @memberOf NumberExtensions
	 */
	static percent(value: number, outOf: number, useSymbol: boolean = false): number | string {
		const result = (value / outOf) * 100;
		if (useSymbol) return StringExtensions.concat(result, '%');
		return result;
	}

	/**
	 *
	 *
	 * @static
	 * @param {number} [amount=1]
	 * @returns {(number | number[])}
	 * @memberOf NumberExtensions
	 */
	static getRandom(amount: number = 1): number | number[] {
		const result: number[] = [];
		const collection = new Uint32Array(amount);
		(window.crypto || window['msCrypto']).getRandomValues(collection);

		Common.each(collection, (generatedNumber) => {
			result.push(generatedNumber);
		});

		if (amount === 1) {
			return result[0];
		}

		return result;
	}

	/**
	 *
	 *
	 * @static
	 * @param {number} min
	 * @param {number} max
	 * @param {number} [amount=1]
	 * @returns {(number | number[])}
	 * @memberOf NumberExtensions
	 */
	static getRandomBetween(min: number, max: number, amount: number = 1): number | number[] {
		if (amount === 1) {
			return NumberExtensions.generateRandomFloat(min, max);
		}

		const result: number[] = [];
		for (let index = 0; index < amount; index++) {
			result.push(NumberExtensions.generateRandomFloat(min, max));
		}

		return result;
	}

	/**
	 *
	 *
	 * @static
	 * @param {any[]} sequence
	 * @param {number} [amount=1]
	 * @returns {(number | number[])}
	 * @memberOf NumberExtensions
	 */
	static getRandomFromSequence(sequence: any[], amount: number = 1): number | number[] {
		const min = 0;
		const max = sequence.length - 1;
		const getSeqenceItem = () => { return sequence[NumberExtensions.generateRandomFloat(min, max)]; };

		if (amount === 1) {
			return getSeqenceItem();
		}

		const result: number[] = [];
		for (let index = 0; index < amount; index++) {
			result.push(getSeqenceItem());
		}

		return result;
	}

	/**
	 * Extracts the number from a given value.
	 *
	 * @static
	 * @param {string} value
	 * @param {boolean} [all=false]
	 * @returns {number}
	 * @memberof NumberExtensions
	 */
	static extractNumber(value: string, all: boolean = false): number {
		const regex = all ? /\D+/g : /^[^\d-]+/;
		return parseFloat(value.replace(regex, ''));
	}

	/**
	 * Bump the given value up by one.
	 *
	 * @static
	 * @param {number} value
	 * @returns {number}
	 * @memberof NumberExtensions
	 */
	static plusOne(value: number): number {
		return value++;
	}

	/**
	 * Bump the given value down by one.
	 *
	 * @static
	 * @param {number} value
	 * @returns {number}
	 * @memberof NumberExtensions
	 */
	static minusOne(value: number): number {
		return value--;
	}

	/**
	 * Pad the given value with the given amont of zeros.
	 *
	 * @static
	 * @param {(string | number)} value
	 * @param {number} [length=1]
	 * @returns {string}
	 * @memberof NumberExtensions
	 */
	static padZero(value: string | number, length: number = 1): string {
		length -= StringExtensions.toString(value).length;

		if (length > 0) {
			return StringExtensions.concat(new Array(length + (/\./.test(<string>value) ? 2 : 1)).join('0'), value);
		}

		return <string>value;
	}

}
