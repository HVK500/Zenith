import { Conditions } from './common/conditions';
// import { Logger } from './common/Logger';
import { StringBuilder } from './common/string-builder';
import { Timer } from './common/timer';
import { Ajax } from './comms/ajax';
import { Identifiers } from './data/identifiers';
import { List } from './data/list';
import { Queue } from './data/queue';
import { Storage } from './data/storage';
import { Element } from './dom/element';
import { Events } from './dom/events';
import { Shadow } from './dom/shadow';
import { Styling } from './dom/styling';

window['Zenith'] = class Zenith {
  static Comms = {
    Ajax: Ajax
  };
  static Common = {
    Conditions: Conditions,
    // Logger: Logger,
    StringBuilder: StringBuilder,
    Timer: Timer
  };
  static Data = {
    Identifiers: Identifiers,
    List: List,
    Queue: Queue,
    Storage: Storage
  };
  static Dom = {
    Animation: Animation,
    Element: Element,
    Events: Events,
    Shadow: Shadow,
    Styling: Styling
  };
};
