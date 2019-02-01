'use strict';

var assert = require('chai').assert;
var client = require('../webdriver/client');
var config = require('../webdriver/config');

describe('Product Tile', function () {
	before(function (done) {
		client.init().url(config.url + '/product-tile.html', done);
	});
	it('quickview button mouseover', function (done) {
		client
			.moveToObject('.grid-tile:first-child .product-tile')
			.pause(500)
			.isVisible('.grid-tile:first-child .product-tile .product-image #quickviewbutton', function (err, visible) {
				assert.equal(err, undefined);
				assert.ok(visible);
			})
			.call(done);
	});
	after(function (done) {
		client.end(done);
	});
});
