export type LogTimerFunc = {
  log: Function;
  end: Function;
};

export type LogCounterFunc = {
  count: Function;
  reset: Function;
};

export enum LogLevel {
  // All levels including custom levels.
  VERBOSE,

  // Designates finer-grained informational events than the DEBUG.
  TRACE,

  // Designates informational messages that highlight the progress of the application at coarse-grained level.
  INFO,

  // Designates potentially harmful situations.
  WARN,

  // Designates error events that might still allow the application to continue running.
  ERROR,

  // Designates very severe error events that will presumably lead the application to abort.
  FATAL,

  // The highest possible rank and is intended to turn off logging.
  OFF
}

export enum Specifiers {
  // Designates as a string.
  STRING = '%s',

  // Designates as an integer.
  INTEGER = '%i',
  DIGIT = '%d',

  // Designates as a floating point value.
  FPOINT = '%f',

  // Designates an expandable DOM element.
  ELEMENT = '%o',

  // Designates an expandable JavaScript object.
  OBJECT = '%O',

  // CSS style rules.
  CSS = '%c'
}

export enum DefaultLogMessages {
  Deprecated = 'This method has been deprecated.',
  NotYetImplemented = 'This functionality has not yet been implemented.'
}

export interface OriginPath {

	delimiter?: string;
	path: string[];
}
