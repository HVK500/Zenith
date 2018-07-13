import { GenericBaseFactory } from './GenericBaseFactory';
import { Timer } from './Timer';
import { TimerOptions } from './TimerInternals';


/**
 *
 *
 * @export
 * @class TimerFactory
 * @extends {GenericBaseFactory}
 */
export class TimerFactory extends GenericBaseFactory {

  /**
   *
   *
   * @static
   * @param {() => void} onElapse
   * @param {number} interval
   * @param {TimerOptions} [options]
   * @returns {Timer}
   */
  static create(onElapse: () => void, interval: number, options?: TimerOptions): Timer {
    return new Timer(onElapse, interval, options);
  }

}
