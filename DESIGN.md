# Design System Quick Reference

> **Philosophy:** Developer's Notebook (light) × Vintage Terminal (dark)
> Minimal, functional, memorable. Monospace everything.

## 🎨 Color Tokens

### Light Mode - Notebook Ink
```
Text:   #1e1e1e → #525252 → #737373
Paper:  #f7f5f0 (cream) | #eae7df (shadow)
Accent: #1a4d7a (blue-black ink)
Lines:  #e8a5a5 (red margin) | rgba(180,160,140,0.25) (ruled)
```

### Dark Mode - Amber Terminal
```
Text:   #ffb000 → #ff9500 → #cc7a00
Screen: #000000 (pure black)
Accent: #ffcc00 (bright amber)
FX:     text-shadow glow + scanlines + flicker
```

## 📝 Typography

```scss
Display: "Courier Prime"     // Typewriter headings
Body:    "IBM Plex Mono"     // Refined monospace
Never:   Inter, Roboto, Arial, System fonts
```

**Rules:**
- Everything monospace
- Line height: 1.8 (matches ruled lines)
- Letter spacing: -0.02em on headings
- Blinking cursor after h1: `▌`

## ✨ Signature Elements

### Notebook (Light)
- Red margin line at 60px
- Horizontal ruled lines every 1.6rem
- Hole punches (3 circles, top-left)
- Post-it note for "What I'm Up To" (yellow gradient + rotation)
- Notebook tape on avatar corner

### Terminal (Dark)
- CRT scanlines (2px repeating)
- Text glow effect
- Flicker animation (0.98 ↔ 1.0 opacity)
- Terminal window with `● ● ●` buttons
- Amber phosphor (NOT green - unique!)

## 🔤 Text Annotations

```
Brand:     $ ~/rhnvrm
Active:    >> Home
Hover:     [ Home ]
Sections:  [1], [2], [3]
H3:        > Title
Lists:     ☐ Item
```

## 🎨 Icons & Graphics

**Icon Library:** Lucide Icons (https://lucide.dev)

```scss
.feature-icon {
  width: 48px;
  height: 48px;
  color: var(--c-accent);           // Blue-black ink (light)
  stroke-width: 1.5;                // Clean, line-based

  [data-theme="dark"] & {
    color: var(--c-text-main);      // Amber (dark)
    filter: drop-shadow(0 0 2px var(--c-glow));  // Phosphor glow
  }
}
```

**Icon Usage:**
- `pen-line` - Writing/Blog
- `flask-conical` - Projects/Experiments
- `train-front` - Travel
- Browse more at lucide.dev

**Why Lucide?**
- Clean, line-based (fits monospace aesthetic)
- Actively maintained (vs Feather Icons)
- Inherits color via CSS (theme-friendly)
- Professional (vs AI-generated sketches)

## 🚫 Avoid

- AI-generated SVGs (inconsistent quality)
- Custom hand-drawn icons (hard to maintain)
- Generic fonts (Inter, Roboto)
- Green terminal text (use amber)
- Modern blur/shadows
- Excessive rounded corners
- Sans-serif typography
- Flashy animations

## 📏 Key Variables

```scss
--margin-left: 60px          // Red margin offset
--line-height-loose: 1.8     // Matches ruled lines
--font-display: "Courier Prime"
--font-mono: "IBM Plex Mono"
--max-content: 680px
```

## 🎯 Testing Checklist

```
[ ] Both light/dark modes work
[ ] Typography is all monospace
[ ] Icons render correctly (Lucide initialized)
[ ] Icon colors: blue-black (light), amber glow (dark)
[ ] Animations: cursor blink, flicker, scanlines
[ ] Navigation: terminal brackets on hover
[ ] Post-it (light) / Terminal window (dark)
[ ] Red margin line visible (light only)
[ ] Amber glow effect (dark only)
```

## 💡 Quick Wins

**Adding new sections?**
- Use `[1]`, `[2]` numbering in margin (CSS counter)
- H2: UPPERCASE with double border
- H3: `>` prefix

**New interactive elements?**
- Hover: Show terminal brackets `[ ]`
- Active: Show prompt `>>`
- Links: Ink underline + typewriter highlight

**Color choices?**
- Light: Blue-black ink (#1a4d7a)
- Dark: Bright amber (#ffcc00)
- Never: Pure blues, greens, purples

---

**Remember:** This is a developer's personal notebook, not a corporate website. Keep it raw, authentic, and nostalgic.
