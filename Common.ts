import { ArrayExtensions } from './Common/Extensions/ArrayExtensions';
import { Conditions } from './Common/Conditions';
import { ElementExtensions } from './Common/Extensions/ElementExtensions';
import { Logger } from './Common/Logger';
import { NumberExtensions } from './Common/Extensions/NumberExtensions';
import { StringBuilderProvider } from './Common/Providers/StringBuilderProvider';
import { StringExtensions } from './Common/Extensions/StringExtensions';
import { TimerProvider } from './Common/Providers/TimerProvider';
import { Util } from './Common/Util';

/**
 *
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
  static StringBuilder = StringBuilderProvider;
  static Timer = TimerProvider;
}
