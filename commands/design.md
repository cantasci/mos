---
description: Ask the studio for a finished ad drawn in one picture (scene and copy together), or fetch one that was asked for
argument-hint: [what the ad is for and its message | a job id to fetch the finished design]
---

Use the marketing-os tools. Skip the strategist.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

This path makes the whole ad as one picture: the scene and the copy are drawn together and the brand's logo is set on it. The picture is made in the studio, not in this session: you send the request, wait while the studio makes it (a few minutes), and give the finished design. Never make the picture yourself and never open an image service here. `/mos:visual` stays the way to set copy over a photo the user already has.

**When the request is a job id, or asks whether a design is ready:** call `design_status` with the id. Done: give the link and say in one line that the values shown on the screens in the scene are illustrative, not the user's data. Waiting or being made: wait for it as in step 6. Failed: give the reason as the result states it.

**Otherwise, a new design:**

1. **Brand.** Pass its name (`brand`) when the user names one; with one saved brand nothing is needed. Set a brand up only when it is not saved yet (its logo and colours come from its site).
2. **Copy.** From the user's words only: a headline that carries the idea, with the one phrase that takes the brand's colour marked `[[...]]` (at most three words); a subline; a support line when their text has one. Each line is one plain, complete sentence or phrase: no "X. Not Y." contrast, no colon reveal, no question answered by itself, no stacked two-word fragments, no stock AI wording; the server refuses these. Every number must be one the user stated.
3. **Scene.** Write the scene's content in the house style the `design_request` tool describes: the product at work as the hero (a screen with specific, plausible rows), two to five small cards that tell the message's sequence or contrast, the real place where the brand's customer works, one or two props. Never a metaphor, never one object on an empty ground. You give content only; the positions, the colour and the logo's corner are set by the server.
4. **A photo, when the user gave one** (their product, their van, an installed unit): upload it with `photo_upload` and pass `photo` with its `id` and, in a few words, what it shows. It appears in the design as it is. Never invent a photo and never pass one the user did not give.
5. **Send.** Call `design_request`. If it answers "Not yet", fix what it names and call it again.
6. **Wait for it.** Call `design_status` with the job id and `wait: 50`. While it answers waiting or being made, call it again, up to twelve times (about ten minutes), writing nothing in between and showing the user no job id.
7. **Reply once.** Done: the link, and one line that the values shown on the screens in the scene are illustrative, not the user's data. Failed: the reason as the result states it. Still not finished after the twelve calls: one line that the studio has not finished yet, with the job id and that `/mos:design <job id>` fetches it later.

Write nothing to the user between tool calls. Every question to the user is multiple choice, asked with the AskUserQuestion tool.

The shape of the call (an example; the user's words and your choices replace every value):

<!-- design_request example -->
```json
{
  "brand": "Fieldline",
  "format": "instagram_square",
  "slots": {
    "headline": "Every completed job keeps [[its proof]].",
    "subline": "A completed job needs more than a status update.",
    "support": "Photos, timestamps and signatures stay connected to every work order."
  },
  "brief": {
    "request": "A post about work orders: a completed job needs more than a status update. Photos, timestamps and signatures stay connected to every work order.",
    "facts": ["a completed job needs more than a status update", "photos, timestamps and signatures stay connected to every work order"]
  },
  "scene": {
    "hero": { "device": "phone", "rows": ["WO-10482", "Status · Completed", "Photos · 3", "Time · 14:32", "Signature · Signed"] },
    "cards": [
      { "label": "Photo 1 of 3", "shows": "a photo thumbnail of a freshly replaced valve" },
      { "label": "12.05.2026 · 14:32" },
      { "label": "Signature", "shows": "a handwritten ink scribble" }
    ],
    "story": "from the status row to its three proofs",
    "environment": "a mechanical plant room with insulated pipes, valves and a pump set",
    "props": ["an adjustable wrench", "a pair of work gloves"]
  }
}
```
