/// <reference path="../common/extensions/object-extensions.d.ts" />

import '../common/extensions/object-extensions';
import { KeyValuePair } from './common-internals';
import { LogLevel, Specifiers, LogTimerFunc, LogCounterFunc } from './logger-internals';

export class Logger {

  private static level: LogLevel = LogLevel.OFF;
  set level(value: LogLevel) {
    Log.level = value;
  }

  public static specifiers = Specifiers;

  public static counter(label: string): LogCounterFunc {
    return Log.invokeUtilLogContext<LogCounterFunc>(label, {
      count: console.count,
      reset: console.countReset
    });
  }

  public static error(message: string, ...options: any[]): void {
    Log.invokeLogContext('ERROR', message, ...options);
  }

  // public static formatOrigin(originPath: string | string[], delimiter: string = '=>'): string {
  //   // originPath = <string[]>Util.convertSingleToCollection(<string>originPath);

  //   return originPath.join(delimiter);
  // }

  public static information(message: string, ...options: any[]): void {
    Log.invokeLogContext('INFO', message, ...options);
  }

  public static stackTrace(message?: string, ...options: any[]): void {
    Log.invokeLogContext('TRACE', message, ...options);
  }

  public static timer(label: string): LogTimerFunc {
    return Log.invokeUtilLogContext<LogTimerFunc>(label, {
      log: console.time,
      end: console.timeEnd
    });
  }

  public static warning(message: string, ...options: any[]): void {
    Log.invokeLogContext('WARN', message, ...options);
  }

  private static formatMessage(level: string, message: string): string {
    return `(${level}) ${new Date().toISOString().replace('T', ' ').replace('Z', '')} - ${message}`;
  }

  private static invokeUtilLogContext<T>(label: string, action: KeyValuePair<Function>): T {
    if (!Log.shouldLog(LogLevel.INFO)) return;
    const result = {};

    action.each<Function>((method, name) => {
      result[name] = () => {
        method(label);
      };
    });

    return result as T;
  }

  private static invokeLogContext(contextLevel: string, message: string, ...options: any[]): void {
    if (!Log.shouldLog(LogLevel[contextLevel])) return;
    console[contextLevel.toLowerCase()](Log.formatMessage(contextLevel, message), ...options);
  }

  private static shouldLog(contextLevel: LogLevel): boolean {
    if (contextLevel >= Log.level) return true;
    return false;
  }
}
