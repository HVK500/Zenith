import { Conditions } from '../conditions';

class XString {

  /**
   * @inheritdoc
   */
  public append = function (value: string): string {
    return `${this}${value}`;
  };

  /**
   * @inheritdoc
   */
  public camelCase = function (): string {
    return this.replace(/-+(.)?/g, (match: string, char: string): string => {
      return Conditions.isNullOrEmpty(char) ? '' : char.toUpperCase();
    });
  };

  public capitalize = function(): string {
    const char = this[0];
    if (!char) return this;
    return char.toUpperCase() + this.slice(1);
  };

  /**
   * @inheritdoc
   */
  public caseSwap = function (): string {
    return this.replace(/\S/g, (char: string): string => {
      return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
    });
  };

  /**
   * @inheritdoc
   */
  public chop = function (value: string, length: number): string[] {
    if (Conditions.isNullOrEmpty(value)) return [];
    length = ~~length;
    return length > 0 ? value.match(new RegExp(`.{1,${length}}`, 'g')) : [value];
  };

  /**
   * @inheritdoc
   */
  public contains = function (value: string | RegExp): boolean {
    const regex = Conditions.isString(value) ? new RegExp(<string>value, 'g') : <RegExp>value;
    return regex.test(this);
  };

  /**
   * @inheritdoc
   */
  public dasherize = function (): string {
    return this.remove(/[^\w\s]/g)
      .trim()
      .replace(/[-_\s]+/g, '-')
  };

  /**
   * @inheritdoc
   */
  public escapeRegExp = function (): string {
    return this.replace(/[\\\[\]\/{}()*+?.$|^-]/g, '\\$&');
  };

  /**
   * @inheritdoc
   */
  public extractNumber = function (all: boolean = false): number {
    const regex = all ? /\D+/g : /^[^\d-]+/;
    return parseFloat(this.replace(regex, ''));
  };

  /**
   * @inheritdoc
   */
  public isEmpty = function (): boolean {
    return this === '';
  };

  /**
   * @inheritdoc
   */
  public padZero = function (length: number = 1, right: boolean = false): string {
    const result: string[] = [new Array(length + 1).join('0')];

    let operation = 'unshift';
    if (right) operation = 'push';
    result[operation](this);

    return result.join('');
  };

  /**
   * @inheritdoc
   */
  public prepend = function (value: string): string {
    return `${value}${this}`;
  };

  /**
   * @inheritdoc
   */
  public quote = function (): string {
    return this.wrap('"');
  };

  /**
   * @inheritdoc
   */
  public remove = function (search: string | RegExp): string {
    return this.replace(search, '');
  };

  /**
   * @inheritdoc
   */
  public reverse = function (): string {
    return this.split('').reverse().join('');
  };

  public snakeCase = function (): string {
    return this.remove(/[^\w\s]/g)
      .trim()
      .replace(/[-\s]+/g, '_');
  };

  /**
   * @inheritdoc
   */
  public titleize = function (): string {
    return this.toLowerCase().replace(/(?:^|\s|-)\S/g, (char: string): string => {
      return char.toUpperCase();
    });
  };

  public toArray = function (): string[] {
    return [ this ];
  };

  /**
   * @inheritdoc
   */
  public toNumber = function (): number {
    try {
      return +this;
    } catch (e) {
      return NaN;
    }
  };

  /**
   * @inheritdoc
   */
  public wrap = function (wrapper: string | { l?: string, r?: string }): string {
    const result = [];

    if (Conditions.isString(wrapper)) {
      result.push(wrapper, this, wrapper);
    } else {
      result.push(wrapper.l || '', this, wrapper.r || '');
    }

    return result.join('');
  };
}

/**
 * Collection of useful extensions to be used on Strings.
 */
export namespace StringExtensions {
  Object.setPrototypeOf(String.prototype, new XString());
}
