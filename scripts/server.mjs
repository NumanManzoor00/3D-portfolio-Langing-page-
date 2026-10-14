import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
export function serve() {
  const root = path.resolve("dist");
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".mp4": "video/mp4",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };
  return http
    .createServer(async (req, res) => {
      try {
        const pathname = decodeURIComponent(
          new URL(req.url, "http://localhost").pathname,
        );
        const file = path.resolve(
          root,
          "." + (pathname === "/" ? "/index.html" : pathname),
        );
        if (!file.startsWith(root + path.sep)) {
          res.writeHead(403);
          res.end();
          return;
        }
        const data = await readFile(file);
        res.writeHead(200, {
          "Content-Type":
            types[path.extname(file)] || "application/octet-stream",
        });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    })
    .listen(3000, () => console.log("Open http://localhost:3000"));
}
