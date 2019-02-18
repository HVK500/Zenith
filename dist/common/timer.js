"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conditions_1 = require("./conditions");
/**
 * Represents a time-based interval mechanism that executes a given elapse function everytime a given number of milliseconds has elapsed.
 *
 * @export
 * @class Timer
 */
var Timer = /** @class */ (function () {
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
    function Timer(onElapse, interval, options) {
        this.onElapse = onElapse;
        this.interval = interval;
        this.timerId = null;
        this.timerType = { start: null, stop: null };
        this.repeatCounter = 0;
        this.initializeDefaultOptions(onElapse, interval, options);
    }
    /**
     * Provides whether or not the Timer is currently running.
     *
     * @returns {boolean} Whether or not the Timer is running.
     */
    Timer.prototype.isRunning = function () {
        return this.timerId !== null;
    };
    /**
     * Starts the Timers interval cycles.
     * This is ignored if the timer is already in a running state.
     *
     * @returns {this} The Timer instance.
     */
    Timer.prototype.start = function () {
        if (this.isRunning())
            return;
        this.timerId = window[this.timerType.start](this.onElapse, this.interval);
        return this;
    };
    /**
     * Stops the Timer from running.
     * This is ignored if the timer is already in a suspended or stopped state.
     *
     * @returns {this} The Timer instance.
     */
    Timer.prototype.stop = function () {
        if (!this.isRunning())
            return;
        window[this.timerType.stop](this.timerId);
        this.repeatCounter = 0;
        return this;
    };
    /**
     * Responsible for setting any options to their default values before the Timer is used.
     *
     * @private
     */
    Timer.prototype.initializeDefaultOptions = function (onElapse, interval, options) {
        var _this = this;
        if (interval === void 0) { interval = 0; }
        if (options === void 0) { options = {}; }
        options = conditions_1.Conditions.getValueOrDefault(options, {
            autoStart: true,
            autoReset: true,
            repeatLimit: null
        });
        this.interval = interval < 50 ? 50 : interval;
        // Set the repeat value, if the value is empty / lower or equal to zero then null is set
        this.repeatLimit = (conditions_1.Conditions.isNullOrEmpty(options.repeatLimit) || options.repeatLimit <= 1) ? null : options.repeatLimit;
        // Set the default elapse callback
        var elapseCallback = onElapse;
        if (options.autoReset || this.repeatLimit > 1) {
            // Set Timer type as intervaled
            this.setTimerType('Interval');
            elapseCallback = (function () {
                if (_this.progressRepeatCount()) {
                    onElapse();
                }
                else {
                    _this.stop();
                }
            }).bind(this);
        }
        else {
            // Set Timer type as timeout
            this.setTimerType('Timeout');
        }
        // Set the callback
        this.onElapse = elapseCallback;
        // Set the auto start value, if the value is empty it yields true by default
        if (options.autoStart)
            this.start();
    };
    /**
     * Controls whether the Timer must continue to the next interval cycle.
     * This is only used when Timer is set to "Interval" type and a repeat limit is given.
     *
     * @private
     * @returns {boolean}
     */
    Timer.prototype.progressRepeatCount = function () {
        return this.repeatLimit === null || this.repeatCounter++ !== this.repeatLimit;
    };
    /**
     * Responsible for assigning the correct type of timer type to the internals of the Timer.
     *
     * @private
     * @param {string} timerType
     */
    Timer.prototype.setTimerType = function (timerType) {
        this.timerType.start = "set" + timerType;
        this.timerType.stop = "clear" + timerType;
    };
    return Timer;
}());
exports.Timer = Timer;
