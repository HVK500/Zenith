import { StringExtensions } from './string-extensions';
import { Util } from '../util';

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
   */
  private static generateRandomFloat(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(parseFloat(`0.${<number>NumberExtensions.generateRandom()}`) * (max - min + 1)) + min;
  }


  /**
   *
   *
   * @static
   * @param {number} value
   * @param {number} outOf
   * @param {boolean} [useSymbol=false]
   * @returns {(number | string)}
   */
  static percent(value: number, outOf: number, useSymbol: boolean = false): number | string {
    const result = (value / outOf) * 100;
    if (useSymbol) return `${result}%`;
    return result;
  }

  /**
   *
   *
   * @static
   * @param {number} [amount=1]
   * @returns {(number | number[])}
   */
  static generateRandom(amount: number = 1): number | number[] {
    const result: number[] = [];
    const collection = new Uint32Array(amount);
    (window.crypto || window['msCrypto']).getRandomValues(collection);

    Util.each<number>(<any>collection, (value: number): void => {
      result.push(value);
    });

    if (amount === 1) return result[0];

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
   */
  static extractNumber(value: string, all: boolean = false): number {
    const regex = all ? /\D+/g : /^[^\d-]+/;
    return parseFloat(value.replace(regex, ''));
  }

}
