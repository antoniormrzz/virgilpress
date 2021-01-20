# virgilpress
A hassle-free, feature packed static site generator, without a frontend framework. Since ejs, scss and ts support writing plain html, css and js, these features are optional.

## Features
- ⭐ Tailwindcss 2
- ⭐ babel
- ⭐ ejs support
- ⭐ webpack
- ⭐ typescript
- ⭐ Sass (Supports Tailwind apply)
- ⭐ postcss (autoprefixer already on)
- ⭐ Live Reload
- ⭐ Cache busting
- ⭐ Page generator script (Customizable)
- ⭐ Asset support

# Usage
1. Clone or Download this repo
2. Do 'npm i' to install dependencies
3. 'npm start'
4. Profit????

## Important Notes
- since assets are always copied with copy plugin, in order to stop copying your url assets twice (basically anything you use with a url in scss/css, like fonts, images etc), use nc- prefix with asset file names. e.g. nc-item.jpg will not be copied to assets unless file-loader does it. The only time assets would be copied over twice, is when file-loader loads them (i.e. background css with url in your scss file).

- Each ts file for a page needs to import tailwindcss and it's own scss file. e.g. hello.ts needs to import hello.scss so that file-loader would pick it up.

- tailwindcss intellisense and ejs support extensions are recommended for Visual Studio Code. 

- VirgilPress is not flexible on the structure, read Structure section for more.

- By default VirgilPress can load png, jpg, gif and woff/woff2 files as url. You can add new rules and loaders for webpack if you need more. Any file in assets folder without 'nc-' in the beginning of the file name, will be copied over to dist assets.

- You should access assets in ejs (e.g. img tag src) with a path starting from 'assets/'. Look at welcome.ejs for an example.

- Tailwind is purging pages and views directories, if you are going to have ejs files somewhere else, make sure to configure tailwind.


# Structure

Your pages should all be in named folders under src/pages. Nesting pages is not allowed, for easier deploy. 

Each Page must have 3 files (ejs, ts, scss) with the same name as the folder, this is your page name. 

Assets go into **assets** folder. Please try to keep things tidy. Structure of assets folder does not matter, it will be copied as is.

**global** is for global styles and global codes. Global structure is up to you (New pages will always import global/styles/global.scss but you can remove that import), as long as you import things into your ts/scss files correctly.

**pages** holds your pages obviously. All pages have a single folder, and atleast 3 files with the same name inside. For the best result, use the createpage script. index page is optional, but makes deployment easier (served as default). You can link to other pages as html files, see index.ejs for an example.

**types** is for any types you might need to write for typescript.

**views** will hold your ejs files, you can extract your footer, header, or any component you like into an ejs file and include them in your pages. There is an example with a value being passed.

**Createpage.js and liveserver.js** are convinience scripts, you can modify them, but I would not recommend so.

# Creating a new Page
There is a script for generating new pages. do "npm run createpage -- pagename" to generate a new page.


# Final notes
You have the full power of npm, you can use things like lottie animations and any other library you like without a cdn. You can install and use jquery too, but it is not provided out of the box.
I set up a github action for github pages for another project, but you could just as easily drag and drop your **built** dist folder to netlify. 
You could also include Vue in your project.

Don't forget to change LICENSE, README, package.json and package-lock for your projects.

