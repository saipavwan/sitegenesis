var config = require('./config');

var client = require('webdriverio').remote({
	desiredCapabilities: {
		browserName: config.client || 'phantomjs'
	},
	logLevel: 'silent'
});

module.exports = client;
