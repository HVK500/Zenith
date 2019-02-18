export declare class PseudoRandom {
    /**
     *
     *
     * @static
     * @param {number} [amount=1]
     * @returns {number[]}
     */
    static generateRandom(amount?: number): number[];
    /**
     *
     *
     * @static
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static generateRandomFloat(min: number, max: number): number;
    /**
     *
     *
     * @static
     * @param {number} min
     * @param {number} max
     * @param {number} [amount=1]
     * @returns {number[]}
     */
    static getRandomBetween(min: number, max: number, amount?: number): number[];
}
