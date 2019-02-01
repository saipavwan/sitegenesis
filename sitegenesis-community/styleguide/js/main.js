'use strict';

var MainView = require('./views/main');
var NavView = require('./views/nav');
require('./handlebars');

var nav = new NavView({
	el: document.querySelector('#nav')
}).render();

var main = new MainView({
	el: document.querySelector('#main')
}).render();
