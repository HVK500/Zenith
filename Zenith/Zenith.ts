import { Common } from './Common';
import { Ajax } from './Comms/Ajax';
import { Data } from './Data';
import { Dom } from './Dom';

/**
 *
 *
 * @class Zenith
 */
class Zenith {
  static Comms = {
    Ajax: Ajax
  };
  static Common = Common;
  static Data = Data;
  static Dom = Dom;
}

window['Zenith'] = Zenith;
