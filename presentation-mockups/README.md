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

### The slide-type catalog

The core ask this round: stop treating every slide as a one-off layout.
This deck now demonstrates one concrete, reusable type per slide — the
skill should only ever pick from this list, never invent a new layout on
the fly. Each slide is tagged top-right (`TYPE · …`) and its terminal
prompt doubles as a mnemonic for the type:

| # | Type | Prompt idiom | When to use it |
|---|------|---------------|-----------------|
| 1 | **Title** | `./run` | Deck opener — name + one-line premise. |
| 2 | **Section** | `cd ./01-problem` | Chapter break in a longer deck. Almost empty on purpose. |
| 3 | **Statement** | `echo $THESIS` | One big idea, no bullets — a hook or a hard claim. |
| 4 | **List** | `ls -la ./boilerplate` | Enumerated points — problem framing, context, constraints. |
| 5 | **Steps** | `./trace --mechanism` | A sequential process, in order. |
| 6 | **Flowchart** | `./render flow.svg …` | Branching logic — decisions, not just a sequence. |
| 7 | **Code** | `cat file.js` | One annotated code block. |
| 8 | **Compare** | `diff before.js after.js` | Two options or a before/after, side by side. |
| 9 | **Metric** | `./stats --summary` | One big number that proves the point. |
| 10 | **Takeaways** | `cat TAKEAWAYS.md` | Closing checklist — always the last slide. |

Flowchart appears three times in this file (once per style variant) —
in the real deck it's one slide, using whichever variant gets picked.
That makes 10 types across 12 slides.

### Open questions for this round
- Does the type list above cover everything you reach for, or is something
  missing (e.g. a "quote" or "table" type)?
- Should **Section** dividers be mandatory for every deck, or only inserted
  once a deck crosses some slide-count threshold?
- Which flowchart variant — and is it good enough to lock in, or does the
  node-graph version need a 4th, simpler pass?
