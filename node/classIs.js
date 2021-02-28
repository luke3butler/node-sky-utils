import { notNull } from "./notNull";
import { classType } from "./classType";
/**
 * Check the class of an item
 */
export const classIs = (type, item) => notNull(item) && classType(item) === type;