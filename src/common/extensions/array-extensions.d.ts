declare interface Array<T> {

  /**
   * Adds the given value(s) to the end of a given collection.
   *
   * @param value The value(s) to be added to the end of the array.
   * @returns {[]} The modified array.
   */
  add(value: T | T[]): T[];

  /**
   * Adds given value(s) to the start of the given array.
   *
   * @param value The value(s) to be added to beginning of the array. Note: the first item will be the last item to added to the beginning of the array.
   * @returns {[]} The modified array.
   */
  addToStart(value: T | T[]): T[];

  /**
   * Determines whether all the elements of an array satisfies the given test callback.
   *
   * @param {(item: T, index?: number, collection?: T[]) => boolean} callback A function that tests each element of the array. Only if all elements are true then all will return true.
   * @returns {boolean} Whether or not all the elements of the given array satisfy the given test callback. A false will be returned if the given array is empty.
   */
  all(callback: (item: T, index?: number, array?: T[]) => boolean): boolean;

  /**
   * Creates a copy of the source array.
   *
   * @returns {[]} A clone array.
   */
  clone(): T[];

  /**
   * Adds all the elements of an array separated by the specified separator string.
   *
   * @param {string} [separator=' '] A optional separator that is inserted between each array element. Default value is a whitespace.
   * @returns {string} The given array's elements concatenated together with the given separator.
   */
  concatAll(separator?: string): string;

  /**
   * Determines whether a given value is contained in the given array.
   *
   * @param {T} value The search value.
   * @param {number} [startIndex=0] The index to start searching from. Default is the start of the array.
   * @returns {boolean} Whether or not the given item was found.
   */
  contains(value: T, startIndex?: number): boolean;

  /**
   * Loop through all items in an given array, passing the meta data of the given value to a given callback.
   *
   * @param {(item: T, index?: number, collection?: T[]) => void} callback A function that is run over each item iteration of the array.
   * @param {(item: T, index?: number, collection?: T[]) => boolean} [exitCondition] A function that determines whether the loop should continue or exit early.
   */
  each(callback: (item: T, index?: number, array?: T[]) => void, exitCondition?: (item: T, index?: number, array?: T[]) => boolean): T[];

  /**
   * Determines whether the given predicate passes for the expected items.
   *
   * @param {(item: T, index?: number, collection?: T[]) => boolean} [predicate] Function that dictates whether a item exists with the given match constraints.
   * @returns {boolean} Whether or not the callback matched T element in the given array.
   */
  exists(predicate: (item: T, index?: number, array?: T[]) => boolean): boolean;

  /**
   * Retrieves a random element the source array.
   *
   * @param {number} [amount=1] The amount of random values to be returned.
   * @returns {[]}
   */
  getRandom(amount?: number): T[];

  /**
   * Determines whether the array is empty or not.
   *
   * @returns {boolean} Whether the array is empty or not.
   */
  isEmpty(): boolean;

  /**
   * Removes the given index/indices from the given array.
   *
   * @param {(number | number[])} indices The index/indices to be removed from the array.
   * @returns {[]} The modified array.
   */
  removeByIndex(indices: number | number[]): T[];

  /**
   * Removes the given value(s) from the given array.
   *
   * @param {(T | T[])} value The value(s) to be removed from the array.
   * @returns {[]} The modified array.
   */
  removeByValue(values: T | T[]): T[];

  /**
   * Removes the first element of the given array.
   *
   * @returns {[]} The modified array.
   */
  removeFirst(): T[];

  /**
   * Removes the last element of the given array.
   *
   * @returns {T} The modified array.
   */
  removeLast(): T[];
}