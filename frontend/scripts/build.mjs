import { cpSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const srcDir = resolve(root, 'frontend', 'src');
const distDir = resolve(root, 'frontend', 'dist');

mkdirSync(distDir, { recursive: true });
cpSync(resolve(srcDir, 'index.html'), resolve(distDir, 'index.html'));
cpSync(resolve(srcDir, 'styles.css'), resolve(distDir, 'styles.css'));
