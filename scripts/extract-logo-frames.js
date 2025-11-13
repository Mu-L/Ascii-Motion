#!/usr/bin/env node

/**
 * Extract frame data from exported React component and inject into AsciiMotionLogo component
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the exported component
const sourceFile = path.join(__dirname, '..', 'ascii-motion-header-logo.tsx');
const targetFile = path.join(__dirname, '..', 'src', 'components', 'common', 'AsciiMotionLogo.tsx');

console.log('Reading source file...');
const sourceContent = fs.readFileSync(sourceFile, 'utf-8');

// Extract the FRAMES array and canvas dimensions
const framesMatch = sourceContent.match(/const FRAMES: Frame\[\] = (\[[\s\S]*?\n\]);/);
const canvasWidthMatch = sourceContent.match(/const CANVAS_WIDTH = ([\d.]+);/);
const canvasHeightMatch = sourceContent.match(/const CANVAS_HEIGHT = ([\d.]+);/);

if (!framesMatch || !canvasWidthMatch || !canvasHeightMatch) {
  console.error('Could not find FRAMES or canvas dimensions in source file');
  process.exit(1);
}

const framesData = framesMatch[1];
const width = parseFloat(canvasWidthMatch[1]);
const height = parseFloat(canvasHeightMatch[1]);

// Calculate grid dimensions from canvas size and typical cell size
// The exported component uses CELL_WIDTH = 10.8 and CELL_HEIGHT = 18
const gridWidth = Math.round(width / 10.8);
const gridHeight = Math.round(height / 18);

const metadataData = `{
  width: ${gridWidth},
  height: ${gridHeight},
  frameCount: FRAMES.length,
}`.replace(/FRAMES/g, 'frames');

console.log('Reading target file...');
const targetContent = fs.readFileSync(targetFile, 'utf-8');

// Replace the placeholder frame data
const updatedContent = targetContent
  .replace(
    /const frames: Frame\[\] = \[[\s\S]*?\];/,
    `const frames: Frame[] = ${framesData};`
  )
  .replace(
    /const metadata = {[\s\S]*?};/,
    `const metadata = ${metadataData};`
  );

console.log('Writing updated component...');
fs.writeFileSync(targetFile, updatedContent, 'utf-8');

console.log('✅ Frame data successfully extracted and injected!');
console.log('You can now delete ascii-motion-header-logo.tsx');
