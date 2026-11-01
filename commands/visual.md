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
- Every number and claim in the copy must come from what the user said. Ask for a missing price, date or booking channel instead of inventing one.
- Pass the request above, verbatim, as `brief.request`; every figure on the visual is checked against it. A question the result asks is the user's to answer: never apply it yourself.
- Never present a render that is not ready as finished.
- The reply when it is ready: `🚀 Ready to publish · [Open visual ↗](<link>)`. If the result asks a question, ask it right after with AskUserQuestion; otherwise at most one short line with its direction. Never download or save the file; no tool call after the visual.
