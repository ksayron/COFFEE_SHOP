"""Outline the club wordmark/social artwork with the existing OFL font source.

Requires local fontTools and .local/demo-assets/unbounded.ttf prepared previously.
Rasterise social-club.svg with the installed sharp package; no network required.
"""
from pathlib import Path
import re
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

root = Path(__file__).resolve().parents[1]
font = instantiateVariableFont(TTFont(root / '.local/demo-assets/unbounded.ttf'), {'wght': 700})
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
units = font['head'].unitsPerEm


def lettering(text, x, y, size, colour='#2244c8'):
    paths, advance = [], 0
    for character in text:
        name = cmap[ord(character)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(pen)
        paths.append(f'<path transform="translate({advance} 0)" d="{pen.getCommands()}"/>')
        advance += glyphs[name].width
    return f'<g fill="{colour}" transform="translate({x} {y}) scale({size / units} {-size / units})">' + ''.join(paths) + '</g>'


favicon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#f4d977"/>' + lettering('к.', 8, 46, 48) + '</svg>\n'
(root / 'apps/web/public/favicon.svg').write_text(favicon, encoding='utf-8')

# Reuse our original vector illustration; keep the cups and bag identical to the hero.
source = (root / 'apps/web/src/components/ClubHero.tsx').read_text(encoding='utf-8')
illustration = re.search(r'(<g fill="none".*?</g>)', source, re.S).group(1)
for old, new in [('strokeWidth', 'stroke-width'), ('strokeLinecap', 'stroke-linecap'),
                 ('strokeLinejoin', 'stroke-linejoin'), ('fontFamily', 'font-family'),
                 ('fontWeight', 'font-weight'), ('fontSize', 'font-size'), ('textAnchor', 'text-anchor')]:
    illustration = illustration.replace(old, new)
illustration = re.sub(r'<text.*?</text>', '', illustration, flags=re.S)
illustration = illustration.replace('var(--butter)', '#f4d977').replace('currentColor', '#2244c8')
illustration += lettering('к.', 423, 197, 38, '#f4d977')
social = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f4d977"/><rect x="24" y="24" width="1152" height="582" fill="none" stroke="#2244c8" stroke-width="3"/>'
social += lettering('кварта', 58, 94, 46)
social += lettering('Утро лучше,', 58, 225, 64)
social += lettering('когда есть', 58, 305, 64)
social += lettering('кофе.', 58, 385, 64)
social += lettering('ЧЕТВЕРГ — ОБЖАРКА', 58, 500, 19)
social += lettering('ПЯТНИЦА — ДОСТАВКА', 58, 535, 19)
social += '<g transform="translate(605 130) scale(.86)">' + illustration + '</g></svg>\n'
(root / 'apps/web/public/images/social-club.svg').write_text(social, encoding='utf-8')
print('Club SVG favicon and social artwork prepared.')
