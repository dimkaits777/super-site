/**
 * Procedural GLB generator for the «Кокос» site.
 *
 * The project ships no third-party binary models — every asset is generated
 * here from primitives. The output filename is an opaque 8-char hash (no
 * descriptive name like `coconut_cake.glb` is exposed to the client) which
 * satisfies the deployment hardening requirement, and `src/config/models.js`
 * is rewritten so the component import paths always stay in sync.
 *
 * Dependency-free: emits a spec-valid glTF 2.0 binary (.glb) by hand.
 * Run with `node scripts/generate-models.mjs` (wired into `prebuild`).
 */
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const MODELS_DIR = resolve(ROOT, 'public/models');

/* ---------- tiny geometry helpers (positions + normals + indices) ---------- */

function makeCylinder({ rTop, rBottom, height, segments = 40, cy = 0 }) {
  const pos = [];
  const nrm = [];
  const idx = [];
  const half = height / 2;
  const slope = (rBottom - rTop) / height; // for side normals
  // side ring vertices (duplicated top/bottom)
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const cos = Math.cos(t);
    const sin = Math.sin(t);
    const nx = cos;
    const nz = sin;
    const nlen = Math.hypot(nx, slope, nz) || 1;
    // top vertex
    pos.push(rTop * cos, cy + half, rTop * sin);
    nrm.push(nx / nlen, slope / nlen, nz / nlen);
    // bottom vertex
    pos.push(rBottom * cos, cy - half, rBottom * sin);
    nrm.push(nx / nlen, slope / nlen, nz / nlen);
  }
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = i * 2 + 2;
    const d = i * 2 + 3;
    idx.push(a, b, d, a, d, c);
  }
  // caps
  const addCap = (radius, y, ny) => {
    const center = pos.length / 3;
    pos.push(0, y, 0);
    nrm.push(0, ny, 0);
    const start = pos.length / 3;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      pos.push(radius * Math.cos(t), y, radius * Math.sin(t));
      nrm.push(0, ny, 0);
    }
    for (let i = 0; i < segments; i++) {
      if (ny > 0) idx.push(center, start + i, start + i + 1);
      else idx.push(center, start + i + 1, start + i);
    }
  };
  addCap(rTop, cy + half, 1);
  addCap(rBottom, cy - half, -1);
  return { pos, nrm, idx };
}

function makeSphere({ r, wSeg = 24, hSeg = 18, cx = 0, cy = 0, cz = 0 }) {
  const pos = [];
  const nrm = [];
  const idx = [];
  for (let y = 0; y <= hSeg; y++) {
    const v = y / hSeg;
    const phi = v * Math.PI;
    for (let x = 0; x <= wSeg; x++) {
      const u = x / wSeg;
      const theta = u * Math.PI * 2;
      const nx = -Math.cos(theta) * Math.sin(phi);
      const ny = Math.cos(phi);
      const nz = Math.sin(theta) * Math.sin(phi);
      pos.push(cx + r * nx, cy + r * ny, cz + r * nz);
      nrm.push(nx, ny, nz);
    }
  }
  const row = wSeg + 1;
  for (let y = 0; y < hSeg; y++) {
    for (let x = 0; x < wSeg; x++) {
      const a = y * row + x;
      const b = a + row;
      idx.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  return { pos, nrm, idx };
}

/* ---------- the cake: stacked tiers + gold bands + coconut crown ---------- */

const CREAM = [0.97, 0.95, 0.9, 1];
const GOLD = [0.76, 0.616, 0.353, 1];
const HUSK = [0.247, 0.129, 0.06, 1];
const SNOW = [1, 1, 1, 1];

const parts = [
  { geo: makeCylinder({ rTop: 1.0, rBottom: 1.05, height: 0.46, cy: 0.23 }), color: CREAM, rough: 0.85, metal: 0.02 },
  { geo: makeCylinder({ rTop: 1.02, rBottom: 1.02, height: 0.05, cy: 0.485 }), color: GOLD, rough: 0.25, metal: 0.85 },
  { geo: makeCylinder({ rTop: 0.9, rBottom: 0.95, height: 0.4, cy: 0.71 }), color: CREAM, rough: 0.85, metal: 0.02 },
  { geo: makeCylinder({ rTop: 0.92, rBottom: 0.92, height: 0.05, cy: 0.935 }), color: GOLD, rough: 0.25, metal: 0.85 },
  { geo: makeCylinder({ rTop: 0.78, rBottom: 0.84, height: 0.36, cy: 1.14 }), color: CREAM, rough: 0.85, metal: 0.02 },
  // coconut crown
  { geo: makeSphere({ r: 0.34, cy: 1.36 }), color: SNOW, rough: 0.55, metal: 0.03 },
  { geo: makeSphere({ r: 0.2, cy: 1.55 }), color: HUSK, rough: 0.95, metal: 0.0 },
];

// decorative white-chocolate shards around the top tier
const shardCount = 10;
for (let i = 0; i < shardCount; i++) {
  const a = (i / shardCount) * Math.PI * 2;
  parts.push({
    geo: makeSphere({ r: 0.07, wSeg: 10, hSeg: 8, cx: Math.cos(a) * 0.72, cy: 1.34, cz: Math.sin(a) * 0.72 }),
    color: SNOW,
    rough: 0.3,
    metal: 0.05,
  });
}

/* ---------- pack into a glTF 2.0 binary (.glb) ---------- */

function pad4(buf) {
  const rem = buf.length % 4;
  return rem === 0 ? buf : Buffer.concat([buf, Buffer.alloc(4 - rem)]);
}

const bin = [];
let offset = 0;
const bufferViews = [];
const accessors = [];
const materials = [];
const primitives = [];

function pushView(buffer, target) {
  const padded = pad4(buffer);
  bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: buffer.length, target });
  bin.push(padded);
  offset += padded.length;
  return bufferViews.length - 1;
}

for (const part of parts) {
  const { pos, nrm, idx } = part.geo;
  const posArr = Float32Array.from(pos);
  const nrmArr = Float32Array.from(nrm);
  const idxArr = Uint16Array.from(idx);

  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < posArr.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      min[k] = Math.min(min[k], posArr[i + k]);
      max[k] = Math.max(max[k], posArr[i + k]);
    }
  }

  const posView = pushView(Buffer.from(posArr.buffer, posArr.byteOffset, posArr.byteLength), 34962);
  accessors.push({ bufferView: posView, componentType: 5126, count: posArr.length / 3, type: 'VEC3', min, max });
  const posAcc = accessors.length - 1;

  const nrmView = pushView(Buffer.from(nrmArr.buffer, nrmArr.byteOffset, nrmArr.byteLength), 34962);
  accessors.push({ bufferView: nrmView, componentType: 5126, count: nrmArr.length / 3, type: 'VEC3' });
  const nrmAcc = accessors.length - 1;

  const idxView = pushView(Buffer.from(idxArr.buffer, idxArr.byteOffset, idxArr.byteLength), 34963);
  accessors.push({ bufferView: idxView, componentType: 5123, count: idxArr.length, type: 'SCALAR' });
  const idxAcc = accessors.length - 1;

  materials.push({
    pbrMetallicRoughness: {
      baseColorFactor: part.color,
      metallicFactor: part.metal,
      roughnessFactor: part.rough,
    },
    name: `mat_${materials.length}`,
  });

  primitives.push({
    attributes: { POSITION: posAcc, NORMAL: nrmAcc },
    indices: idxAcc,
    material: materials.length - 1,
  });
}

const binBuffer = Buffer.concat(bin);

const gltf = {
  asset: { version: '2.0', generator: 'cocos-procedural-glb' },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: 'CoconutCake' }],
  meshes: [{ name: 'CoconutCake', primitives }],
  materials,
  accessors,
  bufferViews,
  buffers: [{ byteLength: binBuffer.length }],
};

const jsonBuffer = pad4(Buffer.from(JSON.stringify(gltf), 'utf8'));
const GLB_HEADER = 12;
const CHUNK_HEADER = 8;
const totalLength = GLB_HEADER + CHUNK_HEADER + jsonBuffer.length + CHUNK_HEADER + binBuffer.length;

const header = Buffer.alloc(GLB_HEADER);
header.writeUInt32LE(0x46546c67, 0); // 'glTF'
header.writeUInt32LE(2, 4);
header.writeUInt32LE(totalLength, 8);

const jsonChunkHeader = Buffer.alloc(CHUNK_HEADER);
jsonChunkHeader.writeUInt32LE(jsonBuffer.length, 0);
jsonChunkHeader.writeUInt32LE(0x4e4f534a, 4); // 'JSON'

const binChunkHeader = Buffer.alloc(CHUNK_HEADER);
binChunkHeader.writeUInt32LE(binBuffer.length, 0);
binChunkHeader.writeUInt32LE(0x004e4942, 4); // 'BIN\0'

const glb = Buffer.concat([header, jsonChunkHeader, jsonBuffer, binChunkHeader, binBuffer]);

/* ---------- opaque hashed filename + config sync ---------- */

const hash = createHash('sha256').update('cocos-coconut-cake-v1').digest('hex').slice(0, 8);
const fileName = `${hash}.glb`;

mkdirSync(MODELS_DIR, { recursive: true });
writeFileSync(resolve(MODELS_DIR, fileName), glb);

const manifest = {
  note: 'Filenames are opaque hashes by design — do not rename to descriptive names.',
  generated: new Date().toISOString().slice(0, 10),
  models: { coconutCake: `/models/${fileName}` },
};
writeFileSync(resolve(MODELS_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const configBody = `// AUTO-GENERATED by scripts/generate-models.mjs — do not edit by hand.
// Model files use opaque hashed names (no descriptive filenames are shipped).
export const CAKE_MODEL_URL =
  import.meta.env.VITE_CAKE_MODEL_URL || '/models/${fileName}';
`;
writeFileSync(resolve(ROOT, 'src/config/models.js'), configBody);

console.log(`✓ generated public/models/${fileName} (${glb.length} bytes)`);
console.log('✓ wrote public/models/manifest.json');
console.log('✓ synced src/config/models.js');
