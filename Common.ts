import { Conditions } from './Common/Conditions';
import { ElementExtensions } from './Common/Extensions/ElementExtensions';
import { NumberExtensions } from './Common/Extensions/NumberExtensions';
import { StringExtensions } from './Common/Extensions/StringExtensions';
import { Logger } from './Common/Logger';
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
    Element: ElementExtensions,
    Number: NumberExtensions,
    String: StringExtensions
  };
  static Logger = Logger;
  static Util = Util;
}
