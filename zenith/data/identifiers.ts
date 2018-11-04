export class Identifiers {

  // static hashCode(value: string): number {
  //   let result = 0;
  //   let length = value.length;

  //   for(let i = 0; i < length; i++) {
  //     result = result * 31 + value.charCodeAt(i);
  //     result = result & result;
  //   }

  //   return result;
  // }

  static generateId(): string {
    return `_${Math.random().toString(36).substring(2, 9)}`;
  }

  static generateGuid(): string {
    const id = (): string => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };

    return `${id()}${id()}-${id()}-${id()}-${id()}-${id()}${id()}`;
  }

}
