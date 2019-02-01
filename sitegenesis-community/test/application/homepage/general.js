var assert = require('chai').assert;
var client = require('../webdriver/client');
var config = require('../webdriver/config');

describe('Homepage General #C84584', function () {
	before(function (done) {
		client.init(done);
	});
	describe('Main carousel links (does not work with phantomjs)', function () {
		beforeEach(function (done) {
			client.url(config.url, done);
		});
		it('#1 should go to New Arrivals for Womens', function (done) {
			client
				.waitForExist('.jcarousel-control a:nth-child(1)')
				.click('.jcarousel-control a:nth-child(1)', function (err) {
					assert.equal(err, undefined);
				})
				// .pause(500) // should wait for slider transition, but skipping it since this is the first slide
				.click('#homepage-slider', function (err) {
					assert.equal(err, undefined);
				})
				.getTitle(function (err, title) {
					assert.equal(err, undefined);
					title = title.split('|')[0].trim();
					assert.equal(title, 'New Arrivals in Women\'s Footwear, Outerwear, Clothing & Accessories');
				})
				.elements('.search-result-items .grid-tile', function (err, result) {
					assert.equal(err, undefined);
					assert(result.value.length > 0, 'products available for this search');
				})
				.call(done);
		});
		it('#2 should go to Women\'s Accessories', function (done) {
			client
				.waitForExist('.jcarousel-control a:nth-child(2)')
				.click('.jcarousel-control a:nth-child(2)')
				.pause(500) // wait for slider transition
				.click('#homepage-slider')
				.getTitle(function (err, title) {
					assert.equal(err, undefined);
					title = title.split('|')[0].trim();
					assert.equal(title, 'Women\'s Accessories Belts, Wallets. Gloves, Hats, Watches, Luggage & More');
				})
				.elements('.search-result-items .grid-tile', function (err, result) {
					assert.equal(err, undefined);
					assert(result.value.length > 0, 'products available for this search');
				})
				.call(done);
		});
		it('#3 should go to Mens Suits', function (done) {
			client
				.waitForExist('.jcarousel-control a:nth-child(3)')
				.click('.jcarousel-control a:nth-child(3)')
				.pause(500) // wait for slider transition
				.click('#homepage-slider')
				.getTitle(function (err, title) {
					assert.equal(err, undefined);
					title = title.split('|')[0].trim();
					assert.equal(title, 'Mens Suits for Business and Casual');
				})
				.elements('.search-result-items .grid-tile', function (err, result) {
					assert.equal(err, undefined);
					assert(result.value.length > 0, 'products available for this search');
				})
				.call(done);
		});
		it('#4 should go to Women\'s Dresses', function (done) {
			client
				.waitForExist('.jcarousel-control a:nth-child(4)')
				.click('.jcarousel-control a:nth-child(4)')
				.pause(500) // wait for slider transition
				.click('#homepage-slider')
				.getTitle(function (err, title) {
					assert.equal(err, undefined);
					title = title.split('|')[0].trim();
					assert.equal(title, 'Women\'s Dresses for all Occasions');
				})
				.elements('.search-result-items .grid-tile', function (err, result) {
					assert.equal(err, undefined);
					assert(result.value.length > 0, 'products available for this search');
				})
				.call(done);
		});
		it('#5 should go to Women\'s Shoes', function (done) {
			client
				.waitForExist('.jcarousel-control a:nth-child(5)')
				.click('.jcarousel-control a:nth-child(5)')
				.pause(500) // wait for slider transition
				.click('#homepage-slider')
				.getTitle(function (err, title) {
					assert.equal(err, undefined);
					title = title.split('|')[0].trim();
					assert.equal(title, 'Womens Shoes Including Casual, Flat, Mid Heels & High Heels');
				})
				.elements('.search-result-items .grid-tile', function (err, result) {
					assert.equal(err, undefined);
					assert(result.value.length > 0, 'products available for this search');
				})
				.call(done);
		});
		afterEach(function (done) {
			client.call(done);
		});
	});
	describe('Vertical carousel', function () {
		var verticalCarousel = '#vertical-carousel';
		before(function (done) {
			client.url(config.url, done);
		});
		it('#1 should be Classic Pant', function (done) {
			client
				.pause(500) // wait for carousel to be set up
				.waitForExist(verticalCarousel + ' ul li:nth-child(1)')
				.isVisible(verticalCarousel + ' ul li:nth-child(1) .product-tile', function (err, visible) {
					assert.equal(err, undefined);
					assert.ok(visible);
				})
				.getText(verticalCarousel + ' ul li:nth-child(1) .product-name a', function (err, text) {
					assert.equal(err, undefined);
					assert.equal(text, 'Classic Pant');
				})
				.call(done);
		});
		it('#2 should be Pink Quartz Hoop Earring', function (done) {
			client
				.waitForExist(verticalCarousel + ' .jcarousel-next')
				.click(verticalCarousel + ' .jcarousel-next')
				.pause(500) // wait for carousel transition
				.isVisible(verticalCarousel + ' ul li:nth-child(2) .product-tile', function (err, visible) {
					assert.equal(err, undefined);
					assert.ok(visible);
				})
				.getText(verticalCarousel + ' ul li:nth-child(2) .product-name a', function (err, text) {
					assert.equal(err, undefined);
					assert.equal(text, 'Pink Quartz Hoop Earring');
				})
				.call(done);
		});
		it('#3 should be Classic Shell', function (done) {
			client
				.waitForExist(verticalCarousel + ' .jcarousel-next')
				.click(verticalCarousel + ' .jcarousel-next')
				.pause(500) // wait for carousel transition
				.isVisible(verticalCarousel + ' ul li:nth-child(3) .product-tile', function (err, visible) {
					assert.equal(err, undefined);
					assert.ok(visible);
				})
				.getText(verticalCarousel + ' ul li:nth-child(3) .product-name a', function (err, text) {
					assert.equal(err, undefined);
					assert.equal(text, 'Classic Shell');
				})
				.call(done);
		});
		it('#4 should be Charcoal Single Pleat Wool Suit', function (done) {
			client
				.waitForExist(verticalCarousel + ' .jcarousel-next')
				.click(verticalCarousel + ' .jcarousel-next')
				.pause(500) // wait for carousel transition
				.isVisible(verticalCarousel + ' ul li:nth-child(4) .product-tile', function (err, visible) {
					assert.equal(err, undefined);
					assert.ok(visible);
				})
				.getText(verticalCarousel + ' ul li:nth-child(4) .product-name a', function (err, text) {
					assert.equal(err, undefined);
					assert.equal(text, 'Charcoal Single Pleat Wool Suit');
				})
				.call(done);
		});
	});
	after(function (done) {
		client.end(done);
	})
});
