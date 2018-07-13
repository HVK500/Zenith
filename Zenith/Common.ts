import { Conditions } from './Common/Conditions';
import { ArrayExtensions } from './Common/Extensions/ArrayExtensions';
import { ElementExtensions } from './Common/Extensions/ElementExtensions';
import { NumberExtensions } from './Common/Extensions/NumberExtensions';
import { StringExtensions } from './Common/Extensions/StringExtensions';
import { Logger } from './Common/Logger';
import { StringBuilderFactory } from './Common/StringBuilderFactory';
import { TimerFactory } from './Common/TimerFactory';
import { Util } from './Common/Util';

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
  static StringBuilder = StringBuilderFactory;
  static Timer = TimerFactory;
}
