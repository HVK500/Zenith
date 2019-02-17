import { KeyValuePair } from '../common/common-internals';
export interface ReplacementClass {
    newClass: string;
    oldClass: string;
}
export declare type CssStyle = KeyValuePair<string>;
