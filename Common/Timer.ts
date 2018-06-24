import { ITimerOptions, TimerType } from './TimerInternals';

/**
 *
 *
 * @export
 * @class Timer
 */
export class Timer {

  /**
   *
   *
   * @private
   * @type {number}
   */
  private timerId: number;

  /**
   *
   *
   * @private
   * @type {number}
   */
  private interval: number;

  /**
   *
   *
   * @private
   * @type {boolean}
   */
  private autoStart: boolean;

  /**
   *
   *
   * @private
   * @type {number}
   */
  private repeat: number;

  /**
   *
   *
   * @private
   * @type {TimerType}
   */
  private timerType: TimerType;

  /**
   *
   *
   * @private
   */
  private onElapse: () => void;

  /**
   * Creates an instance of Timer.
   * @param {number} interval
   * @param {() => void} onElapse
   * @param {ITimerOptions} [options]
   */
  constructor(interval: number, onElapse: () => void, options?: ITimerOptions) {
    this.timerId = null;
    this.interval = interval;
    this.onElapse = onElapse;
    this.setDefaultOptions(options);
    this.initialize();
  }

  /**
   *
   *
   * @private
   * @param {string} timerName
   */
  private setTimerType(timerName: string): void {
    this.timerType.start = `set${timerName}`;
    this.timerType.stop = `clear${timerName}`;
  }

  /**
   *
   *
   * @private
   */
  private initialize(): void {
    if (this.autoStart) this.start();
  }

  /**
   *
   *
   * @private
   * @param {ITimerOptions} options
   */
  private setDefaultOptions(options: ITimerOptions): void {
    if (options.autoReset == null) {
      this.setTimerType('Interval');
    } else {
      this.setTimerType('Timeout');
    }

    this.autoStart = options.autoStart == null || options.autoStart;
    this.repeat = options.repeat == null ? 0 : this.repeat;
  }

  /**
   *
   *
   * @returns {this}
   */
  start(): this {
    if (this.timerId !== null) return;
    this.timerId = window[this.timerType.start](this.onElapse, this.interval);
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  pause(): this {
    if (this.timerId === null) return;
    // TODO: Calculate the time remaining then stop the timer
    return this;
  }

  /**
   *
   *
   * @returns {this}
   */
  stop(): this {
    if (this.timerId === null) return;
    window[this.timerType.stop](this.timerId);
    return this;
  }

}
