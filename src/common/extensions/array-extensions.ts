import { ArrayLoopCallback } from '../common-internals';
import { Conditions } from '../conditions';
import { PseudoRandom } from '../pseudo-random';

class XArray<T> {

  /**
   * @inheritdoc
   */
  public add = function (value: T | T[]): T[] {
    XArray.processMultiple(value, (item): void => {
      this.push(item);
    });

    return this;
  };

  /**
   * @inheritdoc
   */
  public addToStart = function (value: T | T[]): T[] {
    XArray.processMultiple(value, (item): void => {
      this.unshift(item);
    });

    return this;
  };

  /**
   * @inheritdoc
   */
  public all = function (callback: ArrayLoopCallback<T, boolean>): boolean {
    return Conditions.isArrayEmpty(this) ? false : this.every(callback);
  };

  /**
   * @inheritdoc
   */
  public applyAll = function (callback: ArrayLoopCallback<T, T>): T[] {
    return this.map(callback);
  }

  /**
   * @inheritdoc
   */
  public clone = function (): T[] {
    return this.splice(0);
  };

  /**
   * @inheritdoc
   */
  public concatAll = function (separator = ' '): string {
    return this.join(separator);
  };

  /**
   * @inheritdoc
   */
  public contains = function (value: T, startIndex: number = 0): boolean {
    return Conditions.isArrayEmpty(this) ? false : this.includes(value, startIndex);
  };

  /**
   * @inheritdoc
   */
  public each = function (callback: ArrayLoopCallback<T, void>, exitCondition?: ArrayLoopCallback<T, boolean>): T[] {
    for (let i = 0; i < this.length; i++) {
      if (exitCondition && exitCondition(this[i], i, this)) break;
      callback.call(null, this[i], this, i);
    }
    return this;
  };

  /**
   * @inheritdoc
   */
  public exists = function (predicate: ArrayLoopCallback<T, boolean>): boolean {
    return this.some(predicate);
  };

  /**
   * @inheritdoc
   */
  public getRandom = function (amount: number = 1): T[] {
    amount = amount <= 0 ? 1 : (amount > this.length ? this.length : amount);

    const max = this.length - 1;
    const indicesUsed: number[] = [ null ];
    const getSeqenceItem = (): T => {
      let float = PseudoRandom.generateRandomFloat(0, max);
      while (indicesUsed.some((i): boolean => { return i === float; })) { // False means find another, true means use current
        float = PseudoRandom.generateRandomFloat(0, max);
      }

      indicesUsed.push(float);

      return this[float];
    };

    const result: T[] = [];
    for (let index = 0; index < amount; index++) {
      result.push(getSeqenceItem());
    }

    return result;
  };

  /**
   * @inheritdoc
   */
  public isEmpty = function (): boolean {
    return Conditions.isArrayEmpty(this);
  };

  /**
   * @inheritdoc
   */
  public removeByIndex = function (indices: number | number[]): T[] {
    let result: T[] = this;
    XArray.processMultiple(indices, (index: number): void => {
      result.splice(index, 1);
    });

    return result;
  };

  /**
   * @inheritdoc
   */
  public removeByValue = function (values: T | T[]): T[] {
    let result: T[] = this;
    this.processMultiple(values, (value: T): void => {
      result = result.filter((filterValue: T): boolean => {
        return value !== filterValue;
      });
    });

    return result;
  };

  /**
   * @inheritdoc
   */
  public removeFirst = function (): T[] {
    this.shift();
    return this;
  };

  /**
   * @inheritdoc
   */
  public removeLast = function (): T[] {
    this.pop();
    return this;
  };


  /**
   * Provides a loop layer that can be used in T methods that need to take in multiple values and loop through them.
   *
   * @private
   * @static
   * @param {(T | T[])} value
   * @param {ArrayLoopCallback<T, void>} callback A generic loop function.
   */
  private static processMultiple(value: any | any[], callback: ArrayLoopCallback<any, void>): void {
    if (!Conditions.isArray(value)) {
      value = [value];
    }

    value.forEach(callback);
  }
}

/**
 * Collection of useful extensions to be used on Arrays.
 */
export namespace ArrayExtensions {
  Object.setPrototypeOf(Array.prototype, new XArray<any>());
}
