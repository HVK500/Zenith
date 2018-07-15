import { ArrayExtensions } from './Common/Extensions/ArrayExtensions';
import { Conditions } from './Common/Conditions';
import { ElementExtensions } from './Common/Extensions/ElementExtensions';
import { GenericInstanceFactory } from './Common/GenericInstanceFactory';
import { Logger } from './Common/Logger';
import { NumberExtensions } from './Common/Extensions/NumberExtensions';
import { StringBuilder } from './Common/StringBuilder';
import { StringExtensions } from './Common/Extensions/StringExtensions';
import { Timer } from './Common/Timer';
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
  static StringBuilder = new GenericInstanceFactory<StringBuilder>(StringBuilder);
  static Timer = new GenericInstanceFactory<Timer>(Timer);
}
