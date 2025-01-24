const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/editor.js"],
  bundle: true,
  outfile: "static/editor.js",
  minify: true,
  sourcemap: true,
  loader: { ".ttf": "file" },
}).catch(() => process.exit(1));
