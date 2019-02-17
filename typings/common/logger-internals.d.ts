export declare type LogTimerFunc = {
    log: Function;
    end: Function;
};
export declare type LogCounterFunc = {
    count: Function;
    reset: Function;
};
export declare enum LogLevel {
    VERBOSE = 0,
    TRACE = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5,
    OFF = 6
}
export declare enum Specifiers {
    STRING = "%s",
    INTEGER = "%i",
    DIGIT = "%d",
    FPOINT = "%f",
    ELEMENT = "%o",
    OBJECT = "%O",
    CSS = "%c"
}
export declare enum DefaultLogMessages {
    Deprecated = "This method has been deprecated.",
    NotYetImplemented = "This functionality has not yet been implemented."
}
export interface OriginPath {
    delimiter?: string;
    path: string[];
}
