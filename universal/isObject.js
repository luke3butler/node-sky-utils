import { classIs } from "./classIs";
/**
 * Returns true for objects, but not arrays
 */
export const isObject = item => classIs('Object', item);