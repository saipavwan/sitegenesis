var assert = require('assert');
var util = require('../../../app_storefront_richUI/cartridge/js/util');

describe('Utils', function () {
	describe('append param to url', function () {
		it('should append first param to url', function () {
			assert.equal('http://example.com?color=blue',
				util.appendParamToURL('http://example.com', 'color', 'blue'));
		});
		it('should append second param to url', function () {
			assert.equal('http://example.com?color=red&size=large',
				util.appendParamToURL('http://example.com?color=red', 'size', 'large'));
		});
	});
});
