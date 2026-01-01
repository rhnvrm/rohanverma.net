# Project Context: rohanverma.net

## Overview
This is a static site built with **Zola** (Rust-based static site generator), using **Nix** for the development environment and **Just** as a command runner.

## Development Workflow

### 1. Environment Setup
The project uses `flake.nix` to provide all dependencies (Zola, Node.js, etc.).
- **Always** run commands via `just` or within `nix develop`.
- **Browser Automation:** Chrome DevTools MCP server is configured for browser automation and testing.
- **MCP Servers:** Chrome DevTools MCP server is available via the `mcp__chrome-devtools__*` tools.

### 2. Common Commands (Justfile)
- **Start Server:** `just serve`
    - Runs Zola server on port `1111` (default).
    - Accessible at `http://localhost:1111`.
    - **Note:** The server is most likely already running in a tmux session. Check with `tmux list-sessions` before starting a new instance.
- **Build Site:** `just build`
    - Output goes to `public/`.
- **Check Environment:** `just check`
    - Verifies Zola, Just, and Git versions.
- **Clean:** `just clean`
    - Removes `public/` directory.

### 3. Architecture & Key Files
- **Content:** `content/` (Markdown files)
- **Templates:** `templates/` (Tera templates)
- **Styles:** `sass/` (SCSS files)
- **Static Assets:** `static/`
- **Config:** `config.toml`

### 4. Testing & Verification
- **Manual Verification:** Since this is a static site, verify changes by running `just serve` and checking the output with `curl http://localhost:1111` or using Chrome DevTools MCP tools.
- **Browser Testing:** Use Chrome DevTools MCP tools (e.g., `mcp__chrome-devtools__navigate_page`, `mcp__chrome-devtools__take_snapshot`, `mcp__chrome-devtools__take_screenshot`) to verify visual and interactive elements.

## Rules for Agents
1. **Use `just`:** Prefer `just <command>` over raw `zola` commands to ensure the Nix environment is loaded.
2. **No Ghost Dependencies:** Do not assume tools are installed unless they are in `flake.nix`.
3. **Port 1111:** The server runs on port 1111 (Zola default).
4. **Tmux Sessions:** The dev server (`just serve`) is typically running in a tmux session. Before starting the server:
    - Check existing sessions: `tmux list-sessions`
    - Verify port availability: `ss -tlnp | grep :1111`
    - If the server is not running, start it in a tmux session for persistent operation.

---

## Design System & Aesthetic

### 📚 Documentation Index

**Quick Reference:**
- **DESIGN.md** - Quick reference card (colors, fonts, tokens)
- **DESIGN_PATTERNS.md** - Visual patterns and ASCII examples
- **DESIGN_DECISIONS.md** - Why we made specific choices

**Full documentation below** ⬇️

### Design Philosophy: Developer's Notebook × Terminal
This site uses a **dual aesthetic** approach:
- **Light Mode:** Authentic developer's notebook with ruled lines, red margin, typewriter fonts
- **Dark Mode:** Vintage CRT terminal with amber phosphor text, scanlines, and glow effects

**Core Principle:** Minimal, functional, and memorable. Avoid generic "modern web" aesthetics. Think: physical notebook meets retro computing.

### Color Palette

#### Light Mode (Notebook)
```scss
--c-text-main: #1e1e1e          // Near-black ink
--c-text-secondary: #525252      // Grey ink
--c-text-muted: #737373         // Faded writing
--c-bg-main: #f7f5f0            // Aged paper (warm cream)
--c-bg-alt: #eae7df             // Paper shadow
--c-accent: #1a4d7a             // Blue-black ink (classic fountain pen)
--c-accent-hover: #0d3557       // Darker ink
--c-margin-line: #e8a5a5        // Red margin line
--c-ruled-line: rgba(180, 160, 140, 0.25)  // Subtle ruled lines
```

#### Dark Mode (Terminal)
```scss
--c-text-main: #ffb000          // Amber phosphor (NOT green - be unique)
--c-text-secondary: #ff9500      // Dimmer amber
--c-bg-main: #000000            // Pure CRT black
--c-accent: #ffcc00             // Bright amber
--c-scanline: rgba(255, 176, 0, 0.02)  // CRT scanline effect
--c-glow: rgba(255, 176, 0, 0.4)       // Phosphor bloom
```

### Typography System

**Fonts:**
- **IBM Plex Mono** - Body text (refined monospace, better than generic fonts)
- **Courier Prime** - Headings (authentic typewriter feel)
- **NEVER use:** Inter, Roboto, Arial, system fonts (too generic)

**Key Typography Rules:**
1. **Everything is monospace** - maintains the notebook/terminal aesthetic
2. **Blinking cursor** after h1 titles (`▌` with CSS animation)
3. **H2 headings:** UPPERCASE with `2px double` border-bottom
4. **H3 headings:** Prefixed with `>` in accent color
5. **Line height:** 1.8 (matches ruled line spacing of 1.6rem)
6. **Letter spacing:** -0.02em on headings (typewriter compression)

### Key Design Patterns

#### 1. Notebook Elements (Light Mode)
- **Red margin line:** 60px from left edge (CSS gradient)
- **Horizontal ruled lines:** Every 1.6rem (matches line-height)
- **Hole punches:** Three circular shadows at top-left
- **Notebook tape:** Small rotated square on avatar corner
- **Post-it notes:** Yellow gradient with slight rotation for "What I'm Up To" section

#### 2. Terminal Elements (Dark Mode)
- **CRT scanlines:** 2px repeating gradient
- **Text glow:** `text-shadow: 0 0 2px var(--c-glow)`
- **Flicker effect:** Subtle opacity animation (0.98 ↔ 1.0)
- **Terminal window:** Border-top (24px) with control buttons `● ● ●`
- **Prompt indicators:**
  - Brand: `$ ~/rhnvrm`
  - Active nav: `>> Home`
  - Hover: `[ Home ]`

#### 3. Interactive Details
- **Links:** Blue-black ink underline with typewriter highlight on hover
- **Navigation:** Terminal brackets appear/disappear on hover/active states
- **Checkboxes:** `☐` before list items in "What I'm Up To"
- **Arrows:** Animated `→` on CTA links (translateX on hover)
- **Feature numbering:** `[1]`, `[2]`, `[3]` in left margin with counter

### CSS/SCSS Architecture

**File Structure:**
```
sass/
├── tokens/_variables.scss       # All design tokens, color palette
├── base/_reset.scss            # Base styles, notebook/terminal backgrounds
├── base/_typography.scss       # All typography, animations
├── layout/_header.scss         # Header, footer, nav
├── components/_links.scss      # Link styles
├── components/_navigation.scss # Nav with terminal prompts
├── pages/_homepage.scss        # Homepage-specific styles
└── utilities/_theme.scss       # Theme utilities, code blocks
```

**Key Variables to Maintain:**
- `--margin-left: 60px` - Red margin line offset (light mode only)
- `--line-height-loose: 1.8` - Matches ruled lines
- `--font-display: "Courier Prime"` - Typewriter headings
- `--font-mono: "IBM Plex Mono"` - Body text

### Icons & Graphics

**Icon Library:** Lucide Icons (https://lucide.dev)

**Integration:**
- CDN loaded in `templates/base.html`
- Initialized on DOM load with `lucide.createIcons()`
- Use `<i data-lucide="icon-name" class="feature-icon"></i>`

**Current Icons:**
- `pen-line` - Writing/Blog
- `flask-conical` - Projects/Experiments
- `train-front` - Travel

**Styling:**
- Size: 48×48px
- Light mode: Blue-black ink (`var(--c-accent)`)
- Dark mode: Amber with phosphor glow (`drop-shadow`)
- Stroke width: 1.5 (matches typography weight)

**Why Lucide:**
- Clean, line-based (fits monospace aesthetic)
- Actively maintained (1000+ icons available)
- Theme-friendly (inherits color via CSS)
- Professional quality (vs AI-generated SVGs)

### Design Principles for Future Changes

#### ✅ DO:
1. **Use monospace fonts everywhere** - consistency is key
2. **Add terminal-style annotations** - `$`, `>`, `>>`, `[ ]`, etc.
3. **Maintain notebook metaphor** - ruled lines, margins, numbered sections
4. **Use amber in dark mode** - NOT green (too common)
5. **Keep animations subtle** - blink, flicker, scanlines (not flashy)
6. **Add nostalgic details** - hole punches, tape, post-it notes, terminal buttons
7. **Test both light and dark modes** - they're equally important
8. **Use Lucide icons** - for any new icons needed (browse lucide.dev)

#### ❌ DON'T:
1. **Don't add shadows or blur effects** - notebooks and terminals don't have them
2. **Don't use rounded corners excessively** - keep it sharp and technical
3. **Don't introduce other color schemes** - stick to blue-black ink & amber phosphor
4. **Don't use sans-serif fonts** - breaks the monospace aesthetic
5. **Don't add gradients everywhere** - only for post-it note and CRT effects
6. **Don't make hover effects too "modern"** - keep them typewriter/terminal-like
7. **Don't converge on common font choices** - IBM Plex Mono & Courier Prime are distinctive
8. **Don't use AI-generated or custom SVGs** - inconsistent quality, hard to maintain
9. **Don't use icon fonts** - FOUC issues, accessibility problems

### Verification Checklist

Before committing design changes:
- [ ] Run `just build` to compile SCSS
- [ ] Test light mode - verify notebook aesthetic (paper, margin, ruled lines)
- [ ] Test dark mode - verify terminal aesthetic (scanlines, glow, amber text)
- [ ] Check typography - all text should be monospace
- [ ] Verify icons - Lucide initialized, correct colors (blue-black/amber), glow effect
- [ ] Verify animations - cursor blink, flicker effect working
- [ ] Test navigation - terminal brackets on hover/active
- [ ] Check "What I'm Up To" - post-it in light, terminal window in dark
- [ ] Screenshot both modes for comparison

### Inspiration & References

**Notebook Aesthetic:**
- Classic college-ruled notebooks with red margin
- Moleskine-style journals
- Developer's handwritten notes and sketches
- Typewriter output on physical paper

**Terminal Aesthetic:**
- VT100/VT220 terminals (amber phosphor)
- Vintage CRT monitors with scanlines
- DOS/Unix command prompts
- Hacker culture from the 1980s-90s

**Key Differentiator:** Most dev sites use green terminals - we use **amber** to stand out.
