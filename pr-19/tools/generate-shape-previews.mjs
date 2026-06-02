#!/usr/bin/env node
// Regenerate tools/d2-shape-previews.js:
//   node tools/generate-shape-previews.mjs > tools/d2-shape-previews.js
import { D2 } from '../node_modules/@terrastruct/d2/dist/node-esm/index.js';

const D2_SHAPES = [
  'callout','circle','class','cloud','code',
  'cylinder','diamond','document','hexagon','image',
  'oval','package','page','parallelogram','person',
  'queue','rectangle','sql_table','square','step',
  'stored_data','text',
];

const d2 = new D2();
await d2.ready;

const svgs = {};
for (const shape of D2_SHAPES) {
  try {
    const compiled = await d2.compile(`${shape} { shape: ${shape} }`);
    let svg = await d2.render(compiled.diagram, compiled.renderOptions);
    svg = svg.replace(/\s+width="[^"]*"/, '').replace(/\s+height="[^"]*"/, '');
    svgs[shape] = svg;
    process.stderr.write(`✓ ${shape}\n`);
  } catch (e) {
    process.stderr.write(`✗ ${shape}: ${e.message}\n`);
    svgs[shape] = null;
  }
}

const lines = [
  '// Pre-rendered SVG previews for D2 shapes (generated via generate-shape-previews.mjs)',
  '// Do not edit by hand — regenerate with: node tools/generate-shape-previews.mjs > tools/d2-shape-previews.js',
  'export const SHAPE_PREVIEW_SVGS = {',
];
for (const [shape, svg] of Object.entries(svgs)) {
  lines.push(`  ${shape}: ${svg ? JSON.stringify(svg) : 'null'},`);
}
lines.push('};');
process.stdout.write(lines.join('\n') + '\n');

d2.worker?.terminate();
