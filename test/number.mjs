import assert from 'assert';
import { round } from "../universal/round.mjs";
import { ceil } from "../universal/ceil.mjs";
import { floor } from "../universal/floor.mjs";

describe('number', function() {
	describe('#round', function() {
		it('integer', function() {
			assert.ok(round(4.006) === 4);
		});
		it('decimal', function() {
			assert.ok(round(4.006, 2) === 4.01);
		});
		it('hundred', function() {
			assert.ok(round(4060, -2) === 4100);
		});
		it('negative', function() {
			assert.ok(round(-0.5) === 0);
			assert.ok(round(0.5) === 1);
		});
	});
	describe('#ceil', function() {
		it('integer', function() {
			assert.ok(ceil(4.006) === 5);
		});
		it('decimal', function() {
			assert.ok(ceil(6.004, 2) === 6.01);
		});
		it('hundred', function() {
			assert.ok(ceil(6040, -2) === 6100);
		});
		it('negative', function() {
			assert.ok(ceil(-0.5) === 0);
			assert.ok(ceil(0.5) === 1);
		});
	});
	describe('#floor', function() {
		it('integer', function() {
			assert.ok(floor(4.006) === 4);
		});
		it('decimal', function() {
			assert.ok(floor(6.004, 2) === 6);
			assert.ok(floor(4.016, 2) === 4.01);
		});
		it('hundred', function() {
			assert.ok(floor(6040, -2) === 6000);
		});
		it('negative', function() {
			assert.ok(floor(-0.5) === -1);
			assert.ok(floor(0.5) === 0);
		});
	});
	describe('#padIntrger', function() {
		it('integer', function() {
			assert.ok(floor(4.006) === 4);
		});
		it('decimal', function() {
			assert.ok(floor(6.004, 2) === 6);
			assert.ok(floor(4.016, 2) === 4.01);
		});
		it('hundred', function() {
			assert.ok(floor(6040, -2) === 6000);
		});
		it('negative', function() {
			assert.ok(floor(-0.5) === -1);
			assert.ok(floor(0.5) === 0);
		});
	});

});