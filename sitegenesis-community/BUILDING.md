## Build tools
Starting with 15.1, SiteGenesis uses [gulp](http://gulpjs.com) as its main build tool. [Grunt](http://gruntjs.com) is also supported.

### Getting started
- Pull down the latest copy of SiteGenesis. If you're reading this doc, it is likely that you already have a version of SG with the build tool config.
- `cd` into the `sitegenesis` directory.
- Install node modules:
```sh
$ npm install
```
This assumes that you already have `npm` installed on your command line. If not, please [install node](http://nodejs.org/download/) first.
If you encounter an error, please try and address that first, either by Googling or [contacting us](mailto:tnguyen@demandware.com).
- Install either `gulp` or `grunt` (see below).

#### gulp
Install gulp globally
```sh
$ npm install -g gulp
```

#### grunt
Install the grunt command line tools
```sh
$ npm install -g grunt-cli
```

Now that you have gulp (or grunt) and its dependencies installed, you can start using it in your workflow.


### SCSS
Before authoring SCSS, make sure to check out the [README](https://bitbucket.org/demandware/sitegenesis/src/1b69dfe0af175b1690a21b15fc16a40aa345775c/app_storefront_core/cartridge/scss/README.md?at=master) in `app_storefront_core/cartridge/scss` directory.

#### `gulp css`
This task does 2 things:
- Compile `.scss` code into `.css`
- [Auto-prefix](https://github.com/ai/autoprefixer) for vendor prefixes

This task is also run automatically on any `.scss` file change by using the `gulp watch` task.

The equivalent task for grunt, `grunt css`, is also available.

### JS
Before authoring JS, make sure to checkout the [README](https://bitbucket.org/demandware/sitegenesis/src/1b69dfe0af175b1690a21b15fc16a40aa345775c/app_storefront_richUI/cartridge/js/README.md?at=master) in `app_storefront_richUI/cartridge/js` directory.

The new modular JavaScript architecture relies on [browserify](https://github.com/substack/node-browserify) to compile JS code written in CommonJS standard.

#### `gulp js`

Compile JS modules in the `js` directory into `static/default/js` directory. The entry point for browserify is `app_storefront_richUI/cartridge/js/app.js`, and the bundled js is output to `app_storefront_richUI/cartridge/static/default/js/app.js`.

This task is also run automatically on any `.js` file change by using the `gulp watch` task.

The equivalent task for grunt, `grunt js`, is also available.

#### `gulp jscs` and `gulp jshint`
Run code format and style validators. New code must not have any errors reported before being accepted.

The equivalent tasks for grunt, `grunt jscs` and `grunt jshint`, are also available.

### Watching
To make the development process easier, running `gulp` on the command line will run the default task and automatically watch any changes in both `scss` and `js` code to run the right compilers.

For JavaScript, when watching is happening, [watchify](https://github.com/substack/watchify) is used instead of browserify for faster bundling by taking advantage of caching.

The equivalent default task for grunt, `grunt`, is also available.
