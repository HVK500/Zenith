/// <reference path="../../src/common/extensions/object-extensions.d.ts" />
import 'common/extensions/object-extensions';
import { LogLevel, LogTimerFunc, Specifiers } from './logger-internals';
export declare class Logger {
    private static level;
    level: LogLevel;
    static specifiers: typeof Specifiers;
    static error(message: string, ...options: any[]): void;
    static information(message: string, ...options: any[]): void;
    static stackTrace(message?: string, ...options: any[]): void;
    static timer(label: string): LogTimerFunc;
    static warning(message: string, ...options: any[]): void;
    private static formatMessage;
    private static invokeUtilLogContext;
    private static invokeLogContext;
    private static shouldLog;
}
