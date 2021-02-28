import assert from 'assert';
import { pick } from "../universal/pick.mjs";
import { omit } from "../universal/omit.mjs";
import { forIn } from "../module/forIn.mjs";
import { forOwn } from "../universal/forOwn.mjs";
import { inherits } from "../modern/inherits.mjs";
describe('object', function() {
	describe('#pick', function() {
		it('pick', function() {
			var object = { 'a': 1, 'b': '2', 'c': 3 };
			assert.deepStrictEqual(pick(object, ['a', 'c']), { 'a': 1, 'c': 3 });
		});
	});
	describe('#omit', function() {
		it('omit', function() {
			var object = { 'a': 1, 'b': '2', 'c': 3 };
			assert.deepStrictEqual(omit(object, ['a', 'c']), { 'b': '2' });
		});
	});
	describe('#inherits', function() {
		it('inherits', function() {
			function Animal() { }
			Animal.prototype.say = function() { alert(1); };
			function Cat() { }
			inherits(Cat, Animal);
			var animal = new Animal();
			var cat = new Cat();
			assert.ok(cat instanceof Animal);
			assert.ok(cat.say === animal.say);
		});
	});
	describe('#forIn', function() {
		it('forIn', function() {
			var result = [];
			forIn({ "toString": "value" }, function(value, key) {
				result.push([key, value]);
			});
			assert.deepStrictEqual(result, [["toString", "value"]]);
		});
		it('inherits should', function() {
			function Animal() { }
			Animal.prototype.say = function() { alert(1); };
			function Cat() { }
			inherits(Cat, Animal);
			var result = [];
			forIn(new Cat(), function(value, key) {
				result.push(key);
			});
			assert.deepStrictEqual(result, ["constructor", "say"]);
		});
	});
	describe('#forOwn', function() {
		it('forOwn', function() {
			var result = [];
			forOwn({ "toString": "value" }, function(value, key) {
				result.push([key, value]);
			});
			assert.deepStrictEqual(result, [["toString", "value"]]);
		});
		it('inherits should not', function() {
			function Animal() { }
			Animal.prototype.say = function() { alert(1); };
			function Cat() { }
			inherits(Cat, Animal);
			var result = [];
			forOwn(new Cat(), function(value, key) {
				result.push(key);
			});
			assert.deepStrictEqual(result, []);
		});
	});
});