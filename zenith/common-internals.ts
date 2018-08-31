import { Dictionary } from './data/dictionary';

export type DictionaryLoopCallback<TKey, TValue> = (value: TValue, key?: TKey, dictionary?: Dictionary<TKey, TValue>) => void;
export type ArrayLoopCallback<T, R> = (item: T, index?: number, array?: T[]) => R;
export type ObjectLoopCallback<T> = (value: T, key?: string, index?: number) => void;
export type KeyValuePair<TValue> = { [key: string]: TValue };
