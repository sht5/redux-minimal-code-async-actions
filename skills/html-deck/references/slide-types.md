# Slide-type templates

Ten types. Every slide in a deck is exactly one of these — never invent an
eleventh, never bend a hard constraint for convenience. Within a type,
wording, which optional slots you use, and (within the stated range) item
counts are yours to adapt to the content — that's the wiggle room. The
structural HTML/CSS (tags, classes, nesting) is not; it's what makes the
deck look consistent from one file to the next, so copy it as-is and swap
the content inside it.

Every `<section>` needs `class="slide"` (plus `active` on the first one
only) and `data-type="<type>"` (lowercase, matching the table below) — the
statusbar and titlebar read that attribute automatically, nothing else to
wire up.

Contents:
1. [Title](#1-title)
2. [Section](#2-section)
3. [Statement](#3-statement)
4. [List](#4-list)
5. [Steps](#5-steps)
6. [Flowchart](#6-flowchart)
7. [Code](#7-code)
8. [Compare](#8-compare)
9. [Metric](#9-metric)
10. [Takeaways](#10-takeaways)

---

## 1. Title

Opens the deck. Exactly one per deck, always slide 1.

- Headline: 3–8 words, the deck's subject, not a summary of every slide.
- Premise: one line, ≤20 words, the "so what."
- Meta line: optional — repo, version, date, author. Skip it if there's
  nothing worth citing.

```html
<section class="slide active" data-type="title">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">./run</span></p>
  <h1>Async actions, minimal code<span class="amp">_</span><span class="cursor"></span></h1>
  <p class="lede" style="max-width:38ch;">One Redux middleware replaces the boilerplate written around every async call.</p>
  <div class="content">
    <p class="meta-line">redux-minimal-code-async-actions · v1.0.3</p>
  </div>
</section>
```

Drop the trailing `<span class="amp">_</span><span class="cursor"></span>`
if the headline reads awkwardly with a blinking cursor stuck to it (it's a
flourish, not a requirement).

---

## 2. Section

A chapter break. Near-empty by design — it should take under five seconds
to read. Only use this when the deck actually has distinct parts (e.g.
Why → What → How → Rollout); a deck that tells one continuous story
doesn't need one, and dropping one in "for pacing" every few slides just
adds friction. The prompt line's `cd` is doing real work here — think of
it as literally changing into the next part of the deck.

```html
<section class="slide" data-type="section">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">cd ./01-problem</span></p>
  <div class="divider">
    <p class="cmdline"><span class="sym">$</span> the problem</p>
    <p class="sub">why redux async calls need a middleware in the first place</p>
  </div>
</section>
```

---

## 3. Statement

One sentence, full weight, nothing else. For the single idea you want
remembered if the audience remembers nothing else on the slide — a thesis,
a hook, a hard claim.

- One sentence only, ~12–20 words. If it needs a second sentence, it isn't
  a Statement — write a List or a Title lede instead.
- No heading, no bullets, no code.

```html
<section class="slide" data-type="statement">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">echo $THESIS</span></p>
  <div class="statement">
    <p>One flag replaces three action types, three creators, and the dispatch code around every async call<span class="var">.</span></p>
  </div>
</section>
```

---

## 4. List

Parallel, unordered points — a problem's parts, constraints, requirements.

- 3–5 items. Fewer than 3 and it's probably a Statement; more than 5 and
  it wants to be two List slides.
- Order must not matter. If sequence carries meaning, use Steps instead.
- Lede and callout are both optional — use them only when they add
  information, not to fill space.

```html
<section class="slide" data-type="list">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">ls -la ./boilerplate</span></p>
  <h2>the boilerplate tax</h2>
  <div class="content" style="justify-content:flex-start;">
    <p class="lede" style="max-width:56ch;">Every async call in Redux traditionally needs three action types, three creators, and the code to dispatch them by hand.</p>
    <ul class="log">
      <li><span class="tag">[01]</span> IN_PROGRESS — action type + creator, fired before the call</li>
      <li><span class="tag">[02]</span> SUCCESS — action type + creator + reducer case, fired on resolve</li>
      <li><span class="tag">[03]</span> ERROR — action type + creator + reducer case, fired on reject</li>
    </ul>
    <div class="callout">N async calls × 3 states = 3N pieces of repeated code</div>
  </div>
</section>
```

`<li class="ok">` / `<li class="err">` recolor a single item's `.tag` green
or red — useful for a status list, not required otherwise.

---

## 5. Steps

A process where order matters — this happens, then this, then this.

- 3–5 steps. If reordering the items wouldn't change the meaning, this is
  a List, not Steps.
- Each step is a short phrase, not a paragraph. Inline `<code>` for
  literal identifiers is encouraged — that's what the amber `code` color
  is for.

```html
<section class="slide" data-type="steps">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">./trace --mechanism</span></p>
  <h2>what the middleware does</h2>
  <div class="content" style="justify-content:flex-start;">
    <div class="steps">
      <div class="s"><span class="idx">01</span><span class="arrow">→</span><p>detects <code>async: true</code> on the action</p></div>
      <div class="s"><span class="idx">02</span><span class="arrow">→</span><p>dispatches <code>TYPE_IN_PROGRESS</code></p></div>
      <div class="s"><span class="idx">03</span><span class="arrow">→</span><p>calls <code>httpMethodToInvoke(...params)</code></p></div>
      <div class="s"><span class="idx">04</span><span class="arrow">→</span><p>dispatches <code>_SUCCESS</code> or <code>_ERROR</code></p></div>
    </div>
  </div>
</section>
```

---

## 6. Flowchart

Branching logic — a real decision with different outcomes. Only ever use
the node-graph SVG style below; the schematic and ASCII-tree variants that
were explored earlier were dropped, so don't reach for them.

Use Flowchart only when there's an actual fork (if/else, success/fail,
a state machine choice). A straight sequence with no branch is Steps, not
Flowchart — don't dress up a linear process as a diagram just because it
involves several boxes.

**Coordinate system.** The diagram lives in a 1000×600 logical box
(`viewBox="0 0 1000 600"` on the SVG; `.diagram-c-wrap` locks the same
1000:600 aspect ratio). Every node is a `.node-c` div positioned with
`left`/`top` as *percentages of that box*: `left% = x/1000*100`,
`top% = y/600*100`. So a node at logical (500, 140) gets
`left:50%; top:23.3%`.

**Layout pattern** (covers one or two decision points, which is nearly
everything a brief deck needs):
- Start node on the centerline (x=500), near the top (y≈40–60).
- Each decision sits on its own parent's centerline.
- A decision's branches split roughly ±250–300 logical units left/right of
  the decision's x, then run straight down that x for any following steps.
- End each branch in its own terminal node. Don't route branches back
  together into a shared end node — the extra routing rarely earns its
  complexity in a deck this size.
- Leave ~90–140 logical units of vertical gap between rows so the curved
  connectors have room to breathe.
- Keep node text to 3–6 words — the box is a fixed ~170–190px wide and
  wraps, not scrolls.

**Connectors and color.** `<path>` elements, `fill="none"`,
`stroke-width="2"`, `marker-end` pointing at one of four predrawn
arrowheads, chosen by what the edge *means*, not by decoration:
- `#a-dim` (`#63644f`) — a plain step, no semantic weight
- `#a-acc` (`#ffb000`) — the "yes" / affirmative branch out of a decision
- `#a-ok` (`#8fd14f`) — an edge that ends in success
- `#a-err` (`#ff6b5e`) — an edge that ends in failure

Straight vertical connector: `M x,y1 L x,y2`. A connector leaving a
decision sideways toward a branch: a cubic bezier that starts moving
horizontally and ends moving vertically, e.g.
`M x1,y1 C midx,y1 x2,y1+40 x2,y2` — that's what gives it the S-curve
"flowchart" look instead of a sharp elbow. Label branches (`yes`/`no`,
`resolve`/`reject`) with small `<text>` elements near the fork, colored to
match the edge.

**Worked example** — copy this whole block as a starting skeleton, then
re-point the coordinates, text, and paths at the new content:

```html
<section class="slide" data-type="flowchart">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">./render flow.svg --style node-graph</span></p>
  <div class="content">
    <div class="diagram-c-wrap">
      <svg class="diagram-c-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="a-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#63644f" />
          </marker>
          <marker id="a-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#ffb000" />
          </marker>
          <marker id="a-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#8fd14f" />
          </marker>
          <marker id="a-err" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#ff6b5e" />
          </marker>
        </defs>
        <path d="M500,66 L500,110" fill="none" stroke="#63644f" stroke-width="2" marker-end="url(#a-dim)" />
        <path d="M460,166 C 340,166 220,190 200,210" fill="none" stroke="#63644f" stroke-width="2" marker-end="url(#a-dim)" />
        <path d="M540,166 C 660,166 780,190 800,210" fill="none" stroke="#ffb000" stroke-width="2" marker-end="url(#a-acc)" />
        <path d="M200,266 L200,310" fill="none" stroke="#63644f" stroke-width="2" marker-end="url(#a-dim)" />
        <path d="M800,266 L800,310" fill="none" stroke="#63644f" stroke-width="2" marker-end="url(#a-dim)" />
        <path d="M800,366 L800,410" fill="none" stroke="#63644f" stroke-width="2" marker-end="url(#a-dim)" />
        <path d="M760,466 C 715,490 690,500 672,512" fill="none" stroke="#8fd14f" stroke-width="2" marker-end="url(#a-ok)" />
        <path d="M840,466 C 885,490 910,500 928,512" fill="none" stroke="#ff6b5e" stroke-width="2" marker-end="url(#a-err)" />
        <text x="330" y="196" fill="#9a9b86" font-size="15" font-family="ui-monospace, monospace">no</text>
        <text x="655" y="196" fill="#ffb000" font-size="15" font-family="ui-monospace, monospace">yes</text>
        <text x="690" y="500" fill="#8fd14f" font-size="15" font-family="ui-monospace, monospace">resolve</text>
        <text x="890" y="500" fill="#ff6b5e" font-size="15" font-family="ui-monospace, monospace">reject</text>
      </svg>
      <div class="node-c" style="left:50%; top:6.7%;">action dispatched</div>
      <div class="node-c decision" style="left:50%; top:23.3%;">async === true ?</div>
      <div class="node-c dim" style="left:20%; top:40%;">next(action)</div>
      <div class="node-c" style="left:80%; top:40%;">dispatch _IN_PROGRESS</div>
      <div class="node-c dim" style="left:20%; top:56.7%;">reducers update state</div>
      <div class="node-c" style="left:80%; top:56.7%;">call httpMethodToInvoke()</div>
      <div class="node-c decision" style="left:80%; top:73.3%;">promise settles ?</div>
      <div class="node-c ok" style="left:67.2%; top:90%;">dispatch _SUCCESS</div>
      <div class="node-c err" style="left:92.8%; top:90%;">dispatch _ERROR</div>
    </div>
  </div>
</section>
```

`.node-c` = neutral step, `.node-c.decision` = decision (accent border),
`.node-c.dim` = a de-emphasized/passthrough outcome, `.node-c.ok` /
`.node-c.err` = success/failure terminal nodes (also narrower — 170px vs
190px — which is fine, they're usually shorter text).

---

## 7. Code

One real, unmodified snippet — the evidence, not a paraphrase.

- One file/snippet per slide. Two snippets side by side is Compare, not
  two Code slides.
- Trim to what fits without scrolling; don't shrink the font to cram more
  in. If the real file is long, show the part that matters and say so in
  the prompt line (e.g. `sed -n '12,28p' file.js`) rather than pretending
  it's the whole file.
- Syntax spans: `.kw` keywords, `.fn` function/highlighted names, `.str`
  strings/template literals, `.cm` comments. Everything else inherits the
  base ink color — don't over-highlight.

```html
<section class="slide" data-type="code">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">cat redux_async_middleware.js</span></p>
  <div class="content">
    <pre><span class="kw">const</span> asyncActionsMiddleware = store => next => action => {
    <span class="kw">if</span> (!action.hasOwnProperty(<span class="str">'async'</span>)) <span class="kw">return</span> next(action);
    ...
};</pre>
  </div>
</section>
```

---

## 8. Compare

Two things, side by side — before/after, option A vs option B.

- Exactly two columns, symmetric in kind: code vs code, or text vs text —
  don't mix a code column with a prose column.
- The badge in `.col-head` is optional and should carry a real fact (a
  line count, a "deprecated" flag) — not a decorative label.

```html
<section class="slide" data-type="compare">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">diff before.js after.js</span></p>
  <div class="content">
    <div class="grid-2">
      <div>
        <div class="col-head"><span class="name">without the middleware</span><span class="badge warn">16 lines</span></div>
        <pre>...</pre>
      </div>
      <div>
        <div class="col-head"><span class="name">with the middleware</span><span class="badge good">6 lines</span></div>
        <pre>...</pre>
      </div>
    </div>
  </div>
</section>
```

`.badge.warn` (red) and `.badge.good` (green) are the two badge colors;
use plain `.badge` (dim) when the fact isn't good-or-bad, just informative.

---

## 9. Metric

One number that proves the point.

- Exactly one metric per slide. It must be a real, countable number —
  never a vibe ("dramatically faster", "way less code"). If you don't
  have an actual number, this isn't the right type — use Statement.
- The detail line (optional) should say where the number came from, so it
  reads as evidence, not a slogan.

```html
<section class="slide" data-type="metric">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">./stats --summary</span></p>
  <div class="metric">
    <div class="num">3 → 1</div>
    <p class="label">action types &amp; creators, per async call, collapsed into a single <code style="color:var(--accent);">async: true</code> flag.</p>
    <p class="detail">measured on GET_USER: 16 lines of thunk boilerplate become a 6-line action object.</p>
  </div>
</section>
```

---

## 10. Takeaways

Closes the deck. Always the last slide.

- Up to 3 points — tighter than List's 3–5, because this is "if you
  remember nothing else." If you have more than 3 things worth
  remembering, the real takeaway is which 3 matter most.
- The callout, if used, should be an action (an install command, a link,
  a next step) — not a restatement of a point already made above it.

```html
<section class="slide" data-type="takeaways">
  <p class="prompt"><span class="sym">➜</span> <span class="path">~/deck</span> <span class="cmd">cat TAKEAWAYS.md</span></p>
  <h2>why it's worth it</h2>
  <div class="content">
    <ul class="log">
      <li class="ok"><span class="tag">✓</span> drop-in middleware — no sagas or thunks to learn</li>
      <li class="ok"><span class="tag">✓</span> every async call collapses to a single action object</li>
      <li class="ok"><span class="tag">✓</span> the resolved payload spreads straight into the SUCCESS action</li>
    </ul>
    <div class="callout">npm i redux-minimal-code-async-actions</div>
  </div>
</section>
```
