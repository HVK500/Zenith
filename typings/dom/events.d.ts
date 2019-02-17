export declare class Events {
    static load(callback: Function, parent?: Document | Window): void;
    static off(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    static on(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    static once(element: any, eventType: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    static ready(callback: Function, parent?: Document | Window): void;
}
