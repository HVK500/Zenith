import { ArrayExtensions } from './common/extensions/array-extensions';
import { Conditions } from './common/Conditions';
import { ElementExtensions } from './common/Extensions/element-extensions';
import { Logger } from './common/Logger';
import { NumberExtensions } from './common/extensions/number-extensions';
import { StringBuilder } from './common/string-builder';
import { StringExtensions } from './common/extensions/string-extensions';
import { Timer } from './common/timer';
import { Util } from './common/util';

/**
 * A collection of common modules that can be shared across other modules.
 *
 * @export
 * @class Common
 */
export class Common {
  static Conditions = Conditions;
  static Extensions = {
    Array: ArrayExtensions,
    Element: ElementExtensions,
    Number: NumberExtensions,
    String: StringExtensions
  };
  static Logger = Logger;
  static Util = Util;
  static StringBuilder = StringBuilder;
  static Timer = Timer;
}
