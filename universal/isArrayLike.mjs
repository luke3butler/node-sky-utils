
export function isArrayLike(value) {
	var length = value.length;
	if(typeof length != "number" || length < 0 || isNaN(length) || Math.ceil(length) != length) {
		return false;
	}
	return true;
};