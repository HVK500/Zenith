/**
 *
 *
 * @export
 * @enum {number}
 */
export enum LogLevel {
  Verbose,
  Info,
  Warning,
  Error
}

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum DefaultLogMessages {
  Deprecated = 'This method has been deprecated.',
  NotYetImplemented = 'This functionality has not yet been implemented.'
}

/**
 *
 *
 * @export
 * @interface OriginPath
 */
export interface OriginPath {
  path: string[];
  delimiter?: string;
}
