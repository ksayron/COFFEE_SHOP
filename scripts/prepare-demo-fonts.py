"""Subset the downloaded demo fonts; requires local fontTools, no package install."""
import sys
import types
import subprocess
from pathlib import Path

try:
    import brotli
except ImportError:
    brotli = types.ModuleType('brotli')
    brotli.MODE_FONT = 2
    def compress(data, mode=2):
        script = "const z=require('node:zlib');let a=[];process.stdin.on('data',c=>a.push(c));process.stdin.on('end',()=>process.stdout.write(z.brotliCompressSync(Buffer.concat(a),{params:{[z.constants.BROTLI_PARAM_MODE]:2,[z.constants.BROTLI_PARAM_QUALITY]:11}})));"
        return subprocess.run(['node', '-e', script], input=data, capture_output=True, check=True).stdout
    brotli.compress = compress
    sys.modules['brotli'] = brotli

from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parents[1]
for name in ['unbounded', 'ibm-plex-mono']:
    font = TTFont(root / '.local/demo-assets' / (name + '.ttf'))
    if name == 'unbounded':
        # A single poster weight avoids shipping the full variable-font axis.
        font = instantiateVariableFont(font, {'wght': 700}, inplace=True)
    options = subset.Options()
    options.layout_features = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=list(range(0x20, 0x180)) + list(range(0x400, 0x530))
                 + list(range(0x2000, 0x2070)) + [0x20BD, 0x2116, 0x2192, 0x2197, 0x00D7])
    sub.subset(font)
    if name == 'ibm-plex-mono':
        # The source reserves "Plex". Give this modified subset its own font names.
        names = {1: 'Kvarta Label Demo', 3: 'KvartaLabelDemo-Regular-Subset',
                 4: 'Kvarta Label Demo Regular', 6: 'KvartaLabelDemo-Regular',
                 16: 'Kvarta Label Demo', 17: 'Regular'}
        for record in font['name'].names:
            if record.nameID in names:
                record.string = names[record.nameID].encode(record.getEncoding())
    font.flavor = 'woff2'
    output_name = 'kvarta-label' if name == 'ibm-plex-mono' else name
    target = root / 'apps/web/public/fonts/demos' / (output_name + '.woff2')
    font.save(target)
    print(name, target.stat().st_size, 'bytes')
