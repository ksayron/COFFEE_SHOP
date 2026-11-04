import sys
import types
import subprocess

# Use Node's bundled Brotli if the optional Python extension is unavailable.
try:
    import brotli
except ImportError:
    brotli = types.ModuleType('brotli')
    brotli.MODE_FONT = 2
    def compress(data, mode=2):
        script = "const z=require('node:zlib');let a=[];process.stdin.on('data',c=>a.push(c));process.stdin.on('end',()=>process.stdout.write(z.brotliCompressSync(Buffer.concat(a),{params:{[z.constants.BROTLI_PARAM_MODE]:2,[z.constants.BROTLI_PARAM_QUALITY]:11}})));"
        return subprocess.run(['node', '-e', script], input=data, capture_output=True, check=True).stdout
    brotli.compress = compress
    def decompress(data):
        script = "const z=require('node:zlib');let a=[];process.stdin.on('data',c=>a.push(c));process.stdin.on('end',()=>process.stdout.write(z.brotliDecompressSync(Buffer.concat(a))));"
        return subprocess.run(['node', '-e', script], input=data, capture_output=True, check=True).stdout
    brotli.decompress = decompress
    sys.modules['brotli'] = brotli

from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib.instancer import instantiateVariableFont
from pathlib import Path

directory = Path(__file__).resolve().parents[1] / 'apps/web/public/fonts'
for name in ['golos', 'literata']:
    source = directory / (name + '.ttf')
    font = TTFont(source if source.exists() else directory / (name + '.woff2'))
    if name == 'literata':
        # A single display optical size retains weight variation while avoiding
        # a large full optical-size axis download on mobile.
        axes = {'wght': (400, 700)}
        if any(axis.axisTag == 'opsz' for axis in font['fvar'].axes):
            axes['opsz'] = 48
        font = instantiateVariableFont(font, axes, inplace=True)
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=list(range(0x20, 0x180)) + list(range(0x400, 0x530)) + list(range(0x2000, 0x2070)) + [0x20BD, 0x2116, 0x2192])
    if source.exists():
        sub.subset(font)
    font.flavor = 'woff2'
    font.save(directory / (name + '.woff2'))
    # Keep delivered fonts compact; original upstream remains reproducible.
    if source.exists():
        source.unlink()
    print(name, (directory / (name + '.woff2')).stat().st_size)
