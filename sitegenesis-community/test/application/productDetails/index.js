var assert = require('chai').assert;
var client = require('../webdriver/client');
var config = require('../webdriver/config');

describe('Product Details Page', function () {
	before(function (done) {
		client.init().url(config.url, done);
	});
	it('should search for `modern` products', function (done) {
		client
			.waitForExist('form[role="search"]')
			.setValue('#q', 'modern')
			.submitForm('form[role="search"]')
			.waitForExist('#search-result-items', function (err) {
				assert.equal(err, undefined);
			})
			.click('.grid-tile:first-child .name-link', function (err) {
				assert.equal(err, undefined);
			})
			.getText('h1.product-name', function (err, title) {
				assert.equal(err, undefined);
				assert.equal(title, 'Modern Blazer');
			})
			.call(done);
	});
	after(function (done) {
		client.end(done);
	});
});
