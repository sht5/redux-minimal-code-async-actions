# Presentation mockups

Four visual directions for the "brief, concise, no-fluff" HTML presentation
skill, built against the same real content (this repo's async-actions
middleware) so they're comparable side by side. Each file is a
self-contained, single-file HTML deck — open it directly or click through
the published artifact links.

Navigation is the same in all four: `←/→` (or `↑/↓`, space, `PageUp/Down`)
to move between slides, `Home`/`End` to jump to the ends, click the
dots/tabs/on-screen arrows to jump directly.

Every deck covers the same seven beats: title → problem → approach →
mechanism → source code → usage → takeaways. That consistency is deliberate —
it's what should carry over into the skill regardless of which visual style
gets picked.

## The four directions

1. **`01-blueprint.html` — Blueprint.** Dark drafting-table navy, graph-paper
   grid, monospace labels, crop marks and a sheet title block. Orange
   "redline" accent for the one thing that should stand out per slide.
   Best fit if the presentations should feel like engineering specs.

2. **`02-whiteboard.html` — Studio Whiteboard.** Light paper ground, big
   confident left-aligned headlines, single cobalt accent, giant faint
   slide-number watermark. Reads like a well-prepared internal tech talk —
   the safest, most broadly presentable option.

3. **`03-terminal.html` — Terminal.** Dark, monospace throughout, real
   terminal chrome and an amber CRT-phosphor accent (not the usual
   acid-green). Leans hardest into "this is about code."

4. **`04-field-notes.html` — Field Notes.** Warm stone paper, serif
   headlines, a brick-red stamp per section, and a notebook-tab sidebar
   listing every slide title at a glance. The most editorial/dossier feel
   of the four.

## Picking a direction

Open the artifact links, click through all seven slides in at least two of
them, and note:
- Which one is easiest to scan in under 5 seconds per slide?
- Which accent/contrast holds up best for a projector or shared screen?
- Any layout element worth carrying into the others (e.g. the tab sidebar,
  the watermark numbering, the terminal chrome) before we lock one in and
  turn it into the actual skill template?

## Round 2 — Terminal, taken further

`05-terminal-catalog.html` is the chosen direction (Terminal), pushed
further per feedback:

- **Full screen.** The window is no longer a card floating on a background —
  it fills the viewport edge to edge. Titlebar and statusbar are the only
  chrome.
- **Larger type.** Every size bumped up a tier — this is meant to read from
  across a room, not off a laptop screen held at arm's length.
- **Flowchart, three ways.** The same real control-flow (the middleware's
  `async` check → dispatch → resolve/reject branch) rendered three different
  ways so the visual style can be picked independently of the content:
  - **Schematic** — CSS-only right-angle connectors, monochrome, reads like
    a circuit diagram.
  - **ASCII tree** — plain monospace text with box-drawing characters, like
    piping the control flow through `tree`. The most "native" to a terminal.
  - **Node graph** — SVG-drawn curved connectors with color-coded outcomes
    (green = success path, red = error path). The most like a conventional
    flowchart tool, reskinned dark.

  Pick one style (or ask for a fourth) and it becomes *the* flowchart
  template — the skill should not improvise new diagram styles per deck.

### Decisions so far
- **Flowchart style: node graph (SVG, color-coded outcomes).** The
  schematic and ASCII-tree variants stay in `05-terminal-catalog.html` for
  reference but the node graph is what the skill will standardize on.

### The slide-type catalog

The core ask this round: stop treating every slide as a one-off layout.
This deck demonstrates one concrete, reusable type per slide — the skill
should only ever pick from this list, never invent a new layout on the
fly. Each slide is tagged top-right (`TYPE · …`) and its terminal prompt
doubles as a mnemonic for the type. Flowchart appears three times in the
file (once per style variant, before the decision above) — in the real
deck it's one slide. That's 10 types across 12 slides.

**1. Title** — *opens the deck, once.*
Slots: headline (3–8 words), one-line premise (≤20 words), optional meta
line (repo/version/date).
Rule: always slide 1, exactly one per deck. No bullets, no code.

**2. Section** — *chapter break.*
Slots: short label, optional one-line subtext.
Rule: near-empty by design. Use only when the deck has genuinely distinct
parts (e.g. Why → What → How → Rollout) — not as decoration between every
pair of slides, and not in a short single-narrative deck. The catalog
deck's async-actions content is one continuous story, so it doesn't
actually need one; slide 2 exists purely to demonstrate the type.

**3. Statement** — *one idea, full weight.*
Slots: a single sentence (~12–20 words). No heading, no body.
Rule: if it needs a second sentence, it isn't a Statement — it's a List or
a Title lede.

**4. List** — *parallel, unordered points.*
Slots: heading, optional one-line lede, 3–5 items, optional callout.
Rule: 3–5 items max. Order doesn't matter — if it does, use Steps. More
than 5 means split into two List slides.

**5. Steps** — *sequential process.*
Slots: heading, 3–5 numbered steps, each a short phrase (often with inline
code).
Rule: only for things that truly happen in order. If reordering wouldn't
change the meaning, it's a List, not Steps.

**6. Flowchart** — *branching logic.* (node-graph style, decided)
Slots: optional heading, one diagram.
Rule: only when there's a real decision point (if/else, success/fail, a
fork). A straight line with no branch is Steps, not Flowchart.

**7. Code** — *one real snippet.*
Slots: optional file label, one syntax-highlighted block with line
numbers.
Rule: one file per slide, trimmed to fit without scrolling. Two snippets
side by side is Compare, not two Code slides.

**8. Compare** — *two things, side by side.*
Slots: two column headers (optional badge, e.g. a line count), two blocks
of the same kind (code vs code, or text vs text).
Rule: exactly two columns, symmetric in kind. This is the before/after and
option-A/option-B slide.

**9. Metric** — *one number that proves the point.*
Slots: one big number/ratio, one-line label, optional small detail line
sourcing it.
Rule: exactly one metric, and it must be a real countable number — never a
vibe like "much faster."

**10. Takeaways** — *closes the deck.*
Slots: heading, up to 3 checklist points, optional final callout (a
command, a link, a next step).
Rule: always the last slide, capped at 3 points — tighter than List, since
this is "if you remember nothing else."

### Open questions for this round
- Is a **Quote** type missing (pulling a line from a doc/PR/teammate,
  distinct from Statement asserting your own claim)?
- Is a **Table** type needed for genuinely tabular data (3+ dimensions), or
  does Compare/List cover everything in practice?
- Are the caps right — List 3–5, Takeaways ≤3 — or too tight/loose?
