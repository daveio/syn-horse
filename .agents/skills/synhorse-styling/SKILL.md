---
name: synhorse-styling
description: "syn.horse design system reference - Tailwind v4 @theme tokens, the bespoke synhorse daisyUI theme, named component classes and CSS gotchas. ALWAYS use when editing app/assets/css/main.css, adding or changing classes on a .vue template, working with colours, type scale, spacing, glows, animations, keyframes or FX overlays, or implementing anything against _design/."
version: 1.0.0
---

# syn.horse styling

Tailwind CSS v4 + daisyUI 5 with a single bespoke `synhorse` theme. Everything lives in `app/assets/css/main.css`:

- the `@theme` block defines the design tokens (palette, type scale, spacing, easings, glows, animations)
- the `@plugin "daisyui/theme"` block maps daisyUI's semantic roles (`primary` → `hot`, `secondary` → `cool`, `accent` → `lilac`, `base-100/200/300` → the void scale) to those tokens
- built-in daisyUI themes are disabled (`themes: false`); `<html data-theme="synhorse">` is set in `nuxt.config.ts`

Templates use Tailwind utility classes for atomic styling; repeated patterns are extracted as named component classes in `@layer components`. Avoid scoped Vue styles unless a component genuinely needs encapsulation, and avoid inline `:style="{ ... }"` bindings - bind a class instead.

**Fonts:** VT323 (display, single weight), Inter (variable 100-900 + italic), Space Mono (variable 100-800 + italic) - loaded via `@nuxt/fonts` from the Google provider.

## Theme tokens (Tailwind v4 `@theme`)

Everything else (default Tailwind utilities) is also available, but prefer the syn.horse names so design intent stays visible.

- **Colours.** `bg-void`, `bg-void-2`, `bg-void-3`, `bg-void-4` (page → border surface scale). `text-paper`, `text-paper-2`, `text-paper-3`, `text-paper-4` (primary → disabled foreground). Brand: `text-hot` / `bg-hot` (#ff71ce, "the brand pink"), `text-cool` / `bg-cool` (#01cdfe, links / focus / "info"), `text-lilac` (#b967ff, decorative). Status: `text-pop` (lemon, warnings), `text-danger` / `bg-danger` (destructive only), `text-ok` / `bg-ok` (success - used sparingly). Each colour also has a "pressed" variant suffixed `-2` (e.g. `bg-hot-2`).
- **Fonts.** `font-display` (VT323 - large headlines, terminal prompts), `font-sans` (Inter - default body / UI), `font-mono` (Space Mono - eyebrows, kbd hints, code).
- **Type.** Custom scale with `--text-{xs,sm,base,md,lg,xl,2xl,3xl,4xl,5xl,6xl}` mapping to `12,13,15,17,20,24,32,44,64,96,144 px`. Use arbitrary values (`text-[28px]`) for sizes that fall outside the scale.
- **Spacing.** `--spacing: 4px`, so `p-1` = 4px, `p-2` = 8px, `p-12` = 48px, etc. Matches the original `--s-*` design tokens exactly.
- **Easings.** `ease-snap` (`cubic-bezier(0.2, 0.9, 0.2, 1)` - the design's hard snap), `ease-soft` (the gentler one).
- **Shadows.** `shadow-glow-hot`, `shadow-glow-hot-strong`, `shadow-glow-cool`, `shadow-glow-lilac`, `shadow-glow-palette`, `shadow-pulse-ok`, `shadow-inset-edge`. No traditional drop shadows - the design forbids them.
- **Animations.** `animate-pulse-glow` (status dots), `animate-scan-flicker` / `animate-grain-shift` (FX overlays), `animate-glitch-strong` (404), `animate-konami` (toast).

## Component classes (`@layer components` in `main.css`)

Repeated patterns get a named class instead of an inline utility soup. They all reference the theme tokens above.

- **Reusable UI:** `.tg` (+ `.hot/.cool/.lilac/.warn/.solid/.on` modifiers - small mono pills used in projects, blog filters, cv stack), `.eyebrow` (mono uppercase label above page headlines), `.lede` (paragraph lead text), `.console` (+ `.pr/.mu/.ok/.danger` inner spans - terminal-style code block), `.btn-syn` (+ `.lg/.warn` modifiers - outlined mono button), `.dot` (accent period after page titles).
- **Page-level shell + headings:** `.page-shell` (+ `.wide` - fixed-width content column, replaces the legacy `.container`), `.page-h1` (112px display headline used on every secondary page), `.page-h2` (44px section heading), `.footer-note` (bottom strip on home / contact / domains).
- **Lists:** `.diamond-list > li` (◆-bulleted list with hairline borders, used on `/now` and post bodies), `.dotted-link` (paper-2 link with hot pink dotted underline, used in the home links row).
- **Home page:** `.home-card` (+ `.home-card-head/.home-card-title/.home-card-body/.home-card-arrow` - clickable card used on the home page).
- **Page-specific:** `.proj-grid/.proj/.proj-year/.proj-title/.proj-body/.proj-url/.proj-tags` (project cards), `.blog-filter/.blog-row/.blog-feed-line` (blog index), `.post-crumb/.post-h1/.post-meta/.post-body/.post-foot` (single post - `.post-body` carries all the prose styling), `.cv-actions/.cv-h2/.cv-role/.cv-talks/.cv-talk` (cv layout), `.goody-list/.goody-row/.goody-path/.goody-desc/.goody-meta` (goodies file listing - secret rows carry `.secret` and fold in via the shared `.reveal-*` TransitionGroup classes, also used for the abandoned project cards on `/projects`), `.notfound` (+ `.big/.yell/.console/.actions` inner - 404 page, also used by `error.vue`'s 404 branch), `.generic-error` (non-404 error fallback).
- **FX overlays:** `.fx-scan` (scanline gradient, 4s flicker), `.fx-grain` (low-opacity noise SVG with grain shift), `.fx-vignette` (corner darkening), `.fx-glitch` (chromatic aberration on hover, 60ms jitter - apply to `<NuxtLink>` / `<button>` for the rgb-split-on-hover effect).

## Gotchas

- **CSS keyframes are global.** Two animations sharing a name will collide silently; the later definition wins everywhere. We previously hit this when `glitch-jitter` was redefined for the konami toast (now renamed to `konami-jitter`). All keyframes live near the top of `main.css`. Be careful adding new ones.
- **Tag variant classes are flat** (`.tg.hot`, `.tg.cool`, `.tg.warn`, `.tg.lilac`, `.tg.solid`, `.tg.on`). Don't invent new ones - extend the existing modifier set in `main.css` if you need another colour.
- **`security.sri: true`** is on, plus `ssg.hashScripts/Styles/meta`. Avoid inline `:style="{ ... }"` bindings on Vue templates where possible - bind a class and put the dynamic value in CSS instead.
- **The `--accent-color` custom property** falls back to `--color-hot` everywhere via `var(--accent-color, var(--color-hot))`. The runtime tweaks panel that used to write it has been dropped, but the pattern is preserved for any future re-introduction.
- **Reduced motion.** `main.css` has a `@media (prefers-reduced-motion: reduce)` block at the bottom that mutes the loud animations (scanlines, 404 glitch, konami toast). Keep new decorative animations in scope of those overrides.
- **Arbitrary properties for vendor prefixes.** Use Tailwind v4's `[<property>:<value>]` syntax for one-off CSS that doesn't have a utility - e.g. `[-webkit-text-stroke:1.5px_var(--color-paper-3)]` for an outlined wordmark. Underscores become spaces.

## Canonical references

- `_design/design-system/README.md` - brand voice, colour rules, type rules, what is and is not allowed.
- `_design/site/styles.css` - original design CSS; the live site mirrors it via the tokens and component classes above.

Both are frozen. Read them, never edit them.
