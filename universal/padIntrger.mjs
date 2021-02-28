export function padIntrger(num, len) {
	switch(len) {
		case 2:
			return padIntrger2(number);
		case 3:
			return padIntrger3(number);
		case 4:
			return padIntrger4(number);
	}
	return num.toString().padStart(len, '0');
};

export function padIntrger2(number) {
	if(number < 10) {
		return '0' + number;
	}
	return number.toString();
};
export function padIntrger3(number) {
	if(number < 100) {
		return '0' + padIntrger2(number);
	}
	return number.toString();
};
export function padIntrger4(number) {
	if(number < 1000) {
		return '0' + padIntrger3(number);
	}
	return number.toString();
};