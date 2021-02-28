import { typeofObject } from "./typeofObject";
import { isArray } from "./isArray";
import { isObject } from "./isObject";
/**
 * Function to assign defaults for missing values
 * Overwrite arrays, merge objects, always favor obj
 */
export const setDefaults = (obj, defaults) => {
	for(var key in obj) {
		// If item is an object, create an array or object if it doesn't exist in the defaults
		if(typeofObject(obj[key]) && !typeofObject(defaults[key]))
			defaults[key] = isArray(obj[key]) ? [] : {};

		defaults[key] = (isObject(obj[key]) && !isArray(defaults[key])) ?
			// Recursively run for child for objects 
			setDefaults(obj[key], defaults[key]) :
			// Overwrite arrays, and all other data types
			obj[key];
	}
	return defaults;
};