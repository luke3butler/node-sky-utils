import { findIndex } from "../universal/findIndex.mjs";
import { findLastIndex } from "../universal/findLastIndex.mjs";
import { find } from "../universal/find.mjs";
import { findLast } from "../universal/findLast.mjs";
import { sortBy } from "../universal/sortBy.mjs";
import { pluck } from "../universal/pluck.mjs";
import { sortedIndex } from "../universal/sortedIndex.mjs";
import { sortedLastIndex } from "../universal/sortedLastIndex.mjs";
import assert from 'assert';

describe('array', function() {
	describe('#findIndex()', function() {
		var users = [
			{ 'name': 'barney', 'age': 10 },
			{ 'name': 'fred', 'age': 11 }
		];
		it('should return position', function() {
			assert.ok(findIndex(users, "name", "barney") === 0);
			assert.ok(findIndex(users, "name", "fred") === 1);
		});
		it('should return -1 when the value is not present', function() {
			assert.ok(findIndex(users, "name", "tom") === -1);
		});
	});
	describe('#findLastIndex()', function() {
		var users = [
			{ 'name': 'barney', 'age': 10 },
			{ 'name': 'fred', 'age': 11 },
			{ 'name': 'fred', 'age': 13 }
		];
		it('should return position', function() {
			assert.ok(findLastIndex(users, "name", "fred") === 2);
		});
		it('should return -1 when the value is not present', function() {
			assert.ok(findLastIndex(users, "name", "tom") === -1);
		});
	});
	describe('#find()', function() {
		var users = [
			{ 'name': 'barney', 'age': 10 },
			{ 'name': 'fred', 'age': 11 }
		];
		it('should return item', function() {
			assert.ok(find(users, "name", "fred") === users[1]);
		});
		it('should return undefined when the value is not present', function() {
			assert.ok(find(users, "name", "tom") === undefined);
		});
	});
	describe('#findLast()', function() {
		var users = [
			{ 'name': 'barney', 'age': 10 },
			{ 'name': 'fred', 'age': 11 },
			{ 'name': 'fred', 'age': 13 }
		];
		it('should return item', function() {
			assert.ok(findLast(users, "name", "fred") === users[2]);
		});
		it('should return undefined when the value is not present', function() {
			assert.ok(findLast(users, "name", "tom") === undefined);
		});
	});
	describe('#sortBy()', function() {
		it('string', function() {
			var users = [
				{ 'name': 'pebbles', 'age': 11 },
				{ 'name': 'barney', 'age': 10 },
				{ 'name': 'fred', 'age': 13 }
			];
			sortBy(users, 'name');
			assert.ok(users[0].name === 'barney' && users[1].name === 'fred' && users[2].name === 'pebbles');
		});
		it('number', function() {
			var users = [
				{ 'name': 'pebbles', 'age': 11 },
				{ 'name': 'barney', 'age': 10 },
				{ 'name': 'fred', 'age': 13 }
			];
			sortBy(users, 'age');
			assert.ok(users[0].age === 10 && users[1].age === 11 && users[2].age === 13);
		});
	});
	describe('#pluck()', function() {
		var users = [
			{ 'name': 'pebbles', 'age': 11 },
			{ 'name': 'barney', 'age': 10 },
			{ 'name': 'fred', 'age': 13 }
		];
		it('map key', function() {
			assert.ok(pluck(users, 'name').join(",") === "pebbles,barney,fred");
		});
	});
	describe('#sortedIndex()', function() {
		it('return position', function() {
			assert.ok(sortedIndex([30, 50], 40) === 1);
			assert.ok(sortedIndex([4, 4, 5, 5], 5) === 2);
		});
	});
	describe('#sortedLastIndex()', function() {
		it('return position', function() {
			assert.ok(sortedLastIndex([4, 4, 5, 5], 5) === 4);
		});
	});
});