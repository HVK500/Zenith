"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    // All levels including custom levels.
    LogLevel[LogLevel["VERBOSE"] = 0] = "VERBOSE";
    // Designates finer-grained informational events than the DEBUG.
    LogLevel[LogLevel["TRACE"] = 1] = "TRACE";
    // Designates informational messages that highlight the progress of the application at coarse-grained level.
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    // Designates potentially harmful situations.
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    // Designates error events that might still allow the application to continue running.
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    // Designates very severe error events that will presumably lead the application to abort.
    LogLevel[LogLevel["FATAL"] = 5] = "FATAL";
    // The highest possible rank and is intended to turn off logging.
    LogLevel[LogLevel["OFF"] = 6] = "OFF";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Specifiers;
(function (Specifiers) {
    // Designates as a string.
    Specifiers["STRING"] = "%s";
    // Designates as an integer.
    Specifiers["INTEGER"] = "%i";
    Specifiers["DIGIT"] = "%d";
    // Designates as a floating point value.
    Specifiers["FPOINT"] = "%f";
    // Designates an expandable DOM element.
    Specifiers["ELEMENT"] = "%o";
    // Designates an expandable JavaScript object.
    Specifiers["OBJECT"] = "%O";
    // CSS style rules.
    Specifiers["CSS"] = "%c";
})(Specifiers = exports.Specifiers || (exports.Specifiers = {}));
var DefaultLogMessages;
(function (DefaultLogMessages) {
    DefaultLogMessages["Deprecated"] = "This method has been deprecated.";
    DefaultLogMessages["NotYetImplemented"] = "This functionality has not yet been implemented.";
})(DefaultLogMessages = exports.DefaultLogMessages || (exports.DefaultLogMessages = {}));
