
export function findLast(arr, key, value) {
	for(var i = arr.length - 1; i >= 0; i--) {
		var item = arr[i];
		if(item[key] === value) { return item; }
	}
};