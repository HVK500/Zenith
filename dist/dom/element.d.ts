import { DomElement } from './models/dom-element';
export declare class Element {
    static create(tagName: string): DomElement;
    static fetch(selector: string): DomElement;
    static fetchAll(selector: string): NodeList;
}
