// Builds under several base paths and fails if any internal URL ignores the base.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

for (const base of ['/', '/developer-portfolio/', '/developer-portfolio/pr-1/']) {
  test(`no root-absolute URLs when built with base ${base}`, () => {
    execSync('npx astro build', {
      stdio: 'pipe',
      env: { ...process.env, BASE_PATH: base },
    });
    const offenders = [];
    for (const file of htmlFiles('dist')) {
      const html = readFileSync(file, 'utf8');
      for (const m of html.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)) {
        const url = m[1];
        if (url.startsWith('//')) continue;
        if (!url.startsWith(base)) offenders.push(`${file}: ${url}`);
      }
    }
    assert.deepEqual(offenders, []);
  });
}
