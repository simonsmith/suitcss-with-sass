# SUIT CSS with Sass & PostCSS

This is an example of writing SUIT components with Sass and then using [gulp](http://gulpjs.com/) and [PostCSS](https://github.com/postcss/postcss) to handle the tooling

A copy of the my existing [SUIT CSS with Stylus](https://github.com/simonsmith/suitcss-with-stylus) but working with Sass

### How it works

Using [gulp](gulpjs.com) the SUIT components (written as Sass files) are compiled into CSS, linted with the SUIT conformance tool and then built with [postcss-import](https://github.com/postcss/postcss-import) and [cssnext](https://github.com/cssnext/cssnext). A single file is the result.

Additional plugins can be added easily.

### Caveat

Using `libsass` means that the output of a sass file has the `@import` above the `/** @define Component */` comment. This stops the BEM Linter working.

To circumvent this consider handling all imports in the `main.scss` instead of at a per file level.

Using the Ruby Sass does not have this issue.
