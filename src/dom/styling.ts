/// <reference path="../common/extensions/array-extensions.d.ts" />
import 'common/extensions/array-extensions';
import 'common/extensions/object-extensions';
import 'common/extensions/string-extensions';

import { Conditions } from '../common/conditions';
import { CssStyle, ReplacementClass } from './styling-internals';

/// <reference path="../common/extensions/object-extensions.d.ts" />
/// <reference path="../common/extensions/string-extensions.d.ts" />

export class Styling {
  public static addClass(element: HTMLElement, classNames: string | string[]): void {
    Styling.processClassName<string>(classNames, (name: string): void => {
      if (Styling.hasClass(element, name)) return;
      element.classList.add(name);
    });
  }

  public static css(element: HTMLElement, styles: CssStyle): void {
    styles.each((value: string, key: string): void => {
      element.style[key] = value;
    });
  }

  public static fadeIn(element: HTMLElement): void {
    // TODO: needs css()
  }

  public static fadeOut(element: HTMLElement): void {
    // TODO: needs css()
  }

  public static hasClass(element: HTMLElement, className: string): boolean {
    return element.classList.contains(className);
  }

  public static hide(element: HTMLElement): void {
    return Styling.css(element, { display: 'none' });
  }

  public static toggleClass(element: HTMLElement, classNames: string | string[]): void {
    Styling.processClassName<string>(classNames, (name: string): void => {
      element.classList.toggle(name);
    });
  }

  public static removeClass(element: HTMLElement, classNames: string | string[]): void {
    Styling.processClassName<string>(classNames, (name: string): void => {
      if (Styling.hasClass(element, name)) return;
      element.classList.remove(name);
    });
  }

  public static replaceClass(element: HTMLElement, classNames: ReplacementClass | ReplacementClass[]): void {
    Styling.processClassName<ReplacementClass>(classNames, (replacement: ReplacementClass): void => {
      if (Styling.hasClass(element, replacement.oldClass)) return;
      element.classList.replace(replacement.oldClass, replacement.newClass);
    });
  }

  public static show(element: HTMLElement): void {
    return Styling.css(element, { display: '' });
  }

  private static processClassName<T>(classNames: T | T[], callback: (item: T) => void): void {
    if (!Conditions.isArray(classNames)) classNames = [classNames];
    classNames.each((item: T): void => callback(item));
  }
}
