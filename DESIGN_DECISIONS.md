# Design Decisions Log

This document explains **why** specific design choices were made, not just **what** they are.

## Core Philosophy Decisions

### Q: Why notebook + terminal aesthetic?
**A:** To create a memorable, authentic developer identity that:
- Reflects actual workflow (writing notes + using terminal)
- Avoids generic "modern SaaS" look
- Appeals to technical audience
- Creates nostalgic connection to analog/retro computing

### Q: Why two completely different themes instead of just dark/light variants?
**A:** Each theme tells a complete story:
- **Light mode** = Personal notebook where ideas are born
- **Dark mode** = Production environment where code runs
- They're not just inverted colors; they're different mental states
- Creates surprise and delight when switching

## Color Decisions

### Q: Why amber terminal instead of green?
**A:** Differentiation and authenticity:
- Green terminals are overused in dev portfolios
- Amber (VT220) is equally authentic but stands out
- Warmer color feels less "hacker movie" cliché
- Better color contrast with black background

### Q: Why blue-black ink instead of pure black?
**A:** Matches real fountain pen ink:
- More authentic to physical notebooks
- Softer on eyes than #000000
- Creates visual warmth
- Professional yet personal

### Q: Why cream paper instead of pure white?
**A:** Aged, worn aesthetic:
- Pure white feels too clinical/digital
- Cream (#f7f5f0) suggests used notebook
- Warmer tone is easier to read long-form
- Matches the "digital scrapbook" metaphor

## Typography Decisions

### Q: Why monospace for everything?
**A:** Consistency and authenticity:
- Notebooks often use ruled lines with consistent spacing
- Terminals are always monospace
- Creates unified visual rhythm
- Sets expectation: this is a technical site

### Q: Why IBM Plex Mono instead of JetBrains Mono?
**A:** Balance of readability and character:
- JetBrains Mono too expected for dev sites
- IBM Plex Mono has better hinting for web
- More refined, professional look
- Distinctive but not distracting

### Q: Why Courier Prime for headings?
**A:** Authentic typewriter feel:
- Real typewriters used Courier
- Pairs well with IBM Plex Mono
- Bold weight creates hierarchy
- Nostalgia factor for 80s/90s computing

### Q: Why line-height 1.8?
**A:** Mathematical alignment:
- Matches ruled line spacing (1.6rem)
- Creates visual rhythm across entire page
- Comfortable reading for long content
- Looks like actual lined paper

## Interactive Element Decisions

### Q: Why terminal brackets [ ] on hover instead of underlines?
**A:** Reinforces terminal metaphor:
- Familiar to developers (shell syntax)
- Subtle but clear feedback
- Doesn't interfere with text
- Consistent with `>> ` active state

### Q: Why blinking cursor on h1?
**A:** Multiple benefits:
- Suggests "actively being written"
- Creates subtle animation without being distracting
- Terminal/editor metaphor
- Indicates this is a living document

### Q: Why > prefix on h3?
**A:** Visual hierarchy and metaphor:
- Markdown/quote syntax familiar to devs
- Creates indentation without nested lists
- Notebook annotation style
- Terminal prompt reference

### Q: Why checkboxes ☐ in "What I'm Up To"?
**A:** To-do list metaphor:
- Suggests work in progress
- Familiar notebook pattern
- Interactive feel (even though static)
- Humanizes the content

## Layout Decisions

### Q: Why red margin line at 60px?
**A:** Classic notebook convention:
- Universal recognition factor
- Creates natural whitespace
- Suggests "notes" vs "formal content"
- Nostalgic trigger for school/work notebooks

### Q: Why hole punches visible?
**A:** Physical notebook details:
- Reinforces analog metaphor
- Adds playful detail
- Suggests this is part of larger collection
- Hidden in dark mode (terminals don't have them)

### Q: Why post-it note for "What I'm Up To"?
**A:** Ephemeral content metaphor:
- Post-its are temporary notes
- "What I'm Up To" changes frequently
- Yellow color creates visual break
- Slight rotation adds personality

### Q: Why terminal window in dark mode for "What I'm Up To"?
**A:** Running process metaphor:
- Content represents current tasks
- Terminal window = active execution
- Window buttons suggest this is "open"
- Maintains dark mode consistency

### Q: Why 680px max-width instead of wider?
**A:** Optimal reading experience:
- 75ch = ~680px at base font size
- Matches notebook page proportions
- Comfortable for long-form reading
- Feels more personal than wide layouts

## Animation Decisions

### Q: Why CRT flicker instead of static text?
**A:** Authenticity to vintage terminals:
- Real CRTs had refresh rates causing flicker
- Subtle (0.98 ↔ 1.0) doesn't cause eye strain
- Creates "alive" feeling
- Differentiates from static websites

### Q: Why scanlines every 2px?
**A:** CRT accuracy without distraction:
- Real CRTs had visible scan lines
- 2px spacing is subtle but visible
- Creates texture without reducing readability
- Combined with flicker = authentic CRT feel

### Q: Why slow blink (1s) on cursor?
**A:** Comfortable rhythm:
- Real terminal cursors blink ~1Hz
- Fast blink (0.5s) is distracting
- Slow blink is ambient detail
- Matches writing pace

## Icon Decisions

### Q: Why Lucide Icons instead of custom SVGs?
**A:** Maintainability and quality:
- AI-generated SVGs have inconsistent quality
- Custom icons require design skills to maintain
- Lucide is actively maintained by open-source community
- 1000+ icons available for future needs
- Clean, line-based style fits monospace aesthetic

### Q: Why Lucide instead of Font Awesome or Material Icons?
**A:** Better fit for our aesthetic:
- Font Awesome has too many styles (confusing)
- Material Icons too corporate/Google-branded
- Lucide icons are minimal, line-based (like terminal graphics)
- Fork of Feather Icons with more icons + better maintenance
- No font loading (uses inline SVG)

### Q: Why 48px icon size?
**A:** Balance and rhythm:
- Large enough to be recognizable
- Matches heading sizes proportionally
- Fits within notebook line spacing (1.6rem × 3)
- Not too dominant (icons support text, not replace it)

### Q: Why glow effect on dark mode icons?
**A:** CRT phosphor authenticity:
- Real amber CRT monitors had phosphor bloom
- `drop-shadow` creates subtle glow without blur
- Differentiates from light mode (which has no glow)
- Makes icons feel "lit up" like terminal graphics

### Q: Why stroke-width 1.5 instead of default?
**A:** Consistency with typography:
- Default stroke (2) too bold vs IBM Plex Mono
- 1.5 matches font weight better
- Creates visual harmony between text and icons
- Notebook drawings are thin lines, not thick markers

## Component Decisions

### Q: Why numbered sections [1], [2], [3]?
**A:** Notebook organization:
- How people actually number notebook sections
- Creates clear visual hierarchy
- Easy to reference ("see section 2")
- Adds structure without complexity

### Q: Why dashed borders instead of solid?
**A:** Visual weight:
- Solid borders too heavy
- Dashed = notebook divider lines
- Creates separation without walls
- Softer, more approachable

### Q: Why double border on h2?
**A:** Typewriter underline:
- Old typewriters used ===== for emphasis
- Creates stronger hierarchy than single line
- Matches terminal output style
- Distinctive heading treatment

## Technical Decisions

### Q: Why CSS animations instead of JavaScript?
**A:** Performance and simplicity:
- CSS animations are GPU-accelerated
- No JavaScript dependencies
- Works even if JS fails/disabled
- Simpler to maintain

### Q: Why Google Fonts instead of self-hosting?
**A:** CDN benefits:
- Likely already cached by users
- Automatic optimization
- No build step required
- Easy to update fonts

### Q: Why SCSS instead of CSS-in-JS?
**A:** Static site benefits:
- Generated CSS is smaller
- Better caching
- No runtime cost
- Clearer separation of concerns

## Anti-Patterns We Avoided

### Why NO green terminal?
- Too common in dev portfolios
- Hackerman movie cliché
- Amber is equally authentic

### Why NO gradient backgrounds everywhere?
- Distracts from content
- Feels "2010s startup"
- Reserved for post-it note accent

### Why NO blur effects?
- Notebooks don't blur
- Terminals don't blur
- Reduces performance
- Feels too "modern UI"

### Why NO rounded corners everywhere?
- Notebooks have sharp edges
- Terminals are rectangular
- Reserved for specific elements (avatar, post-it)

### Why NO Inter/Roboto fonts?
- Generic, seen everywhere
- No character or personality
- Breaks monospace consistency

### Why NO AI-generated sketch icons?
- Quality inconsistent between icons
- Hard to modify or extend
- Look amateurish up close
- Difficult to theme (colors baked in)
- No standardization across icons

### Why NO icon fonts?
- FOUC (flash of unstyled content)
- Can't multicolor or gradient
- Accessibility issues (screen readers)
- Harder to customize
- Extra font file to load

### Why NO hover scale/bounce effects?
- Too "web 2.0"
- Doesn't match notebook metaphor
- Prefer subtle color/bracket changes

## Future Considerations

### What if we add more colors?
- Only if they support notebook/terminal metaphor
- Example: Pencil grey for drafts, red for corrections
- Never: Purple, pink, bright blue (too modern)

### What if content needs highlighting?
- Light: Yellow highlighter (rgba overlay)
- Dark: Bright amber (text-decoration)
- Keep it marker/terminal-like

### What if we need more hierarchy?
- Add more terminal symbols: *, #, @, etc.
- Use indent levels
- Maintain monospace consistency

### What if we need tables/data?
- ASCII-art style borders
- Monospace alignment
- Keep terminal aesthetic

---

## Principles Summary

1. **Authenticity over trends** - Real notebook/terminal details, not modern UI
2. **Consistency over variety** - Monospace everywhere, limited color palette
3. **Metaphor over decoration** - Every element reinforces notebook or terminal
4. **Subtlety over spectacle** - Animations are ambient, not attention-seeking
5. **Function over form** - But form supports function through metaphor

**Remember:** These aren't arbitrary aesthetic choices. Every decision reinforces the developer's notebook × terminal identity.
