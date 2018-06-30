import { Ajax } from './Comms/Ajax';
import { Common } from './Common';
import { Data } from './Data';
import { Dom } from './Dom';

class Zenith {
  static Comms = {
    Ajax: Ajax
  };
  static Common = Common;
  static Data = Data;
  static Dom = Dom;
}

window['Zenith'] = Zenith;
