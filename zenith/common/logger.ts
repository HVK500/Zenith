import { Conditions } from './conditions';
import { DefaultLogMessages, LogLevel, OriginPath } from './logger-internals';
import { Util } from './util';

/**
 *
 *
 * @export
 * @class Logger
 */
export class Logger {

  private static level: LogLevel = null;
  private static state: boolean = null;

  public static defaultLogMessages = DefaultLogMessages;

  public static error(message: string, origin: string | OriginPath = '', assertion: boolean = false): void {
    if (!Logger.logController(LogLevel.Error)) return;
    if (!Conditions.isString(origin)) origin = Logger.formatOrigin(origin.path, origin.delimiter);
    message = Logger.formatMessage('error', message, origin);

    if (assertion === true) {
      console.assert(assertion, message);
      return;
    }

    console.error(message);
  }

  public static formatOrigin(originPath: string | string[], delimiter: string = '=>'): string {
    originPath = <string[]>Util.convertSingleToCollection(<string>originPath);

    return originPath.join(delimiter);
  }

  public static getLogLevel(): LogLevel {
    return Logger.level;
  }

  public static getState(): boolean {
    return Logger.state;
  }

  public static information(message: string, origin: string | OriginPath = ''): void {
    if (!Logger.logController(LogLevel.Info)) return;
    if (!Conditions.isString(origin)) origin = Logger.formatOrigin(origin.path, origin.delimiter);
    console.info(Logger.formatMessage('information', message, origin));
  }

  public static setLogLevel(level: LogLevel): void {
    Logger.level = level;
  }

  public static setState(value: boolean): void {
    Logger.state = value;
  }

  //**
  //  * Not yet implemented
  //  *
  //  * @static
  //  * @param {string} [label]
  //  */
  // static count(label?: string): void {
  //  console.count(label);
  // }

  public static timing(label: string): () => void {
    console.time(label);
    // Returns a end timer callback
    return (): void => {
      console.timeEnd(label);
    };
  }

  public static warning(message: string, origin: string | OriginPath = ''): void {
    if (!Logger.logController(LogLevel.Warning)) return;
    if (!Conditions.isString(origin)) origin = Logger.formatOrigin(origin.path, origin.delimiter);
    console.warn(Logger.formatMessage('warning', message, origin));
  }

  private static formatMessage(level: string, message: string, origin?: string): string {
    return `(${level}) ${!!origin ? ('[' + origin + '] ') : ''}${message}`;
  }

  private static logController(emitLevel: LogLevel): boolean {
    const currentLevel = Logger.getLogLevel();

    // If the logger is turned off then no message is ever logged.
    if (!Logger.getState()) return false;

    // TODO: Rewrite this
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
  // /**
  //  * Not yet implemented
  //  *
  //  * @static
  //  */
  // static activity(): void {
  // 	//
  // }
}
