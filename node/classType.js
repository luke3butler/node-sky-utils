/**
 * Returns the parameter's class
 * @see https://bonsaiden.github.io/JavaScript-Garden/#types
 */
export const classType = item => Object.prototype.toString.call(item).slice(8, -1);