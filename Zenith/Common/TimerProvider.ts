import { GenericProvider } from './../ProviderInternals';
import { Timer } from './Timer';
import { TimerOptions } from './TimerInternals';


/**
 *
 *
 * @export
 * @class TimerProvider
 * @extends {GenericProvider}
 */
export class TimerProvider extends GenericProvider {

  /**
   *
   *
   * @static
   * @param {() => void} onElapse
   * @param {number} interval
   * @param {TimerOptions} [options]
   * @returns {Timer}
   */
  static getInstance(onElapse: () => void, interval: number, options?: TimerOptions): Timer {
    return new Timer(onElapse, interval, options);
  }

}
