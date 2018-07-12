import { TimerOptions, TimerType } from './TimerInternals';

/**
 * Represents a time-based interval mechanism that executes a given elapse function every time a certain number of milliseconds has elapsed.
 *
 * @export
 * @class Timer
 */
export class Timer {

  /**
   * An identifier that allows the Timer to be removed when needed.
   *
   * @private
   * @type {number}
   */
  private timerId: number;

  /**
   * An object that tells the Timer how to behave.
   *
   * @private
   * @type {TimerType}
   */
  private timerType: TimerType;

  /**
   * The limited number of interval cycles the Timer is allowed to execute. Set to null if no limit is given.
   *
   * @private
   * @type {number}
   */
  private repeatLimit: number;

  /**
   * The counter that keeps track of the remaining number of interval cycles until the repeat limit is reached.
   *
   * @private
   * @type {number}
   */
  private repeatCounter: number;

  /**
   * Creates an instance of Timer.
   *
   * @param {() => void} onElapse A function that is executed upon reaching each interval cycle.
   * @param {number} interval The duration the Timer will wait until firing the onElapse callback. Number given in milliseconds.
   *  - Minimum interval is 50ms, if anything lower is given 50 is set by default.
   * @param {TimerOptions} [options] Optional properties that can be set to influence how the Timer functions.
   * - autoStart? - Controls whether the Timer is started upon creation or suspended until start() has been called.
   * - autoRepeat? - Controls whether the Timer is run for one cycle (false) or more than one (true).
   * - repeatLimit? - Controls the number of cycles the Timer will execute until the Timer is stopped. This is ignored when autoRepeat is false.
   */
  constructor(private onElapse: () => void, private interval: number, options?: TimerOptions) {
    this.timerId = null;
    this.timerType = { start: null, stop: null };
    this.initializeDefaultOptions(onElapse, interval, options);
  }

  /**
   * Responsible for setting any options to their default values before the Timer is used.
   *
   * @private
   */
  private initializeDefaultOptions(onElapse: () => void, interval: number, options?: TimerOptions): void {
    this.interval = interval < 50 ? 50 : interval;
    // Set the repeat value, if the value is empty / lower or equal to zero then null is set
    this.repeatLimit = (options.repeatLimit == null || options.repeatLimit <= 1) ? null : options.repeatLimit;
    this.repeatCounter = 0;

    // Set the default elapse callback
    let elapseCallback = onElapse;
    if (options.autoReset || options.repeatLimit > 1) {
      // Set Timer type as intervaled
      this.setTimerType('Interval');
      elapseCallback = (() => {
        if (this.progressRepeatCount()) {
          onElapse();
        } else {
          this.stop();
        }
      }).bind(this);
    } else {
      // Set Timer type as timeout
      this.setTimerType('Timeout');
    }

    // Set the callback
    this.onElapse = elapseCallback;

    // Set the auto start value, if the value is empty if yields true by default
    if (options.autoStart == null || options.autoStart) {
      this.start();
    }
  }

  /**
   * Responsible for assigning the correct type of timer type to the internals of the Timer.
   *
   * @private
   * @param {string} timerName
   */
  private setTimerType(timerName: string): void {
    this.timerType.start = `set${timerName}`;
    this.timerType.stop = `clear${timerName}`;
  }

  /**
   * Controls whether the Timer must continue to the next interval cycle.
   * This is only used when Timer is set to "Interval" type and a repeat limit is given.
   *
   * @private
   * @returns {boolean}
   */
  private progressRepeatCount(): boolean {
    return this.repeatLimit === null || this.repeatCounter++ !== this.repeatLimit;
  }

  /**
   * Provides whether or not the Timer is currently running.
   *
   * @returns {boolean} Whether or not the Timer is running.
   */
  isRunning(): boolean {
    return this.timerId !== null;
  }

  /**
   * Starts the Timers interval cycles.
   * This is ignored if the timer is already in a running state.
   *
   * @returns {this} The Timer instance.
   */
  start(): this {
    if (this.isRunning()) return;
    this.timerId = window[this.timerType.start](this.onElapse, this.interval);

    return this;
  }

  /**
   * Stops the Timer from running.
   * This is ignored if the timer is already in a suspended or stopped state.
   *
   * @returns {this} The Timer instance.
   */
  stop(): this {
    if (!this.isRunning()) return;
    window[this.timerType.stop](this.timerId);
    this.repeatCounter = 0;

    return this;
  }

}
