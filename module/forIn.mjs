export function forIn(obj, fn, thisArg) {
	for(var key in obj) {
		if(fn.call(thisArg, obj[key], key) === false) {
			return false;
		}
	}
	return true;
};