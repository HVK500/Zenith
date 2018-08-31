import { Util } from '../common/util';
import { DictionaryLoopCallback } from '../common-internals';

export class Dictionary<TKey, TValue> {

  private container: Map<TKey, TValue>;

  private addCallback: (addedItemKey: TKey, addedItemValue: TValue) => void;

  private removeCallback: (removedItemKey: TKey) => void;

  get entries(): [ TKey, TValue ][]  {
    return Array.from(this.container.entries());
  }

  get keys(): TKey[]  {
    return Array.from(this.container.keys());
  }

  get values(): TValue[]  {
    return Array.from(this.container.values());
  }

  get count(): number {
    return this.container.size;
  }

  set onAdd(callback: (addedItemKey: TKey, addedItemValue: TValue) => void) {
    this.addCallback = callback;
  }

  set onRemove(callback: (removedItemKey: TKey) => void) {
    this.removeCallback = callback;
  }

  constructor(...items: [ TKey, TValue ][]) {
    this.container = new Map();
    Util.each(items, (keyValuePair: [ TKey, TValue ]) => {
      this.container.set(keyValuePair[0], keyValuePair[1]);
    });
  }

  fetchMany(keys: TKey[]): TValue[] {
    let result: TValue[] = [];
    Util.each(keys, (key: TKey) => {
      result.push(this.fetch(key));
    });

    return result;
  }

  fetch(key: TKey): TValue {
    return this.container.get(key);
  }

  // addMany(keyValuePairs: [ Tkey, Tvalue ][]): this {
  //   Util.each(keyValuePairs, (key: Tkey, value: Tvalue) => {
  //     this.container.set(key, value);
  //   });

  //   return this;
  // }

  add(key: TKey, value: TValue): this {
    this.container.set(key, value);
    Util.executeCallback(this.addCallback, key, value);
    return this;
  }

  remove(key: TKey): this {
    this.container.delete(key);
    Util.executeCallback(this.removeCallback, key);
    return this;
  }

  each(callback: DictionaryLoopCallback<TKey, TValue>): this {
    this.container.forEach((value, key) => {
      callback(value, key, this);
    });

    return this;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear(): this {
    this.container.clear();
    return this;
  }

  contains(key: TKey): boolean {
    return this.container.has(key);
  }

}
