/// <reference path="../../src/common/extensions/array-extensions.d.ts" />
/// <reference path="../../src/common/extensions/object-extensions.d.ts" />
/// <reference path="../../src/common/extensions/string-extensions.d.ts" />
import '../common/extensions/array-extensions';
import '../common/extensions/object-extensions';
import '../common/extensions/string-extensions';
import { CssStyle, ReplacementClass } from './styling-internals';
export declare class Styling {
    static addClass(element: HTMLElement, classNames: string | string[]): void;
    static css(element: HTMLElement, styles: CssStyle): void;
    static fadeIn(element: HTMLElement): void;
    static fadeOut(element: HTMLElement): void;
    static hasClass(element: HTMLElement, className: string): boolean;
    static hide(element: HTMLElement): void;
    static toggleClass(element: HTMLElement, classNames: string | string[]): void;
    static removeClass(element: HTMLElement, classNames: string | string[]): void;
    static replaceClass(element: HTMLElement, classNames: ReplacementClass | ReplacementClass[]): void;
    static show(element: HTMLElement): void;
    private static processClassName;
}
