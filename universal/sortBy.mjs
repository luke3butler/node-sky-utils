
export function sortBy(arr, key) {
	return arr.sort(function(a, b) {
		a = a[key];
		b = b[key];
		if(a == b) return 0;
		return a > b ? 1 : -1;
	});
};