import { supportSymbol } from "../universal/supportSymbol";
import { forIn as symbol_forIn } from "../module/forIn";
export function nosymbol_forIn(obj, fn, thisArg) {
	for(var key in obj) {
		if(key.startsWith("@@")) {
			continue;
		}
		if(fn.call(thisArg, obj[key], key) === false) {
			return false;
		}
	}
	return true;
};
export var forIn = supportSymbol ? symbol_forIn : nosymbol_forIn;