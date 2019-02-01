var assert = require('chai').assert;
var client = require('../webdriver/client');
var config = require('../webdriver/config');

describe('Checkout Simple Product', function () {
	before(function (done) {
		client.init().url(config.url, done);
	});
	it('add a suit to cart', function (done) {
		client
			.waitForExist('form[role="search"]')
			.setValue('#q', 'charcoal wool suit')
			.submitForm('form[role="search"]')
			.waitForExist('#search-result-items', function (err) {
				assert.equal(err, undefined);
			})
			.click('.grid-tile:first-child .name-link')
			.waitForExist('.product-variations', function (err) {
				assert.equal(err, undefined);
			})
			.click('.swatches.size li:nth-child(2) a')
			.pause(500)
			.click('.swatches.width li:nth-child(2) a')
			.pause(500)
			.isEnabled('#add-to-cart', function (err, enabled) {
				assert.equal(err, undefined);
				assert.ok(enabled, 'Add to Cart button is not enabled');
			})
			.click('#add-to-cart', function (err) {
				assert.equal(err, undefined);
			})
			.moveToObject('#mini-cart')
			.pause(500)
			.isVisible('.mini-cart-content', function (err, visible) {
				assert.equal(err, undefined);
				assert.ok(visible);
			})
			.elements('.mini-cart-product', function (err, result) {
				assert.equal(err, undefined);
				assert(result.value.length === 1, 'one product is added to cart');
			})
			.call(done);
	});
	it('checkout as guest', function (done) {
		client
			.moveToObject('#mini-cart')
			.pause(500)
			.click('.mini-cart-link-checkout')
			.click('[name$="login_unregistered"]')
			.getAttribute('.checkout-progress-indicator .step-1', 'class', function(err, attribute) {
				assert.include(attribute, 'active', 'Shipping step is active');
			})
			.call(done);
	});
	it('fill out shipping page', function (done) {
		client
			.setValue('[name$="shippingAddress_addressFields_firstName"]', 'John')
			.setValue('[name$="shippingAddress_addressFields_lastName"]', 'Smith')
			.setValue('[name$="shippingAddress_addressFields_address1"]', '5 Wall St')
			.selectByValue('[name$="shippingAddress_addressFields_country"]', 'US')
			.selectByValue('[name$="shippingAddress_addressFields_states_state"]', 'MA')
			.setValue('[name$="shippingAddress_addressFields_city"]', 'Burlington')
			.setValue('[name$="shippingAddress_addressFields_postal"]', '01803')
			.setValue('[name$="shippingAddress_addressFields_phone"]', '7814251267')
			// use same address for billing
			.click('[name$="shippingAddress_useAsBillingAddress"]')
			.isSelected('[name$="shippingAddress_useAsBillingAddress"]', function (err, selected) {
				assert.equal(err, undefined);
				assert.ok(selected, 'Use shipping address as billing');
			})
			.isEnabled('[name$="shippingAddress_save"]', function (err, enabled) {
				assert.equal(err, undefined);
				assert.ok(enabled);
			})
			.click('[name$="shippingAddress_save"]')
			.getAttribute('.checkout-progress-indicator .step-2', 'class', function(err, attribute) {
				assert.include(attribute, 'active', 'Billing step is active');
			})
			.call(done);
	});
	it('fill out billing page', function (done) {
		client
			.setValue('[name$="billing_billingAddress_email_emailAddress"', 'jsmith@demandware.com')
			.setValue('[name$="billing_paymentMethods_creditCard_owner"]', 'John Smith')
			.setValue('[name$="billing_paymentMethods_creditCard_number"]', '4111111111111111')
			.selectByIndex('[name$="billing_paymentMethods_creditCard_year"]', 2)
			.setValue('[name$="billing_paymentMethods_creditCard_cvn"]', '987')
			// click outside to enable continue button
			.click('.form-row.cvn label')
			.isEnabled('button[name$="billing_save"]', function (err, enabled) {
				assert.equal(err, undefined);
				assert.ok(enabled);
			})
			.click('button[name$="billing_save"]')
			.getAttribute('.checkout-progress-indicator .step-3', 'class', function(err, attribute) {
				assert.include(attribute, 'active', 'Review order step is active');
			})
			.call(done);
	});
	it('place order', function (done) {
		client
			.isEnabled('button[name$="submit"]', function (err, enabled) {
				assert.equal(err, undefined);
				assert.ok(enabled);
			})
			.click('button[name$="submit"]')
			.getText('.primary-content h1', function (err, title) {
				assert.equal(err, undefined);
				assert.equal(title, 'Thank you for your order.');
			})
			.call(done);
	})
	after(function (done) {
		client.end(done);
	})
});
