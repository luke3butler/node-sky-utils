'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Returns whether typeof === 'object'
 */
const typeofObject = item => item !== null && typeof item === 'object';

/**
 * Returns true for arrays, but not objects
 */
const isArray = item => Array.isArray(item);

/**
 * Returns true if defined and not null
 */
const notNull = item => item !== undefined && item !== null;

/**
 * Returns the parameter's class
 * @see https://bonsaiden.github.io/JavaScript-Garden/#types
 */
const classType = item => Object.prototype.toString.call(item).slice(8, -1);

/**
 * Check the class of an item
 */
const classIs = (type, item) => notNull(item) && classType(item) === type;

/**
 * Returns true for objects, but not arrays
 */
const isObject = item => classIs('Object', item);

/**
 * Function to assign defaults for missing values
 * Overwrite arrays, merge objects, always favor obj
 */
const setDefaults = (obj, defaults) => {
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

const osIs = type => type === process.platform;

/**
 * Returns true if node is running on macOS
 */
const isMacOS = () => osIs('darwin');

const os = require('os');
/**
 * Return the current user
 */
const currentUser = () => os.userInfo().username;

/**
 * Is the executing user root?
 */
const isRoot = () => currentUser() === 'root';

var supportProto=!!Object.setPrototypeOf || !!Object.prototype.__proto__;

var supportSymbol = global.Symbol;

var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');

var rules=[];
function ckeck(ckeckFunc,index){
	return ckeckFunc(this[index]);
}
function compare(x, y){//比较函数
	return x.checks.length-y.checks.length;
}
function overload(checks,func,target){
	if(target){
		rules.push({
			'checks':checks,
			'func':func,
			'target':target
		});
		rules.sort(compare);
	}else {
		var args=checks;
		var thisVal=func;
		var i=rules.length;
		while(i--){
			var rule=rules[i];
			if(args.callee===rule.func){
				if(rule.checks.length>=args.length){
					if(rule.checks.every(ckeck,args)){
						return rule.target.apply(thisVal,args);
					}
				}
			}
		}
		return this;
	}
}

function isArrayLike(value) {
	var length = value.length;
	if(typeof length != "number" || length < 0 || isNaN(length) || Math.ceil(length) != length) {
		return false;
	}
	return true;
}

function isArrayLikeObject(obj) {
	if(typeof obj === "object" && isArrayLike(obj)) {
		return true;
	}
	return false;
}

function isDate(obj){
	return Object.prototype.toString.call(obj)==='[object Date]';
}

function isRegExp(obj){
	return Object.prototype.toString.call(obj)==='[object RegExp]';
}

function isString(obj){
	return Object.prototype.toString.call(obj)==='[object String]';
}

function isNumber(obj){
	return Object.prototype.toString.call(obj)==='[object Number]';
}

function isFunction(obj){
	return Object.prototype.toString.call(obj)==='[object Function]';
}

function isSymbol(obj){
	if(typeof obj==="symbol"){
		return true;
	}
	if(typeof obj.toString==="function" && obj.toString().indexOf("@@")===0){
		return true;//symbol polyfill
	}
	return false;
}

function isNumeric(obj){
	var n=parseFloat(obj);
	return !isNaN(n);
}

function isPlainObject(obj){
	if(obj===null){
		return true;
	}
	if(typeof obj!=="object" || obj.nodeType || isWindow(obj)){
		return false;
	}
	return Object.getPrototypeOf(obj)===Object.prototype;
}

function isDefined(obj){
	return obj!==void 0;
}

function noop(){}

function times(n,iteratee,thisArg){
	if(n<1){
		return [];
	}
	var index = -1,
		result = Array(n);
	while (++index < n) {
		result[index] = iteratee.apply(this,thisArg);
	}
	return result;
}

function random(a,b){
	var length=b-a+1;
	return Math.floor(Math.random()*length)+a;
}

function escapeHtml(str) {
	return str.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;');
}

var stringEscapes = {
	'\\': '\\',
	"'": "'",
	'\n': 'n',
	'\r': 'r',
	'\u2028': 'u2028',
	'\u2029': 'u2029'
};
var regexpEscapes = {
	'0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
	'5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
	'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
	'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
	'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
};
var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g;

function escapeRegExp(str){//from lodash
	if(str){
		reRegExpChars.lastIndex = 0;
		return (reRegExpChars.test(str))
			? str.replace(reRegExpChars, function(chr, leadingChar, whitespaceChar) {
			if (leadingChar) {
				chr = regexpEscapes[chr];
			} else if (whitespaceChar) {
				chr = stringEscapes[chr];
			}
			return '\\' + chr;
		})
			: str;
	}
	return "(?:)";
}

function replaceAll(str, reallyDo, replaceWith, ignoreCase) {
	return str.replace(new RegExp(escapeRegExp(reallyDo), (ignoreCase ? "gi" : "g")), replaceWith);
}

function escapeAttribute(str, quot) {
	var esc = escapeHtml(str);
	if(!quot || quot == '"') {
		return esc.replace(/"/g, '&quot;');
	} else {
		return replaceAll(esc, quot.charAt(0), '&#' + quot.charCodeAt(0) + ";");
	}
}

var rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
function escapeString(str){//from lodash
	rx_escapable.lastIndex = 0;
	return rx_escapable.test(str)
		? str.replace(rx_escapable, function(a) {
		var meta = {
			"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r": "\\r",	"\"": "\\\"","\\": "\\\\"
		};
		var c = meta[a];
		return typeof c === "string"
			? c
			: "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
	}): str;
}

function toString(o){
	return new String(o).valueOf();
}

function padIntrger(num, len) {
	switch(len) {
		case 2:
			return padIntrger2(number);
		case 3:
			return padIntrger3(number);
		case 4:
			return padIntrger4(number);
	}
	return num.toString().padStart(len, '0');
}
function padIntrger2(number) {
	if(number < 10) {
		return '0' + number;
	}
	return number.toString();
}function padIntrger3(number) {
	if(number < 100) {
		return '0' + padIntrger2(number);
	}
	return number.toString();
}function padIntrger4(number) {
	if(number < 1000) {
		return '0' + padIntrger3(number);
	}
	return number.toString();
}

function find(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return arr[i];}
	}
}

function findIndex(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return i;}
	}
	return -1;
}

function findLast(arr, key, value) {
	for(var i = arr.length - 1; i >= 0; i--) {
		var item = arr[i];
		if(item[key] === value) { return item; }
	}
}

function findLastIndex(arr,key,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i][key]===value){return i;}
	}
	return -1;
}

function sortBy(arr, key) {
	return arr.sort(function(a, b) {
		a = a[key];
		b = b[key];
		if(a == b) return 0;
		return a > b ? 1 : -1;
	});
}

function sortedIndex(arr,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i]>=value){
			return i;
		}
	}
	return arr.length;
}

function sortedLastIndex(arr,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i]<=value){
			return i+1;
		}
	}
}

function shuffle(arr){
	var copyArr=arr.slice();
	var ubound=arr.length-1;
	for(var i=0; i<ubound; i++){
		var r=random(0,ubound);
		var tmp=copyArr[r];
		copyArr[r]=copyArr[i];
		copyArr[i]=tmp;
	}
	return copyArr;
}

function pluck(arr,key){
	return arr.map(function(item){
		return item[key];
	});
}

function union() {
	var set = new Set();
	for(var i = 0; i < arguments.length; i++) {
		var arr = arguments[i];
		if(!Array.isArray(arr)) {
			arr = Array.from(arr);
		}
		var j = arr.length;
		while(j-- > 0) {
			set.add(arr[j]);
		}
	}
	return Array.from(set);
}

function difference(arg1) {
	if(arguments.length === 0) {
		return new Array();
	}
	var set = new Set(arg1);
	for(var i = 1; i < arguments.length; i++) {
		var arr = arguments[i];
		if(!Array.isArray(arr)) {
			arr = Array.from(arr);
		}
		var j = arr.length;
		while(j-- > 0) {
			set.delete(arr[j]);
		}
	}
	return Array.from(set);
}

function intersection(arg1) {
	if(arguments.length === 0) {
		return new Array();
	}
	var set = new Set(arg1);
	for(var i = 1; i < arguments.length; i++) {
		var arr = arguments[i];
		if(!Array.isArray(arr)) {
			arr = Array.from(arr);
		}
		set.forEach(function(item) {
			if(arr.indexOf(item) < 0) this.delete(item);
		}, set);
	}
	return Array.from(set);
}

var dontEnums=[
	"toString",
	"toLocaleString",
	"valueOf",
	"hasOwnProperty",
	"isPrototypeOf",
	"propertyIsEnumerable"
];

function forIn$1(obj, fn, thisArg) {
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
}

function forIn$2(obj, fn, thisArg) {
	for(var key in obj) {
		if(fn.call(thisArg, obj[key], key) === false) {
			return false;
		}
	}
	return true;
}

function nosymbol_forIn(obj, fn, thisArg) {
	for(var key in obj) {
		if(key.startsWith("@@")) {
			continue;
		}
		if(fn.call(thisArg, obj[key], key) === false) {
			return false;
		}
	}
	return true;
}var forIn$3 = supportSymbol ? forIn$2 : nosymbol_forIn;

var forIn$4 = hasEnumBug ? forIn$1 : forIn$3;

function forOwn(obj,fn,thisArg){
	if(obj){
		thisArg=thisArg || undefined;
		var keys=Object.keys(obj);
		for(var i=0;i<keys.length;i++){
			var key=keys[i];
			if(fn.call(thisArg,obj[key],key)===false){
				return false;
			}
		}
		return true;
	}
	return false;
}

function pick(obj, keys) {
	var rest = {};
	if(obj) {
		var ownKeys = Object.keys(obj);
		var i = keys.length;
		while(i--) {
			var key = keys[i];
			if(ownKeys.includes(key)) {
				rest[key] = obj[key];
			}
		}
	}
	return rest;
}

function omit(obj, keys) {
	var rest = {};
	if(obj) {
		var ownKeys = Object.keys(obj);
		var i = ownKeys.length;
		while(i--) {
			var key = ownKeys[i];
			if(!keys.includes(key)) {
				rest[key] = obj[key];
			}
		}
	}
	return rest;
}

function inherits(subClass, superClass) {
	forIn(superClass, setKey, subClass);
	subClass.prototype = Object.create(superClass.prototype);
	subClass.prototype.constructor = subClass;
	subClass.__proto__ = superClazz.prototype;
}function setKey(value, key) {
	this[key] = value;
}

function inherits$1(clazz, superClazz) {
	Object.setPrototypeOf(clazz, superClazz);
	clazz.prototype = Object.create(superClazz.prototype);
	clazz.prototype.constructor = clazz;
}

var inherits$2 = supportProto ? inherits$1 : inherits;

exports.classIs = classIs;
exports.classType = classType;
exports.currentUser = currentUser;
exports.difference = difference;
exports.escapeAttribute = escapeAttribute;
exports.escapeHtml = escapeHtml;
exports.escapeRegExp = escapeRegExp;
exports.escapeString = escapeString;
exports.find = find;
exports.findIndex = findIndex;
exports.findLast = findLast;
exports.findLastIndex = findLastIndex;
exports.forIn = forIn$4;
exports.forOwn = forOwn;
exports.hasEnumBug = hasEnumBug;
exports.inherits = inherits$2;
exports.intersection = intersection;
exports.isArray = isArray;
exports.isArrayLike = isArrayLike;
exports.isArrayLikeObject = isArrayLikeObject;
exports.isDate = isDate;
exports.isDefined = isDefined;
exports.isFunction = isFunction;
exports.isMacOS = isMacOS;
exports.isNumber = isNumber;
exports.isNumeric = isNumeric;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isRegExp = isRegExp;
exports.isRoot = isRoot;
exports.isString = isString;
exports.isSymbol = isSymbol;
exports.noop = noop;
exports.omit = omit;
exports.osIs = osIs;
exports.overload = overload;
exports.padIntrger = padIntrger;
exports.padIntrger2 = padIntrger2;
exports.padIntrger3 = padIntrger3;
exports.padIntrger4 = padIntrger4;
exports.pick = pick;
exports.pluck = pluck;
exports.random = random;
exports.replaceAll = replaceAll;
exports.setDefaults = setDefaults;
exports.shuffle = shuffle;
exports.sortBy = sortBy;
exports.sortedIndex = sortedIndex;
exports.sortedLastIndex = sortedLastIndex;
exports.supportProto = supportProto;
exports.supportSymbol = supportSymbol;
exports.times = times;
exports.toString = toString;
exports.typeofObject = typeofObject;
exports.union = union;
