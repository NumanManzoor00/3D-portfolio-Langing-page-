import { build } from "esbuild";
import { rm, mkdir, cp, copyFile } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
await copyFile("src/styles/global.css", "dist/style.css");
await build({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  minify: true,
  outfile: "dist/app.js",
  define: { "process.env.NODE_ENV": '"production"' },
});
console.log("Website built in dist/");
