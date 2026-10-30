import importlib.util
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from PIL import Image, ImageFont

spec = importlib.util.spec_from_file_location('social_cards', Path(__file__).parents[1] / 'social_cards.py')
cards = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cards)
FONT_DIR = Path(os.environ.get('SOCIAL_CARD_FONT_DIR', '/usr/share/fonts/truetype/dejavu'))
CONFIG = {'base_url': 'https://example.com', 'author': 'Rohan Verma', 'description': 'Site bio'}


def document(image='https://example.com/images/social-card.png'):
    return '<html><head>' + ''.join(cards.meta_tag(k, v) for k, v in {
        'og:type': 'article', 'og:title': 'A title with "quotes" & <brackets>',
        'og:description': 'Site bio', 'description': 'Site bio',
        'og:image': image, 'twitter:image': image, 'article:published_time': '2026-10-30',
    }.items()) + '</head><body><div class="text-body" data-prose><pre><p>Ignore code</p></pre><p>A useful <em>opening</em> with &amp; context.</p><table><tr><td><p>Ignore table</p></td></tr></table></div></body></html>'


class SocialCardsTest(unittest.TestCase):
    def test_prose_excludes_code_and_tables(self):
        self.assertEqual(cards.Page(document()).paragraphs, ['A useful opening with & context.'])

    def test_meta_escaping_and_duplicate_removal(self):
        source = '<head><meta name="description" content="old"><meta name="description" content="duplicate"></head><body>unchanged</body>'
        result = cards.update_head(source, {'description': 'Quotes " & <tags>'})
        self.assertEqual(cards.Page(result).meta['description'], 'Quotes " & <tags>')
        self.assertEqual(result.count('name="description"'), 1)
        self.assertTrue(result.endswith('<body>unchanged</body>'))

    def test_minified_html_without_closing_head(self):
        source = '<head><meta name=description content="old"><body><p>Text</p>'
        result = cards.update_head(source, {"description": "Context", "twitter:card": "summary_large_image"})
        self.assertEqual(cards.Page(result).meta["description"], "Context")
        self.assertLess(result.index("twitter:card"), result.index("<body>"))

    def test_minified_paragraphs_with_omitted_end_tags(self):
        source = '<div class=text-body><p>First <a href=/link>paragraph</a>.<p>Second paragraph.<pre>Ignore code</pre><p>Third paragraph.</div>'
        self.assertEqual(cards.Page(source).paragraphs,
                         ['First paragraph.', 'Second paragraph.', 'Third paragraph.'])

    def test_generated_card_and_fresh_url_after_edit(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)
            page = output / 'blog/example/index.html'
            page.parent.mkdir(parents=True)
            page.write_text(document())
            self.assertEqual(cards.build(output, CONFIG, FONT_DIR), 1)
            meta = cards.Page(page.read_text()).meta
            self.assertEqual(meta['description'], 'A useful opening with & context.')
            self.assertEqual(meta['og:image'], meta['twitter:image'])
            image = output / meta['og:image'].removeprefix('https://example.com/')
            with Image.open(image) as png:
                self.assertEqual(png.size, (1200, 630))
                self.assertEqual(png.format, 'PNG')
            original = meta['og:image']
            cards.build(output, CONFIG, FONT_DIR)
            self.assertEqual(cards.Page(page.read_text()).meta['og:image'], original)
            page.write_text(document().replace('A useful', 'An edited'))
            cards.build(output, CONFIG, FONT_DIR)
            self.assertNotEqual(cards.Page(page.read_text()).meta['og:image'], original)

    def test_custom_image_and_description_are_preserved(self):
        with tempfile.TemporaryDirectory() as directory:
            page = Path(directory) / 'blog/custom/index.html'
            page.parent.mkdir(parents=True)
            page.write_text(document('https://example.comhttps://cdn.example.com/photo.jpg').replace('Site bio', 'A chosen description'))
            with patch.object(cards, 'render_card') as render:
                cards.build(Path(directory), CONFIG, FONT_DIR)
                render.assert_not_called()
            meta = cards.Page(page.read_text()).meta
            self.assertEqual(meta['twitter:image'], 'https://cdn.example.com/photo.jpg')
            self.assertEqual(meta['description'], 'A chosen description')

    def test_long_titles_and_unbroken_words_fit(self):
        for title in ['An unusually long title ' * 20, 'LongIdentifier' * 40]:
            font, lines = cards.fit(title, FONT_DIR, 'DejaVuSans-Bold.ttf', range(60, 35, -2), 1072, 3)
            self.assertLessEqual(len(lines), 3)
            self.assertTrue(all(font.getlength(line) <= 1072 for line in lines))


if __name__ == '__main__':
    unittest.main()
