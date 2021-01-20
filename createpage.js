var fs = require("fs");
var path = require("path");

if (fs.existsSync(path.join(__dirname, "src"))) {
  if (fs.existsSync(path.join(__dirname, "src", "pages"))) {
    if (process.argv.length !== 3) {
      console.error("This script takes exactly 1 argument");
    } else {
      let pagename = process.argv.slice(2)[0].trim();
      if (pagename.match(/^[a-z1-9\-]+$/)) {
        console.log("Creating page " + process.argv.slice(2)[0]);
        if (fs.existsSync(path.join(__dirname, "src", "pages", pagename))) {
          console.error("Directory already exists");
        } else {
          fs.mkdirSync(path.join(__dirname, "src", "pages", pagename));
          let tsfile = `// for all modules, import tailwind and it's scss style
import "tailwindcss/tailwind.css";
import './${pagename}.scss';`;
          let scssfile = `@import '../../global/styles/global';`
          let ejsfile = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pagename}</title>
  </head>

  <body>
    <div>${pagename} page!</div>
  </body>
</html>`
          fs.writeFileSync(
            path.join(__dirname, "src", "pages", pagename, `${pagename}.ts`),
            tsfile,
            "utf8"
          );
          fs.writeFileSync(
            path.join(__dirname, "src", "pages", pagename, `${pagename}.scss`),
            scssfile,
            "utf8"
          );
          fs.writeFileSync(
            path.join(__dirname, "src", "pages", pagename, `${pagename}.ejs`),
            ejsfile,
            "utf8"
          );
        }
      } else {
        console.error("Invalid page name, use lowercase a-z and digits only.");
      }
    }
  } else {
    console.error("No pages folder found");
  }
} else {
  console.error("No src folder found");
}
