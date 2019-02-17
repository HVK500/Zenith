import { Dictionary } from '../data/dictionary';
export declare type DictionaryLoopCallback<TKey, TValue> = (value: TValue, key?: TKey, dictionary?: Dictionary<TKey, TValue>) => void;
export declare type ArrayLoopCallback<T, R> = (item: T, index?: number, array?: T[]) => R;
export declare type ObjectLoopCallback<T> = (value: T, key?: string, index?: number) => void;
export declare type KeyValuePair<TValue> = {
    [key: string]: TValue;
};
