---
description: Produce one ad or social visual (post, story, banner, thumbnail)
argument-hint: [what the visual is for, offer, format]
---

Use the marketing-os tools. Skip the strategist.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

- The brand: pass its name to `render_visual` (`brand`) when the user names one; with one saved brand nothing is needed. No separate `select` call. Set a brand up only when it is not saved yet.
- Write nothing to the user between tool calls; one short reply at the end.
- Every question to the user is multiple choice: ask it with the AskUserQuestion tool (2-4 short options, the recommended one first; the options a result gives when it has them), never in plain text. Then carry on with the answer.
- If the format is not given, call `list_catalog` and suggest the one that fits; default to a square post.
- Think as the art director and the marketing consultant together: the brand's world, the audience, the message's job and the format (a story, a feed post, a wide ad and a thumbnail are different compositions, never one look stretched). Always pass `direction`, with a photo or without: the backdrop and why, where the copy sits (top, center, bottom) and whether the headline is set large, for that format; never one look by habit.
- The server's copy editor sets the final copy from the user's text; yours is its starting point. When the user gave the text, the copy comes from it: the headline is their strongest line as they wrote it, the subline another of their lines; a new line only for a slot their text has nothing for. Pass what the product does as `brief.features` (short labels in their words) and the figures as `brief.figures`, so the proof can be shown.
- Always pass `caption`: the post text that goes out with the visual, in the user's own words, made from their lines the visual does not carry (and the visual's message in one sentence when every line is on it). The first fact and any fact with a number, price or offer always go on the visual, never only in the caption.
- Every number and claim in the copy must come from what the user said. Ask for a missing price, date or booking channel instead of inventing one.
- Pass the request above, verbatim, as `brief.request`; every figure on the visual is checked against it. A question the result asks is the user's to answer: never apply it yourself, and offer its wording and options exactly as given, never in your own words.
- Never present a render that is not ready as finished.
- The reply starts with the result's `relay`, word for word: never shortened, softened, reworded or upgraded. It is the status the result gives (`🚀 Ready to publish`, `⚠️ Delivered, below par`, `⚠️ Delivered, review incomplete`, `Not ready` or `❌ Failed`) with its link, review and photo state, and any earlier attempt in this conversation that was not delivered. Ready means the required checks completed and the automated review passed; never call a visual approved, professional or high quality. `Not ready` and `❌ Failed` mean nothing was delivered: say so; an image attached to a `Not ready` result is not a deliverable, so never show, describe or link it. A retry after `Not ready` or `❌ Failed` is a new attempt: give its own `relay`, which names the earlier one; never present the retry as if the earlier attempt had not happened. A photo link the user gave is passed with `urlFrom: 'user'`; a link you found yourself with `urlFrom: 'assistant'`. If the result asks a question, ask it right after with AskUserQuestion; otherwise at most one short line with its direction. When the visual was delivered, give the caption you passed after that, as a quote, for the user to post with it: a fact the result places `in_caption` reaches the reader only through it. Never download or save the file; no tool call after the visual.
