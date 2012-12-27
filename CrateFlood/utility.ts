module Utility {
    export function isFunction(x: any) : bool {
        return Object.prototype.toString.call(x) == '[object Function]';
    }
}