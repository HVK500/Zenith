/// <reference path="../common/extensions/array-extensions.d.ts" />
import 'common/extensions/array-extensions';

import { ArrayLoopCallback } from '../common/common-internals';


/**
 * Represents a strongly typed list of objects that can be accessed by index. Provides methods to search, sort, and manipulate lists.
 *
 * @export
 * @class List
 * @template T As the provided type.
 */
export class List<T> {

  /**
   * The container that holds all the List's elements.
   *
   * @private
   * @type {T[]}
   */
  private container: T[];

  /**
   * Creates an instance of a List.
   *
   * @param {...T[]} items Rest parameter of all the items to be added to the List instance.
   */
  constructor(...items: T[]) {
    this.container = items;
  }

  /**
   * Returns the number of elements contained in the List.
   *
   * @readonly
   * @type {number}
   */
  get count(): number {
    return this.container.length;
  }

  /**
   * Returns the first element of the List, if List is empty undefined is returned.
   *
   * @readonly
   * @type {T}
   */
  get first(): T {
    return this.container[0];
  }

  /**
   * Returns the last element of the List, if List is empty undefined is returned.
   *
   * @readonly
   * @type {T}
   */
  get last(): T {
    return this.container[this.count - 1];
  }

  /**
   * Adds given value(s) to the end of the List.
   *
   * @param {T | T[]} value The value(s) to be added to the end of the List.
   * @returns {this} The List instance.
   */
  public add(value: T | T[]): this {
    this.container.add(value);
    return this;
  }

  /**
   * Adds given value(s) to the start of the List.
   *
   * @param {T | T[]} value The value(s) to be added to the beginning of the List. Note: the first item will be the last item to added to the beginning of the List.
   * @returns {this} The List instance.
   */
  public addToStart(value: T | T[]): this {
    this.container.addToStart(value);
    return this;
  }

  /**
   * Determines whether all the elements of a List satisfy the specified test.
   *
   * @param {(item: T, index?: number, list?: T[]) => boolean} callback A function that tests each element of the List. Only if all elements are true then all will return true.
   * - item is the current element in the operation.
   * - index is the current index of the item.
   * - list is the current collection of items.
   * @returns {boolean} Whether or not all elements in the List met the callback's conditions.
   */
  public all(callback: ArrayLoopCallback<T, boolean>): boolean {
    return this.container.all(callback);
  }

  /**
   * Modify each element of the list in place with the given callback.
   *
   * @param {(item: T, index?: number, list?: T[]) => T} callback The modifiyng callback that gets applyed to each element in the List.
   * @returns {this} The List instance.
   */
  public applyAll(callback: (item: T, index?: number, list?: T[]) => T): this {
    this.container = this.container.map(callback);
    return this;
  }

  /**
   * Clears all elements from the List.
   *
   * @returns {this} The List instance.
   */
  public clear(): this {
    this.container = [];
    return this;
  }

  /**
   * Adds all the elements of the List separated by the specified separator string.
   *
   * @param {string} [separator] A optional separator that is inserted between each List element. Default value is a whitespace.
   * @returns {string} The List's elements concatenated together with the given separator.
   */
  public concatAll(separator?: string): string {
    return this.container.concatAll(separator);
  }

  /**
   * Determines whether a given value is contained in the List.
   *
   * @param {T} value Search value.
   * @param {number} [startIndex] The index to start searching from. Default is the start of the List.
   * @returns {boolean} Whether or not the List contains the given value.
   */
  public contains(value: T, startIndex?: number): boolean {
    return this.container.contains(value, startIndex);
  }

  /**
   * Loop through all items in the List, passing the meta data of the given value to a given callback.
   * Note: This method does not cater for adding/removing items while looping.
   *
   * @param {(item: T, list?: T[], index?: number) => void} callback A function that is run over each item iteration of the List.
   * - item is the current element in the loop operation.
   * - list is the current collection of items.
   * - index is the current index of the item.
   * @returns {this} The List instance.
   */
  public each(callback: ArrayLoopCallback<T, void>, exitCondition?: ArrayLoopCallback<T, boolean>): this {
    this.container.each(callback, exitCondition);
    return this;
  }

  /**
   * Determines whether the given callback returns true for any element in the List.
   *
   * @param {(item: T, index?: number, list?: T[]) => boolean} predicate A function that returns true when any value meets the conditions of the callback.
   * - item is the current element in the operation.
   * - index is the current index of the item.
   * - list is the current collection of items.
   * @returns {boolean} Whether or not any element in he List met the callback's conditions.
   */
  public exists(predicate: ArrayLoopCallback<T, boolean>): boolean {
    return this.container.exists(predicate);
  }

  /**
   * Applies a predicate against the List and values that do not pass, get removed from the list.
   *
   * @param {(item: T, list?: T[], index?: number) => boolean} predicate TODO
   * - item is the current element in the loop operation.
   * - list is the current collection of items.
   * - index is the current index of the item.
   * @returns {this} The List instance.
   */
  public filter(predicate: ArrayLoopCallback<T, boolean>): this {
    this.container = this.container.filter(predicate);
    return this;
  }

  /**
   * TODO
   *
   * @param {(number)} index TODO
   * @returns {T} TODO
   */
  public getValueByIndex(index: number): T {
    return this.container[index];
  }

  /**
   * Returns the index of the first occurrence of a given value in the List.
   *
   * @param {T} value
   * @param {number} [fromIndex=0]
   * @returns {number} Index of matched value or if nothing matchs null.
   */
  public indexOf(value: T, fromIndex?: number): number {
    return this.container.indexOf(value, fromIndex);
  }

  /**
   * Checks whether the List is empty or not.
   *
   * @returns {boolean} Whether the List is empty.
   */
  public isEmpty(): boolean {
    return this.container.isEmpty();
  }

  /**
   * Returns the index of the last occurrence of a given value in the List.
   *
   * @param {T} value
   * @param {number} [fromIndex]
   * @returns {number} Index of matched value or if nothing matchs null.
   */
  public lastIndexOf(value: T, fromIndex?: number): number {
    return this.container.lastIndexOf(value, fromIndex);
  }

  /**
   * Removes the given index/indices from the List.
   *
   * @param {(number | number[])} indices The index/indices to be removed from the List.
   * @returns {this} The List instance.
   */
  public removeByIndex(indices: number | number[]): this {
    this.container.removeByIndex(indices);
    return this;
  }

  /**
   * Removes the given value(s) from the List.
   *
   * @param {(T | T[])} value The value(s) to be removed from the List.
   * @returns {this} The List instance.
   */
  public removeByValue(value: T | T[]): this {
    this.container.removeByValue(value);
    return this;
  }

  /**
   * Removes the first element of the List.
   *
   * @returns {T} The value removed from the List.
   */
  public removeFirst(): T {
    return this.container.shift();
  }

  /**
   * Removes the last element of the List.
   *
   * @returns {T} The value removed from the List.
   */
  public removeLast(): T {
    return this.container.pop();
  }

  /**
   * Reverses the order of the List.
   *
   * @returns {this} The List instance.
   */
  public reverse(): this {
    this.container.reverse();
    return this;
  }

  /**
   * Returns the value of the first element in the List that satisfies the given test callback.
   *
   * @param {(item: T, index?: number, list?: T[]) => boolean} predicate A function that returns true when a particular value is found.
   * - item is the current element in the finding operation.
   * - index is the current index of the item.
   * - list is the current collection of items.
   * @returns {T} Found value.
   */
  public select(predicate: ArrayLoopCallback<T, boolean>): T {
    return this.container.find(predicate);
  }

  /**
   * Sorts the List according to the result from the given callback, if omitted it is sorted according to each character's Unicode point value.
   *
   * @param {(a: T, b: T) => number} [callback] Function that defines the sort order, where (a) and (b) are the elements being compared.
   * - If less than 0 sort (a) to lower index than (b), (a) comes first.
   * - If 0 leave (a) and (b) unchanged in respect to each other.
   * - If greater than 0 sort (b) to lower index than (a), (b) comes first.
   * - All undefined elements are sorted to the end of the array.
   * @returns {this} The List instance.
   */
  public sort(callback?: (a: T, b: T) => number): this {
    this.container.sort(callback);
    return this;
  }

  /**
   * Converts the List to an array.
   *
   * @returns {T[]} A clone of the List's container array.
   */
  public toArray(): T[] {
    return this.container.clone();
  }

  /**
   * TODO
   *
   * @param {(item: T, list?: T[], index?: number) => boolean} predicate TODO
   * - item is the current element in the loop operation.
   * - list is the current collection of items.
   * - index is the current index of the item.
   * @returns {T[]} Found values.
   */
  public where(predicate: ArrayLoopCallback<T, boolean>): T[] {
    return this.container.filter(predicate);
  }

}
