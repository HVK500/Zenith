// TODO: https://lodash.com/docs/4.17.10#random

export class PseudoRandom {

  /**
   *
   *
   * @static
   * @param {number} [amount=1]
   * @returns {number[]}
   */
  public static generateRandom(amount: number = 1): number[] {
    const result: number[] = [];
    const collection = new Uint32Array(amount);
    (window.crypto || window['msCrypto']).getRandomValues(collection);

    collection.forEach((element: number): void => {
      result.push(element);
    });

    return result;
  }

  /**
   *
   *
   * @static
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  public static generateRandomFloat(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(parseFloat(`0.${PseudoRandom.generateRandom()[0]}`) * (max - min + 1)) + min;
  }

  /**
   *
   *
   * @static
   * @param {number} min
   * @param {number} max
   * @param {number} [amount=1]
   * @returns {number[]}
   */
  public static getRandomBetween(min: number, max: number, amount: number = 1): number[] {
    const result: number[] = [];
    for (let index = 0; index < amount; index++) {
      result.push(PseudoRandom.generateRandomFloat(min, max));
    }

    return result;
  }
}
