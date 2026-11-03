// Serves dist/ only under BASE_PATH, like GitHub Pages project sites. Requests outside the
// prefix return 404, so root-absolute assets fail here just as they would on Pages.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const port = Number(process.env.PORT ?? 4321);
const root = join(process.cwd(), 'dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith(base)) {
    res.writeHead(404).end('Not found (outside base path)');
    return;
  }
  const rel = normalize(decodeURIComponent(url.pathname.slice(base.length)));
  if (rel.startsWith('..')) {
    res.writeHead(403).end();
    return;
  }
  let file = join(root, rel);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, () => console.log(`Serving dist at http://localhost:${port}${base}`));
