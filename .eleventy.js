const path = require('path');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const sass = require("sass");
const postcss = require("postcss");
const browserslist = require("browserslist");
const { transform, browserslistToTargets } = require("lightningcss");
//062623 090824 Luxon now works for dateTime.
const { DateTime } = require("luxon");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {

	// Recognize Sass as a "template languages"
eleventyConfig.addTemplateFormats("scss");

// Compile Sass
eleventyConfig.addExtension("scss", {
  outputFileExtension: "css",
  compile: async function (inputContent, inputPath) {
    // Skip files like _fileName.scss
    let parsed = path.parse(inputPath);
    if (parsed.name.startsWith("_")) {
      return;
    }

    // Run file content through Sass
    let result = sass.compileString(inputContent, {
      loadPaths: [parsed.dir || "."],
      sourceMap: false, // or true, your choice!
    });


    // Allow included files from @use or @import to
    // trigger rebuilds when using --incremental
    this.addDependencies(inputPath, result.loadedUrls);

    // Add Browserlist / LightningCSS to Sass
    let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

//  This is SASS without LightningCSS
//    return async () => {
//      return result.css;
//    };
//  },
//});

//  This is SASS with LightningCSS and minification, no map
return async () => {
			let { code } = await transform({
				code: Buffer.from(result.css),
				minify: true,
				sourceMap: false,
				targets,
			});
			return result.css;
		};
	},
});


// Watch CSS files for changes
eleventyConfig.setBrowserSyncConfig({
  files: './app/css/**/*.css'
});
eleventyConfig.addWatchTarget("./app/scss/");
eleventyConfig.addWatchTarget("./app/scss-02/");
eleventyConfig.addWatchTarget('app/css');
eleventyConfig.addPassthroughCopy('./app/css');
eleventyConfig.addPassthroughCopy('./app/assets');
eleventyConfig.addWatchTarget('app/assets');
eleventyConfig.addPassthroughCopy('./app/fonts');
eleventyConfig.addWatchTarget('app/fonts');
eleventyConfig.addWatchTarget('app/_includes');

// Add Navigation Plugin + Shortcodes:
eleventyConfig.addPlugin(eleventyNavigationPlugin);

  /* --- SHORTCODES --- */
  // page navigation. This path works 062623
  eleventyConfig.addShortcode('navlist', require('./app/lib/shortcodes/navlist.js'));

// --- Filter for Luxon --- taken from v8 starter
eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
  // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
  //dt = DateTime.fromJSDate(new Date(dateObj), { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  dt = DateTime.fromJSDate(new Date(dateObj), { zone: zone || "utc" }).setLocale('en').toFormat('DDDD');
  //dt.setLocale('fr').toLocaleString({ locale: 'fr' });
  return dt;
});

  // This changes resource.md output to write to /resource.html
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });
    // Default root variable:
    eleventyConfig.addGlobalData("root", () => "");
    // This suggestion to slice the '/' off does not work (?)
    const origUrlFilter = eleventyConfig.getFilter("url");
    eleventyConfig.addFilter("url", function (url, pathPrefixOverride) {
      const _url = origUrlFilter(url, pathPrefixOverride);
      if (_url.startsWith("/") && !_url.startsWith("//")) {
        return _url.slice(1);
      }
      return _url;
    });

  // Return your Object options:
	return {
	dir: {
	input: "app",// Defaults to src
	includes: "_includes",
	output: "dist"// Defaults to _site
	},
//  pathPrefix: '',
templateFormats: ['md', 'njk', 'html' ],
	markdownTemplateEngine: 'njk',
	htmlTemplateEngine: 'njk',
	dataTemplateEngine: 'njk',
	};
}