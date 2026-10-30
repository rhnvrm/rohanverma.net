#!/usr/bin/env python3
"""Add contextual social metadata and PNG cards to a rendered Zola site."""
import argparse
import hashlib
import html
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import tomllib
from urllib.parse import urljoin, urlsplit

from PIL import Image, ImageDraw, ImageFont


SIZE = (1200, 630)
META = re.compile(r'''<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>''', re.IGNORECASE)
VERSION = '1'


def clean(text):
    return ' '.join(text.replace('\u2014', ', ').replace('\u2013', '-').split())


def excerpt(text, limit=210):
    text = clean(text)
    if len(text) <= limit:
        return text
    return text[:limit - 1].rsplit(' ', 1)[0].rstrip('.,;:') + '…'


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.paragraphs = []
        self.in_head = False
        self.in_prose = False
        self.prose_depth = 0
        self.stack = []
        self.paragraph = None
        self.feed(source)

    def finish_paragraph(self):
        if self.paragraph is not None:
            self.paragraphs.append(clean(''.join(self.paragraph)))
            self.paragraph = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        # Minified HTML also omits </p> before the next block element.
        if tag in ('p', 'div', 'pre', 'table', 'figure', 'aside', 'ul', 'ol',
                   'li', 'blockquote', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self.finish_paragraph()
        if tag == 'head':
            self.in_head = True
        elif tag == 'body':
            self.in_head = False
        if tag == 'meta' and self.in_head:
            self.meta[attrs.get('property', attrs.get('name', ''))] = attrs.get('content', '')
        if tag == 'div':
            if 'text-body' in attrs.get('class', '').split():
                self.in_prose = True
            if self.in_prose:
                self.prose_depth += 1
        if self.in_prose:
            if tag in ('pre', 'table', 'figure', 'script', 'style', 'aside'):
                self.stack.append(tag)
            if tag == 'p' and not self.stack:
                self.paragraph = []

    def handle_endtag(self, tag):
        if tag == 'head':
            self.in_head = False
        if self.in_prose:
            if tag in ('p', 'div', 'li', 'blockquote'):
                self.finish_paragraph()
            if self.stack and tag == self.stack[-1]:
                self.stack.pop()
            if tag == 'div':
                self.prose_depth -= 1
                if not self.prose_depth:
                    self.in_prose = False

    def handle_data(self, data):
        if self.paragraph is not None and not self.stack:
            self.paragraph.append(data)


def wrap(text, font, width):
    """Wrap by rendered width, including individual long URLs and identifiers."""
    lines = []
    line = ''
    for word in clean(text).split():
        candidate = f'{line} {word}'.strip()
        if font.getlength(candidate) <= width:
            line = candidate
            continue
        if line:
            lines.append(line)
        line = ''
        for char in word:
            if line and font.getlength(line + char) > width:
                lines.append(line)
                line = ''
            line += char
    if line:
        lines.append(line)
    return lines


def fit(text, font_dir, filename, sizes, width, max_lines):
    for size in sizes:
        font = ImageFont.truetype(str(font_dir / filename), size)
        lines = wrap(text, font, width)
        if len(lines) <= max_lines:
            return font, lines
    lines = lines[:max_lines]
    while font.getlength(lines[-1] + '…') > width:
        lines[-1] = lines[-1][:-1]
    lines[-1] = lines[-1].rstrip() + '…'
    return font, lines


def render_card(target, title, description, author, date, domain, font_dir):
    image = Image.new('RGB', SIZE, '#fffdf8')
    draw = ImageDraw.Draw(image)
    ink, muted, accent = '#1a1a1a', '#6f665f', '#c44536'
    mono = ImageFont.truetype(str(font_dir / 'DejaVuSansMono.ttf'), 23)
    small = ImageFont.truetype(str(font_dir / 'DejaVuSans.ttf'), 23)
    draw.rectangle((0, 0, 1199, 11), fill=accent)
    draw.text((64, 52), '~/rhnvrm', font=mono, fill=accent)
    label = 'NOTES / BLOG'
    draw.text((1136 - mono.getlength(label), 52), label, font=mono, fill=muted)
    draw.line((64, 105, 1136, 105), fill='#e7e0d8', width=2)
    font, lines = fit(title, font_dir, 'DejaVuSans-Bold.ttf', range(60, 35, -2), 1072, 3)
    y = 140
    for line in lines:
        draw.text((64, y), line, font=font, fill=ink, anchor='lt')
        y += font.size + 12
    font, lines = fit(description, font_dir, 'DejaVuSans.ttf', [28, 26, 24], 1050, 3)
    y = max(370, y + 22)
    for line in lines:
        draw.text((64, y), line, font=font, fill=muted, anchor='lt')
        y += font.size + 10
    draw.line((64, 534, 1136, 534), fill='#e7e0d8', width=2)
    byline = author + (f'  /  {date[:10]}' if date else '')
    draw.text((64, 560), byline, font=small, fill=ink)
    draw.text((1136 - small.getlength(domain), 560), domain, font=small, fill=accent)
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, optimize=True)


def meta_tag(key, value):
    attr = 'property' if key.startswith(('og:', 'article:')) else 'name'
    return f'<meta {attr}="{key}" content="{html.escape(value, quote=True)}">'


def update_head(source, values):
    # Zola's minifier omits optional closing head tags.
    boundary = re.search(r'</head\s*>|<body(?:\s|>)', source, re.IGNORECASE)
    if boundary is None:
        raise ValueError('Rendered page has no head/body boundary')
    head_end = boundary.start()
    head, body = source[:head_end], source[head_end:]
    remaining = dict(values)

    def replace(match):
        parsed = Page('<head>' + match[0] + '</head>')
        key = next(iter(parsed.meta), None)
        if key not in values:
            return match[0]
        if key not in remaining:
            return ''
        return meta_tag(key, remaining.pop(key))

    head = META.sub(replace, head)
    return head + ''.join(meta_tag(k, v) for k, v in remaining.items()) + body


def build(output, config, font_dir):
    base = config['base_url'].rstrip('/') + '/'
    author = clean(config['author'])
    assets = config.get('extra', {}).get('doordarshan', {}).get('assets', {})
    defaults = {
        urljoin(base, assets.get('social_image', 'images/social-card.png').lstrip('/')),
        urljoin(base, config.get('extra', {}).get('social_image', 'images/social-card.png').lstrip('/')),
    }
    count = 0
    for path in sorted((output / 'blog').rglob('*.html')):
        source = path.read_text()
        page = Page(source)
        meta = page.meta
        if meta.get('og:type') != 'article' or not meta.get('article:published_time'):
            continue
        title = clean(meta['og:title'])
        description = meta.get('og:description', '')
        if not description or description == config.get('description'):
            description = ' '.join(p for p in page.paragraphs if p)
        description = excerpt(description or title)
        values = {'description': description, 'og:description': description, 'twitter:description': description}
        image_url = meta.get('og:image', '')
        # Explicit per-post images take precedence over generated cards.
        generated = re.fullmatch(re.escape(base) + r'social-cards/[0-9a-f]{20}\.png', image_url)
        if not image_url or image_url in defaults or generated:
            date = meta['article:published_time']
            domain = urlsplit(base).netloc
            data = [VERSION, title, description, author, date, domain]
            key = hashlib.sha256(json.dumps(data, ensure_ascii=False).encode()).hexdigest()[:20]
            relative = f'social-cards/{key}.png'
            render_card(output / relative, title, description, author, date, domain, font_dir)
            image_url = urljoin(base, relative)
            values.update({'og:image:width': '1200', 'og:image:height': '630', 'og:image:type': 'image/png',
                           'og:image:alt': title + ' by ' + author, 'twitter:image:alt': title + ' by ' + author})
            count += 1
        else:
            # The theme concatenates base_url with overrides, including absolute URLs.
            if image_url.startswith(base.rstrip('/')):
                suffix = image_url[len(base.rstrip('/')):]
                if suffix.startswith('http') or not suffix.startswith('/'):
                    image_url = suffix
            image_url = urljoin(base, image_url)
        values.update({'og:image': image_url, 'twitter:image': image_url, 'twitter:card': 'summary_large_image'})
        path.write_text(update_head(source, values))
    print(f'Generated {count} contextual blog social cards.')
    return count


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path('public'))
    parser.add_argument('--config', type=Path, default=Path('config.toml'))
    parser.add_argument('--font-dir', type=Path, default=Path(os.environ.get('SOCIAL_CARD_FONT_DIR', '/usr/share/fonts/truetype/dejavu')))
    args = parser.parse_args()
    if not (args.output / 'index.html').is_file():
        parser.error('Build the site with Zola first.')
    build(args.output, tomllib.loads(args.config.read_text()), args.font_dir)
