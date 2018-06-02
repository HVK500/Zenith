import { Common } from '../Common';
import { Conditions } from '../Common/Conditions';
import { LogLevel, originPath, DefaultLogMessages } from '../Common/LoggerInternals';
import { StringExtensions } from '../Common/Extensions/StringExtensions';

/**
 *
 *
 * @export
 * @class Logger
 */
export class Logger {

  /**
   *
   *
   * @private
   * @static
   * @type {boolean}
   * @memberOf Logger
   */
  private static state: boolean = null;

  /**
   *
   *
   * @private
   * @static
   * @type {LogLevel}
   * @memberOf Logger
   */
  private static level: LogLevel = null;

  /**
   *
   *
   * @static
   * @memberof Logger
   */
  static defaultLogMessages = DefaultLogMessages;

  /**
   *
   *
   * @private
   * @static
   * @param {string} level
   * @param {string} message
   * @param {string} [origin]
   * @returns {string}
   * @memberOf Logger
   */
  private static formatMessage(level: string, message: string, origin?: string): string {
    return `(${level}) ${!!origin ? ('[' + origin + '] ') : ''}${message}`;
  }

  /**
   *
   *
   * @private
   * @static
   * @param {LogLevel} emitLevel
   * @returns {boolean}
   * @memberOf Logger
   */
  private static logController(emitLevel: LogLevel): boolean {
    const currentLevel = Logger.getLogLevel();

    // If the logger is turned off then no message is ever logged.
    if (!Logger.getState()) return false;

    switch (true) {
      case currentLevel === LogLevel.Verbose: // If the currentLevel is ALL then log the message without checks.
      case currentLevel === LogLevel.Error && emitLevel === LogLevel.Error: // If the currentLevel is Any of the labelled levels, then log the message with checking whether the level matchs the set current level.
      case currentLevel === LogLevel.Warning && emitLevel === LogLevel.Warning:
      case currentLevel === LogLevel.Info && emitLevel === LogLevel.Info:
        return true;
      default:
        return false; // Do not log message.
    }
  }

  /**
   *
   *
   * @static
   * @param {string | string[]} originPath
   * @param {string} [delimiter='=>']
   * @returns {string}
   * @memberOf Logger
   */
  static formatOrigin(originPath: string | string[], delimiter: string = '=>'): string {
    if (!Conditions.isArray(originPath)) {
      originPath = [<string>originPath];
    }

    let result = '';

    Common.each(<string[]>originPath, (item, value, index) => {
      StringExtensions.concat(result, item);
      // Avoid adding the delimiter to the last entry in the array.
      if (originPath.length - 1 !== index) StringExtensions.concat(result, delimiter);
    });

    return result;
  }


  /**
   *
   *
   * @static
   * @param {() => boolean} [callback]
   * @returns {boolean}
   * @memberOf Logger
   */
  static getState(): boolean {
    return Logger.state;
  }

  /**
   *
   *
   * @static
   * @param {boolean} value
   * @memberOf Logger
   */
  static setState(value: boolean): void {
    Logger.state = value;
  }

  /**
   *
   *
   * @static
   * @returns {LogLevel}
   * @memberOf Logger
   */
  static getLogLevel(): LogLevel {
    return Logger.level;
  }

  /**
   *
   *
   * @static
   * @param {LogLevel} level
   * @memberOf Logger
   */
  static setLogLevel(level: LogLevel): void {
    Logger.level = level;
  }


  // /**
  //  * Not yet implemented
  //  *
  //  * @static
  //  * @param {string} [label]
  //  * @memberOf Logger
  //  */
  // static count(label?: string): void {
  // 	console.count(label);
  // }

  /**
   *
   *
   * @static
   * @param {string} message
   * @param {(string | originType)} [origin='']
   * @returns {void}
   * @memberOf Logger
   */
  static information(message: string, origin: string | originPath = ''): void {
    if (!Logger.logController(LogLevel.Info)) return;
    if (!Conditions.isString(origin)) origin = Logger.formatOrigin(origin.path, origin.delimiter);
    console.info(Logger.formatMessage('information', message, origin));
  }

  /**
   *
   *
   * @static
   * @param {string} message
   * @param {(string | originType)} [origin='']
   * @returns {void}
   * @memberOf Logger
   */
  static warning(message: string, origin: string | originPath = ''): void {
    if (!Logger.logController(LogLevel.Warning)) return;
    if (!Conditions.isString(origin)) origin = Logger.formatOrigin(origin.path, origin.delimiter);
    console.warn(Logger.formatMessage('warning', message, origin));
  }


  /**
   *
   *
   * @static
   * @param {string} message
   * @param {(string | originType)} [origin='']
   * @param {boolean} [assertion=false]
   * @returns {void}
   *
   * @memberOf Logger
   */
  static error(message: string, origin: string | originPath = '', assertion: boolean = false): void {
    if (!Logger.logController(LogLevel.Error)) return;
    if (!Conditions.isString(origin)) origin = Logger.formatOrigin(origin.path, origin.delimiter);
    message = Logger.formatMessage('error', message, origin);

    if (assertion === true) {
      console.assert(assertion, message);
      return;
    }

    console.error(message);
  }

  // /**
  //  * Not yet implemented
  //  *
  //  * @static
  //  * @memberOf Logger
  //  */
  // static activity(): void {
  // 	//
  // }

}
