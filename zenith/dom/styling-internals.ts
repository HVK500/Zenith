import { KeyValuePair } from '../common/common-internals';

export interface ReplacementClass {
  newClass: string;
  oldClass: string;
}

export type CssStyle = KeyValuePair<string>;
