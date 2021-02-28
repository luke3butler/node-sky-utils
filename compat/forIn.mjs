import { dontEnums } from "./dontEnums";
export function forIn(obj, fn, thisArg) {
	if(typeof obj !== "object") {
		return false;
	}
	var isJsObject = obj instanceof Object;
	for(var key in obj) {
		if(!isJsObject) {
			if(key.startsWith("__") || key === "constructor") {
				continue;
			}
		}
		if(key.startsWith("@@")) {
			continue;
		}
		if(fn.call(thisArg, obj[key], key) === false) {
			return false;
		}
	}
	var i = dontEnums.length;
	var proto = Object.getPrototypeOf(obj);
	//遍历nonEnumerableProps数组
	while(i--) {
		var prop = dontEnums[i];
		if(prop in obj && obj[prop] !== proto[prop]) {
			if(fn.call(thisArg, obj[prop], prop) === false) {
				return false;
			}
		}
	}
	return true;
};