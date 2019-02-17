import { TimerOptions } from './timer-internals';
/**
 * Represents a time-based interval mechanism that executes a given elapse function everytime a given number of milliseconds has elapsed.
 *
 * @export
 * @class Timer
 */
export declare class Timer {
    private onElapse;
    private interval?;
    /**
     * The counter that keeps track of the remaining number of interval cycles until the repeat limit is reached.
     *
     * @private
     * @type {number}
     */
    private repeatCounter;
    /**
     * The limited number of interval cycles the Timer is allowed to execute. Set to null if no limit is given.
     *
     * @private
     * @type {number}
     */
    private repeatLimit;
    /**
     * An identifier that allows the Timer to be removed when needed.
     *
     * @private
     * @type {number}
     */
    private timerId;
    /**
     * An object that tells the Timer how to behave.
     *
     * @private
     * @type {TimerType}
     */
    private timerType;
    /**
     * Creates an instance of Timer.
     *
     * @param {() => void} onElapse A function that is executed upon reaching each interval cycle.
     * @param {number} [interval] The duration the Timer will wait until firing the onElapse callback. Number given in milliseconds.
     *  - Minimum interval is 50ms, if anything lower is given 50 is set by default.
     * @param {TimerOptions} [options] Optional properties that can be set to influence how the Timer functions.
     * - [autoStart = true] - Controls whether the Timer is started upon creation or suspended until start() has been called.
     * - [autoReset = true] - Controls whether the Timer excutes at an interval (true) or a delayed single execution (false).
     * - [repeatLimit = null] - Controls the number of cycles the Timer will execute until the Timer is stopped. This is ignored when autoReset is false. An empty value set the timer to execute for infinity.
     */
    constructor(onElapse: () => void, interval?: number, options?: TimerOptions);
    /**
     * Provides whether or not the Timer is currently running.
     *
     * @returns {boolean} Whether or not the Timer is running.
     */
    isRunning(): boolean;
    /**
     * Starts the Timers interval cycles.
     * This is ignored if the timer is already in a running state.
     *
     * @returns {this} The Timer instance.
     */
    start(): this;
    /**
     * Stops the Timer from running.
     * This is ignored if the timer is already in a suspended or stopped state.
     *
     * @returns {this} The Timer instance.
     */
    stop(): this;
    /**
     * Responsible for setting any options to their default values before the Timer is used.
     *
     * @private
     */
    private initializeDefaultOptions;
    /**
     * Controls whether the Timer must continue to the next interval cycle.
     * This is only used when Timer is set to "Interval" type and a repeat limit is given.
     *
     * @private
     * @returns {boolean}
     */
    private progressRepeatCount;
    /**
     * Responsible for assigning the correct type of timer type to the internals of the Timer.
     *
     * @private
     * @param {string} timerType
     */
    private setTimerType;
}
