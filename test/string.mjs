import assert from 'assert';
import { escapeString } from "../universal/escapeString.mjs";
import { escapeHtml } from "../universal/escapeHtml.mjs";
import { escapeAttribute } from "../universal/escapeAttribute.mjs";
import { escape } from "../universal/escape.mjs";

describe('string', function() {
	describe('#escapeString', function() {
		it('"', function() {
			assert.strictEqual(escapeString('"'), '\\"');
		});
		it('\\', function() {
			assert.strictEqual(escapeString("\\"), "\\\\");
		});
	});
	describe('#escapeHtml', function() {
		it('<>', function() {
			assert.strictEqual(escapeHtml('<html>'), '&lt;html&gt;');
		});
		it('"', function() {
			assert.strictEqual(escapeHtml('"'), '"');
		});
	});
	describe('#escapeAttribute', function() {
		it('<>', function() {
			assert.strictEqual(escapeAttribute('<html>'), '&lt;html&gt;');
		});
		it('"', function() {
			assert.strictEqual(escapeAttribute('"'), '&quot;');
		});
		it("'", function() {
			assert.strictEqual(escapeAttribute("'", "'"), '&#39;');
		});
	});
	describe('#escape', function() {
		it('<>', function() {
			assert.strictEqual(escape('<html>'), '&lt;html&gt;');
		});
		it('"\'`', function() {
			assert.strictEqual(escape('"\'`'), '&quot;&#39;&#96;');
		});
		it("&", function() {
			assert.strictEqual(escape("&"), '&amp;');
		});
	});
});