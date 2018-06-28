interface WSUstate {
    debug: boolean;
}
interface WSUstatic {
    state: WSUstate;
    included: any;
    _d(name: any): any;
    _i(a: any, b: any): any;
    defined(ns: any, type?: string): any;
    define(ns: any, value?: any, ns_root?: any): any;
    merge(obj: any): any;
    extend(...p: any[]): any;
    parse_ns(obj: any): any;
    get_ns(ns: any): any;
    prime(ns: any, ns_root?: any, options?: any): any;
    include(ns_path: string, callback?: any): any;
}
/**
 * The WSU instance members
 *
 * @see {@link https://api.WSU.io/Types/#WSU}
 */
interface WSU {


    /**
     * The DOM node context originally passed to WSU(); if none was passed then
     * context will likely be the document. (DEPRECATED from v1.10)
     * @see {@link https://api.WSU.io/context/}
     */
    context: Element;

    jquery: string;

    // get Element
    [index: string]: any;
    [index: number]: HTMLElement;



    /**
     * Reduce the set of matched elements to the first in the set.
     * @see {@link https://api.WSU.com/first/}
     */
    // first(): WSU;

}

declare module 'WSU' { }
declare var WSU: WSUstatic;
