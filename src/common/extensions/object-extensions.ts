import { ObjectLoopCallback, KeyValuePair } from '../common-internals';

const applyMethods = (methods: { [methodName: string]: Function }): PropertyDescriptorMap => {
  let result = {};
  for (let key in methods) {
    result[key] = {
      value: methods[key],
      writable: true
    };
  }

  return result;
};

/**
 * Collection of useful extensions to be used on Objects.
 */
export namespace ObjectExtensions {
  Object.defineProperties(Object.prototype, applyMethods({
    each: function (callback: ObjectLoopCallback<any>): KeyValuePair<any> { // TODO: exitCondition
      let index = 0;
      for (let key in this) {
        if (!this.hasOwnProperty(key)) continue;
        callback.call(null, this[key], key, index); // TODO: Pass the context through, currently null
        index++;
      }

      return this;
    },
    fetch: function<T> (keyPath: string): T {
      const props = keyPath.split('.');

      let result = this;
      for (let i = 0; i < props.length; i++) {
        let prop = result[props[i]];
        if (typeof prop === 'undefined' || prop === null) {
          // // when default exists use it
          // if (hasDefaultValue) {
          //   return defaultValue;
          // } else {
            // special case when path exists but is null
            if (i === props.length - 1) {
              return prop;
            } else {
              // other return undefined
              return void 0;
            }
          // }
        }

        result = prop;
      }

      return result;
    },
    isEmpty: function (): boolean {
      for (let key in this) {
        if (this.hasOwnProperty(key)) return false;
      }
      return true;
    },
    isEqualTo: function (value: any): boolean {
      return JSON.stringify(this) === JSON.stringify(value);
    },
    toArray: function (): any[] {
      return [ this ];
    }
  }));
}
