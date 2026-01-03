---
name: site-dev
description: |
  Development skill for rohanverma.net Zola static site with retro Indian terminal aesthetic.
  Use when: editing styles, fixing responsive issues, adding pages, modifying templates.
  Keywords: zola, scss, css, mobile, responsive, template, design system, theme.
---

# Site Development

## Purpose

Guide development of rohanverma.net - a Zola static site with "Doordarshan meets Developer" aesthetic (retro Indian terminal design).

## Architecture

### Directory Structure
```
sass/
├── tokens/_variables.scss    # Design tokens, CSS custom properties
├── base/                     # Reset, typography base
├── components/               # Cards, tags, buttons, etc.
├── layout/_header.scss       # Header, footer, containers
├── utilities/_mobile.scss    # Responsive overrides
├── utilities/_helpers.scss   # Utility classes
└── pages/                    # Page-specific styles

templates/
├── base.html                 # Base template with theme toggle
├── index.html                # Homepage
├── blog.html                 # Blog listing
├── blog-page.html            # Single post
└── projects-*.html           # Project templates

static/
├── js/easter-eggs.js
└── images/
```

### CSS Custom Properties

**Colors** (defined in `_variables.scss`):
```scss
// Monotone
--c-text-primary: #1a1a1a;
--c-text-secondary: #555555;
--c-text-tertiary: #888888;
--c-bg: #fefefe;
--c-bg-subtle: #f8f8f8;
--c-border: #e8e8e8;

// Indian palette
--c-saffron: #FF9933;
--c-marigold: #EAA221;
--c-peacock: #006D77;
--c-magenta: #D81159;
--c-cream: #FFF8E7;
--c-henna: #8B4513;
--c-accent: #c44536;  // Terracotta
```

**Typography**:
```scss
--font-mono: "IBM Plex Mono", monospace;
--text-base: 1rem;
--text-sm: 0.875rem;
--text-lg: 1.125rem;
// ... up to --text-4xl: 2.5rem
```

**Spacing** (8px base scale):
```scss
--space-1: 0.25rem;  // 4px
--space-2: 0.5rem;   // 8px
--space-4: 1rem;     // 16px
--space-6: 1.5rem;   // 24px
--space-8: 2rem;     // 32px
// Legacy aliases: --space-xs, --space-sm, --space-md, --space-lg, --space-xl
```

**Layout**:
```scss
--max-width: 720px;
--container-padding: clamp(1rem, 5vw, 2rem);
```

### Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| max-width: 400px | Small mobile |
| max-width: 640px | Mobile (nav hides) |
| max-width: 768px | Mobile overrides |
| 769px-1024px | Tablet |

**Critical**: Mobile nav hides at 640px. Helper classes use same breakpoint.

### Dark Theme

Applied via `data-theme="dark"` on `:root` or `prefers-color-scheme: dark`:
```scss
@mixin dark-theme {
  --c-text-primary: #ffffff;
  --c-bg: #000000;
  --c-border: #2a2a2a;
  // ...
}
```

## Common Tasks

### Adding a New Page

1. Create content file: `content/{section}/{slug}.md`
2. Add frontmatter with title, description, date
3. Use existing template or create new in `templates/`

### Fixing Mobile Issues

1. Check `sass/utilities/_mobile.scss` for overrides
2. Verify CSS variable is defined in `_variables.scss`
3. Check selector specificity - broad selectors can override component styles
4. Test at 640px breakpoint (nav hide point)

### Adding a Component Style

1. Create/edit file in `sass/components/`
2. Use CSS variables for colors, spacing
3. Add mobile override in `_mobile.scss` if needed
4. Import in main.scss if new file

## Gotchas

### CSS Variable Undefined
Variables like `--c-ruled-line` may not exist. Always check `_variables.scss` before using.

### Selector Specificity
Broad selectors like `a, button { display: inline-flex }` can break component styles. Use `:not()` exclusions:
```scss
a:not(.tag):not(.special-class),
button {
  min-height: 44px;
}
```

### Mobile Nav Class
JavaScript toggles `.mobile-menu-open` class (not `.active`). CSS must match.

### Touch Targets
Mobile links need 44px min-height, but exclude inline elements like tags.

## Build & Preview

```bash
# Development server
zola serve

# Build for production
zola build
```

## Quick Reference

| Task | Location |
|------|----------|
| Change colors | `sass/tokens/_variables.scss` |
| Mobile overrides | `sass/utilities/_mobile.scss` |
| Header/nav | `sass/layout/_header.scss` |
| Base template | `templates/base.html` |
| Add page template | `templates/{name}.html` |
| Utility classes | `sass/utilities/_helpers.scss` |
