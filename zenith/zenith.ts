import { Ajax } from './comms/ajax';
import { Common } from './common';
import { Data } from './data';
import { Dom } from './dom';

/**
 *
 *
 * @class Zenith
 */
window['Zenith'] = class Zenith {
  static Comms = {
    Ajax: Ajax
  };
  static Common = Common;
  static Data = Data;
  static Dom = Dom;
};
