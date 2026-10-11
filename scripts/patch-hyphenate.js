const fs = require('fs');
const path = require('path');

const p = path.resolve(__dirname, '../node_modules/@react-pdf/hyphenate/package.json');
if (fs.existsSync(p)) {
  let raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
  try {
    const json = JSON.parse(raw);
    json.exports = {
      '.': {
        types: './lib/index.d.ts',
        import: './lib/index.js',
        default: './lib/index.js'
      },
      './*': {
        types: './lib/*.d.ts',
        import: './lib/*.js',
        default: './lib/*.js'
      }
    };
    fs.writeFileSync(p, JSON.stringify(json, null, 2), 'utf8');
    console.log('Hyphenate exports patched successfully.');
  } catch (err) {
    console.error('Error patching hyphenate:', err);
  }
}