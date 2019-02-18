declare interface Object {

  /**
   * Loop through all items in an given array, passing the meta data of the given value to a given callback.
   *
   * @param {(value: T, key?: string, index?: number) => void} callback A function that is run over each property iteration of the object.
   * @param {(item: T, index?: number, collection?: T[]) => boolean} [exitCondition] A function that determines whether the loop should continue or exit early.
   */
  each<T>(callback: (value: T, key?: string, index?: number) => void, exitCondition?: (value: T, key?: string, index?: number) => boolean): T;

  fetch<T>(keyPath: string): T;

  isEmpty(): boolean;

  toArray<T>(): T[];
}