
export function createRound(methodName) {
	var func = Math[methodName];
	return function(number, precision) {
		precision = precision === undefined ? 0 : (+precision || 0);
		if(precision) {
			precision = Math.pow(10, precision);
			return func(number * precision) / precision;
		}
		return func(number);
	};
}
export var round = createRound('round');