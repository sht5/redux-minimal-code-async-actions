---
name: html-deck
description: Turns a plan, design doc, PR/RFC, or explanation of a code change or mechanism into a brief, no-fluff HTML slide presentation — a single self-contained file with a full-screen, dark terminal look (large type, keyboard- and click-navigable, node-graph flowcharts for branching logic). Always proposes a slide-by-slide outline first — which of a fixed set of 10 slide types each slide uses, and its actual content — for the user to review and revise before any HTML gets built. Use this whenever the user asks to turn something into a "deck", "presentation", or "slides", wants to "walk the team through" a change, "brief" someone on a design, or present a mechanism/PR/RFC visually — even if they don't say "HTML" or name this skill directly. Prefer this over improvising a slide layout from scratch.
---

# HTML Deck

Produces one self-contained HTML file: a full-screen, dark terminal-styled
slide deck, meant to be read fast — arrow keys or clicks to move, large
type, one idea per slide. These are not conference-talk decks with a
build-up and a narrative arc; they're closer to a technical walkthrough
someone reads in two minutes to understand a change or a plan. Brief,
concise, no fluff — cut content before you shrink a font or crowd a slide.

The visual system (colors, chrome, fonts, keyboard/click navigation) is
locked and lives in `assets/deck-base.html`. Don't redesign it per deck —
that consistency is the point. What changes deck to deck is the content,
slotted into one of ten fixed slide types.

## Never skip phase 1

Building the outline is the actual work here; instantiating HTML from an
approved outline is mechanical. Don't jump straight to HTML even for a
short, obvious-seeming request — the user asked to see the plan first
because getting the content and slide breakdown right is what's worth
their attention, not proofreading a finished file.

### Phase 1 — propose the outline

1. Read whatever the user gave you — a markdown doc, a code diff, a
   description of a mechanism, plain instructions.
2. Break it into slides. For each one, pick exactly one type from the
   catalog below and write out the slide's *actual* content — not a topic
   label like "slide 3: the mechanism," but the real headline, the literal
   3–5 list items, the actual code snippet, the real diagram nodes.
3. Present the outline as plain text/markdown in the chat — never as HTML,
   never as an artifact, at this stage. Roughly:

   ```
   1. TITLE — "Async actions, minimal code" / premise: one middleware
      replaces the boilerplate around every async call
   2. LIST — "the boilerplate tax" / 3 items: IN_PROGRESS, SUCCESS, ERROR
      each need a type + creator (+ reducer case for the last two)
   3. STEPS — "what the middleware does" / detects async:true → dispatch
      _IN_PROGRESS → call httpMethodToInvoke → dispatch _SUCCESS/_ERROR
   4. FLOWCHART — same control flow as a branching diagram: async? → no:
      passthrough / yes: in-progress → invoke → resolve/reject
   5. CODE — redux_async_middleware.js, full source
   6. TAKEAWAYS — drop-in, no sagas/thunks; one object per async call;
      payload spreads into SUCCESS automatically
   ```

4. Stop. Wait for the user to approve or redirect it. If they change
   content or types, revise and show the outline again — don't build
   until they've actually signed off (look for real confirmation like
   "go ahead" or "build it," not just silence on an unrelated reply).

### Phase 2 — build the deck

Once the outline is approved:

1. Copy `assets/deck-base.html` as the starting file — it already has the
   full CSS system and the nav script wired up. Leave the `<style>` and
   `<script>` blocks untouched.
2. For each planned slide, open `references/slide-types.md`, find that
   type's section, and adapt its HTML template with the approved content.
   Keep the wrapping tags/classes; change the words, the code, the numbers,
   the diagram coordinates.
3. Insert the slides in order where the base file says
   `<!-- SLIDES_GO_HERE -->`. The first `<section>` needs
   `class="slide active"`; every section needs `data-type="<type>"`
   (lowercase) — the statusbar and titlebar pick this up automatically,
   nothing else to wire.
4. Set `<title>` to the deck's actual subject.
5. Save it as one `.html` file. If you can publish artifacts, publish it
   (pick 1–2 emoji for the favicon that fit the subject) so the user can
   navigate it immediately; otherwise write the file and tell them the
   path.

## The ten slide types

Full templates with exact HTML and hard constraints are in
`references/slide-types.md` — read it before building, not just once at
the start. Quick reference:

| Type | For | Hard limits |
|---|---|---|
| Title | Deck opener | Exactly 1, always slide 1 |
| Section | Chapter break | Only if the deck has real distinct parts |
| Statement | One big idea | Exactly 1 sentence, no bullets |
| List | Parallel points | 3–5 items, order-independent |
| Steps | Sequential process | 3–5 steps, order matters |
| Flowchart | Branching logic | Node-graph SVG style only; needs a real decision |
| Code | One real snippet | 1 file per slide |
| Compare | Two things, side by side | Exactly 2 columns, symmetric kind |
| Metric | One proof number | Exactly 1 metric, must be real/countable |
| Takeaways | Deck closer | ≤3 points, always last slide |

**Where the wiggle room is:** wording, tone, which optional slots you use
(lede, callout, meta line, badges), item counts within the stated range,
and the language/content of code snippets. **Where it isn't:** the
structural HTML/CSS, the always-slide-1 and always-last-slide rules, the
item-count ceilings, and matching content to the right type — don't dress
a linear sequence up as a Flowchart, or an ordered process as a List,
because it looks more interesting that way.

## Choosing types for the content

- Sequence matters → **Steps**. Sequence doesn't matter → **List**.
- A real fork/decision (if/else, success/fail) → **Flowchart**. A straight
  line, even a long one → **Steps**, not Flowchart.
- An actual before/after or two competing options → **Compare**.
- You have one real, countable number that proves the point → **Metric**,
  usually near the end, right before Takeaways.
- The deck has genuinely distinct phases (Why → What → How) → a
  **Section** slide opens each phase. One continuous story → skip Section
  entirely.
- Aim for the tightest deck that covers the material — most of these run
  6–12 slides. More than that is usually a sign some slides should merge
  or the source material should be trimmed before it becomes slides, not
  a sign you need an 11th slide type.

## Content voice

Short phrases beat full sentences wherever the type allows it (List and
Steps items especially). Say the real thing, not a category label for it
— "IN_PROGRESS — action type + creator, fired before the call," not
"handles the in-progress state." Metric numbers must be real and sourced,
never a vibe. If a slide feels crowded, the fix is cutting content, never
shrinking type or tightening spacing to force a fit.
