import "./build.mjs";
import { context } from "esbuild";
import { watch, copyFileSync } from "node:fs";
import { serve } from "./server.mjs";
const ctx = await context({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  outfile: "dist/app.js",
  define: { "process.env.NODE_ENV": '"development"' },
});
await ctx.watch();
watch("src/styles/global.css", () =>
  copyFileSync("src/styles/global.css", "dist/style.css"),
);
serve();
console.log("Watching React and CSS files. Refresh the browser after edits.");
