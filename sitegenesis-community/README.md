# Welcome to the SiteGenesis Community site!
The current version of this code is `v15.3.1`.  It was updated on March 24, 2015.  The release notes for this release can be found at  https://xchange.demandware.com/docs/DOC-27475

## Goals
The goals of this repository are:

* To provide earlier access to Demandware developers as platform releases are pushed to the sandboxes
* To provide 'git' access to the code so that you can cherry pick specific fixes (or even merge entire releases!) into your code lines
* To provide the community a vehicle for submitting code changes via git's 'pull request' mechanism
* To allow community members to share (un-tested) code branches with each other.

The Demandware SiteGenesis development team will evaluate the pull requests and where appropriate, will pull them in, test them, and merge them into our 'master' SiteGenesis branch for re-release.

For this reason, we are restricting write access to the 'master' branch in this repository: it contains only code 'blessed' by our review and testing process. We are therefore asking that submissions that you make exist in branches in your own FORKS to make it easier for us to merge and test.

A detailed submission guideline is posted on XChange (https://xchange.demandware.com/docs/DOC-21927).
Thank you for your submissions and your thoughts on the best way to utilize this resource.

## Demo Storefront Data
### Creating a data installation
Because of file size constraints, the demo store data distribution is broken into 2 distinct parts:
- everything, without high resolution images, including a catalog with hi resolution references removed
- a delta distibution, with only high resolution images, plus a catalog specifically referencing those images

If you need to install high resolution images, you will need to perform 2 separate import steps.

    % git pull demo_data_no_hires_images

When you want to install the high resolution images, please access the respository:
* https://bitbucket.org/demandware/sg-dev-tools/
and look at the metadata-with-hi-res-images folder


### Zipping the files
On the Mac, you should use the commandline `zip` command to make sure the folder structure is created properly.

    % zip -r demo_data_no_hires_images demo_data_no_hires_images


### Upload and import the site
Upload the resulting file to your site and import it.

## Build tools
Starting with 15.1, SiteGenesis supports both [gulp](http://gulpjs.com) and [Grunt](http://gruntjs.com) as build tools.

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
Before authoring JS, make sure to checkout the `README.md` document in `app_storefront_richUI/cartridge/js` directory.

The new modular JavaScript architecture relies on [browserify](https://github.com/substack/node-browserify) to compile JS code written in CommonJS standard.

#### `gulp js`

Compile JS modules in the `js` directory into `static/default/js` directory. The entry point for browserify is `app_storefront_richUI/cartridge/js/app.js`, and the bundled js is output to `app_storefront_richUI/cartridge/static/default/js/app.js`.

This task is also run automatically on any `.js` file change by using the `gulp watch` task.

The equivalent task for grunt, `grunt js`, is also available.

#### `gulp jscs` and `gulp jshint`
Run code format and style validators. New code must not have any errors reported before being accepted.

The equivalent tasks for grunt, `grunt jscs` and `grunt jshint`, are also available.

### Watching
To make the development process easier, running `gulp` on the command line will run the **default** task and automatically watch any changes in both `scss` and `js` code to run the right compilers.

For JavaScript, when watching is happening, [watchify](https://github.com/substack/watchify) is used instead of browserify for faster bundling by taking advantage of caching.

The equivalent default task for grunt, `grunt`, is also available.

## Shared Content Site
One of the new features in Site Genesis 14.8 is the ability to demonstrate the use of the Shared Content facility built into Demandware.  To enable this capability, the content library in Site Genesis has been rebuilt as a "shared library".  In order to demonstrate the power of this feature, we have created a new site which shares this library with Site Genesis.  The new site, called "SiteGenesisCollections".  You can download the cartrdige which contains this new site from https://bitbucket.org/demandware/sitegenesis-content-sharing

Updated: 3/24/15