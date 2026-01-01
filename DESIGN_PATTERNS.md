# Design Pattern Examples

Visual references for maintaining the notebook × terminal aesthetic.

## 📓 Light Mode: Notebook Pattern

```
┌────────────────────────────────────────────────────────┐
│ ●  ←── Hole punches (3 circles)                        │
│ ●                                                       │
│ ●                                                       │
│                                                         │
│ │  ←── Red margin line (60px)                          │
│ │                                                       │
│ │  Rohan Verma▌  ←── Blinking cursor after h1         │
│ │  ─────────────────────────────────────── ←── Ruled   │
│ │  Hello World 👋                            lines     │
│ │  ───────────────────────────────────────  (1.6rem)   │
│ │  I'm a Software Engineer...                          │
│ │  ─────────────────────────────────────────           │
│ │                                                       │
│ │  WRITING ON SYSTEMS & SELF  ←── H2: UPPERCASE        │
│ │  ═══════════════════════════  double border          │
│ │                                                       │
│ │  [1] ←── Section numbering                           │
│ │  > Introduction  ←── H3 with > prefix                │
│ │                                                       │
│ └─────────────────────────────────────┐                │
│   What I'm Up To                     │  ←── Post-it    │
│                                       │     (rotated    │
│   ☐ Task one                          │      -0.5deg)  │
│   ☐ Task two                          │                │
│   ────────────────────────────────────│                │
│   Last updated: Jan 20, 2025          │                │
│ ──────────────────────────────────────┘                │
└────────────────────────────────────────────────────────┘
```

## 💻 Dark Mode: Terminal Pattern

```
┌────────────────────────────────────────────────────────┐
│ ════════════════════════════════════ ←── CRT scanlines │
│ ════════════════════════════════════  (2px repeating)  │
│                                                         │
│ $ ~/rhnvrm  ←── Terminal prompt                        │
│                                                         │
│ >> Home  [ Blog ]  [ Projects ]  ←── Nav with brackets │
│                                                         │
│ Rohan Verma▌  ←── Text glow effect                     │
│ ────────────                                            │
│ Hello World 👋                                          │
│ ────────────                                            │
│ I'm a Software Engineer... (glowing amber text)         │
│ ────────────                                            │
│                                                         │
│ WRITING ON SYSTEMS & SELF                               │
│ ═════════════════════════                               │
│                                                         │
│ ╔═══════════════════════════════╗                      │
│ ║ ● ● ●  ←── Terminal buttons  ║                      │
│ ║ ─────────────────────────────║                      │
│ ║ $ What I'm Up To              ║  ←── Terminal window │
│ ║                               ║                      │
│ ║ ☐ Task one                    ║                      │
│ ║ ☐ Task two                    ║                      │
│ ║ ───────────────────────────   ║                      │
│ ║ Last updated: Jan 20, 2025    ║                      │
│ ╚═══════════════════════════════╝                      │
│                                                         │
│ ════════════════════════════════════  ←── Scanlines    │
└────────────────────────────────────────────────────────┘
     ^                                    ^
     Flicker animation              Text glow
     (0.98 ↔ 1.0 opacity)          (shadow: 0 0 2px amber)
```

## 🔤 Typography Hierarchy

```
┌─────────────────────────────────────────┐
│                                         │
│  H1: Rohan Verma▌                       │
│      Courier Prime, 1.875rem            │
│      Blinking cursor                    │
│                                         │
│  WRITING ON SYSTEMS & SELF              │
│  ═════════════════════════              │
│  H2: Courier Prime, 1.0625rem           │
│      UPPERCASE + double border          │
│                                         │
│  > Introduction to the Design           │
│    H3: Courier Prime, 1.0625rem         │
│        > prefix in accent color         │
│                                         │
│  Body text in IBM Plex Mono             │
│  Line height: 1.8 matching lines        │
│  Size: 0.9375rem (15px)                 │
│                                         │
└─────────────────────────────────────────┘
```

## 🎯 Interactive States

### Navigation Links
```
Default:    Home
Hover:      [ Home ]
Active:     >> Home
Focus:      [Home]  (with dotted outline)
```

### Call-to-Action Links
```
Default:    Dive into Essays
Hover:      Dive into Essays →  (arrow moves right)
            ──────────────────
            Ink underline + typewriter highlight
```

### Brand Logo
```
Default:    $ ~/rhnvrm
Hover:      $ ~/rhnvrm_  (cursor blinks)
```

## 📐 Spacing & Layout

```
Container Width:    680px (--max-content)
Text Measure:       75ch
Margin Left:        60px (red line in light mode)
Line Spacing:       1.6rem (ruled lines)
Section Padding:    var(--space-lg) = 2.2rem
```

## 🎨 Color Usage Examples

### Light Mode Links
```
Link:  I built a [thing](url) for developers
       ────────  ↑ Blue-black underline (#1a4d7a)

Hover: I built a [thing](url) for developers
       ▓▓▓▓▓▓▓▓▓  ↑ Typewriter highlight (light blue-black)
```

### Dark Mode Links
```
Link:  Check out my [project](url) here
       ─────────────  ↑ Amber underline (#ffcc00)
                      ↑ Text glows: 0 0 2px amber

Hover: Check out my [project](url) here
       ▒▒▒▒▒▒▒▒▒▒▒▒▒  ↑ Bright amber + stronger glow
```

## 📦 Component Examples

### Feature Cards with Icons

#### Light Mode (Notebook)
```
┌─────────────────────────────────────┐
│                                     │
│          ╱╲                         │  ←── Icon: pen-line
│         ╱  ╲  (48×48px)             │      (blue-black #1a4d7a)
│        ╱____╲                       │      stroke-width: 1.5
│                                     │
│   WRITING ON SYSTEMS & SELF         │
│   ═══════════════════════           │
│                                     │
│   Essays on infrastructure,         │
│   productivity, and the art         │
│   of building things.               │
│                                     │
│   Dive into Essays →                │
│                                     │
└─────────────────────────────────────┘
```

#### Dark Mode (Terminal)
```
┌─────────────────────────────────────┐
│                                     │
│          ╱╲                         │  ←── Icon: pen-line
│         ╱  ╲  (48×48px)             │      (amber #ffb000)
│        ╱____╲  ~~~                  │      + glow effect
│                                     │
│   WRITING ON SYSTEMS & SELF         │
│   ═══════════════════════           │
│                                     │
│   Essays on infrastructure,         │
│   productivity, and the art         │
│   of building things.               │
│                                     │
│   Dive into Essays →                │
│                                     │
└─────────────────────────────────────┘
```

### Icon Reference

**Current Icons:**
```
pen-line        ╱╲      Writing/Blog
               ╱  ╲
              ╱____╲

flask-conical   ⚗      Projects/Experiments
               ╱ ╲
              ╱───╲
             └─────┘

train-front    ▄▄▄     Travel
              ║███║
              ╚═╩═╝
```

### Feature Section
```
┌────────────────────────────────────┐
│ [1]  WRITING ON SYSTEMS & SELF     │  ←── Counter + H2
│      ══════════════════════        │
│                                    │
│      Essays on infrastructure...   │
│                                    │
│      Dive into Essays →            │
│ ────────────────────────────────── │  ←── Dashed separator
│ [2]  OPEN SOURCE & EXPERIMENTS     │
│      ══════════════════════        │
│      ...                           │
└────────────────────────────────────┘
```

### Code Block (both modes)
```
┌────────────────────────────────────┐
│ const hello = () => {              │
│   console.log("Hello World");      │
│ }                                  │
│                                    │
│ IBM Plex Mono                      │
│ Background: Light (#e5e2d8)        │
│             Dark  (#141408)        │
│ Border: 1px solid                  │
└────────────────────────────────────┘
```

## ⚡ Animation Details

### Cursor Blink (Light Mode)
```
@keyframes blink {
  0%, 49%:  ▌  (visible)
  50%, 100%:    (invisible)
}
Duration: 1s infinite
```

### CRT Flicker (Dark Mode)
```
@keyframes flicker {
  0%:   opacity: 0.98
  100%: opacity: 1.0
}
Duration: 0.15s infinite alternate
```

### Arrow Slide (CTAs)
```
Default:  →
Hover:    →  (translateX +4px)
Timing:   0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

## 🎭 Theme Comparison

```
┌─────────────────────┬─────────────────────┐
│   LIGHT (Notebook)  │   DARK (Terminal)   │
├─────────────────────┼─────────────────────┤
│ Cream paper         │ Pure black          │
│ Blue-black ink      │ Amber phosphor      │
│ Red margin line     │ No margin           │
│ Ruled lines         │ Scanlines           │
│ Hole punches        │ None                │
│ Post-it note        │ Terminal window     │
│ Blinking cursor     │ Text glow + flicker │
│ Tape on avatar      │ Sharp avatar        │
│ Dashed borders      │ Solid borders       │
└─────────────────────┴─────────────────────┘
```

## 🚀 Quick Implementation Guide

### Adding a New Section
```scss
.new-section {
  padding: var(--space-lg) 0;
  border-top: 2px dashed var(--c-border);

  h2 {
    text-transform: uppercase;
    border-bottom: 2px double var(--c-border-heavy);
  }

  // Add counter if needed
  counter-increment: section-counter;
  &::before {
    content: "[" counter(section-counter) "]";
    // position absolute, left margin
  }
}
```

### Adding Interactive Element
```scss
.interactive {
  transition: var(--transition);

  // Terminal brackets on hover
  &:hover::before {
    content: "[ ";
  }
  &:hover::after {
    content: " ]";
  }

  // Accent color
  &:hover {
    color: var(--c-accent);
  }
}
```

### Adding Lucide Icons
```html
<!-- In templates/base.html -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- In your template -->
<i data-lucide="pen-line" class="feature-icon"></i>
<i data-lucide="flask-conical" class="feature-icon"></i>
<i data-lucide="train-front" class="feature-icon"></i>

<!-- Initialize after DOM loads -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });
</script>
```

```scss
// In sass/components/_features.scss
.feature-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem auto;
  display: block;
  color: var(--c-accent);           // Blue-black ink (light)
  stroke-width: 1.5;                // Clean lines

  [data-theme="dark"] & {
    color: var(--c-text-main);      // Amber (dark)
    filter: drop-shadow(0 0 2px var(--c-glow, rgba(255, 176, 0, 0.3)));
  }
}
```

**Finding More Icons:**
- Browse: https://lucide.dev
- Search for: technical, developer, notebook themes
- Prefer: outline style (not solid)
- Avoid: overly decorative or busy icons

---

**Remember:** These patterns work together to create the notebook/terminal metaphor. Don't mix other visual languages!
