---
description: Make an image for a post, an ad, a thumbnail or a story (the whole ad drawn as one picture, with your logo), or fetch one by its job id
argument-hint: [what the ad is for and its message | a job id to fetch the finished design]
---

Use the marketing-os tools. Skip the strategist.
If the marketing-os tools are not available, the user has not signed in yet: tell them in one line to open /mcp, choose plugin:mos:marketing-os, press Authenticate and enter their access code, then start a new session. Do nothing else.

Request: $ARGUMENTS

This path makes the whole ad as one picture, in one of four kinds (the product at work, a documentary moment, a before and after, a still life of the work's objects): the scene and the copy are drawn together and the brand's logo is set on it. The picture is made in the studio, not in this session: you send the request, wait while the studio makes it (a few minutes), and give the finished design. Never make the picture yourself and never open an image service here.

**When the request is a job id, or asks whether a design is ready:** call `design_status` with the id. Done: give the link and say in one line that the values shown on the screens in the scene are illustrative, not the user's data. Waiting or being made: wait for it as in step 8. Failed: give the reason as the result states it.

**Otherwise, a new design:**

1. **Brand.** Pass its name (`brand`) when the user names one; with one saved brand nothing is needed. Set a brand up only when it is not saved yet (its logo and colours come from its site).
2. **Ideas, on your own, never shown and never asked about.** Before any copy, think of three ways to say the user's message: one from a **tension** (what bothers the reader), one from a **proof** (a fact or figure they stated), one from a **moment** (the concrete situation in which the message is true). Each has a headline, the user's own words it stands on (copied exactly), and the picture it alone would ask for: who or what is where, doing what. Choose the strongest yourself, the one this brand's reader would stop for, and never a screen with cards by habit. Send all three as `ideas` with `chosen`; the headline and the scene below are the chosen idea's.
3. **Copy.** From the user's words only: a headline that carries the idea, with the one phrase that takes the brand's colour marked `[[...]]` (at most three words); a subline; a support line when their text has one. Each line is one plain, complete sentence or phrase: no "X. Not Y." contrast, no colon reveal, no question answered by itself, no stacked two-word fragments, no stock AI wording; the server refuses these. Every number must be one the user stated.
4. **Format.** From where the user says it will be shown: `instagram_square` or `instagram_post` (4:5) for Instagram, `linkedin_post_square` for LinkedIn, `youtube_thumbnail` for a YouTube video (a headline and at most a short subline, nothing else), `story` for a vertical frame, with `platform: "tiktok"` when it is for TikTok. No platform named: `instagram_square`.
5. **Scene.** First choose the kind of picture (`scene.genre`) from what the chosen idea shows, never by habit; the server refuses the kinds of the brand's last two designs and names the ones left:
   - `product_proof`: the product at work. `hero` (its carrier `device`: phone, tablet, laptop, a wall display, a handheld terminal, a clipboard report, glass panels; its `view`: list, chart, board, timeline, map; specific, plausible `rows`), two to five `cards` that tell the message's sequence or contrast, one or two `props`. The carrier, the view and the props of the brand's last such design are refused.
   - `moment`: one documentary photograph of the moment in which the message is true. `moment.subject` (who or what is doing what, as a photographer would see it; people from behind or as hands), `moment.focus` (the one thing in sharp focus that carries the message), `moment.light`, and at most two `moment.reads` (words legible on real things). No screen with cards, nothing floating.
   - `before_after`: the same place twice. `before.shows` and `after.shows` (the state the message complains about and the state it promises), each with a short caption (`label`).
   - `objects`: a daylight still life of the real objects of the customer's work that tell the message (`objects`: two to five things, the most important first, with the words written on them when they carry any). No screen, no device.
   Every kind needs `environment`: the real place where the brand's customer works. Never a metaphor, never one object on an empty ground, never copy on a panel or a box. You give content only; the positions, the colours, the light and the logo's corner are set by the server.
6. **A photo, when the user gave one** (their product, their van, an installed unit): upload it with `photo_upload` and pass `photo` with its `id` and, in a few words, what it shows. It appears in the design as it is. Never invent a photo and never pass one the user did not give.
7. **Send.** Call `design_request`. If it answers "Not yet", fix what it names and call it again.
8. **Wait for it.** Call `design_status` with the job id and `wait: 50`. While it answers waiting or being made, call it again, up to twelve times (about ten minutes), writing nothing in between and showing the user no job id.
9. **Reply once.** Done: the link, and one line that the values shown on the screens in the scene are illustrative, not the user's data. Failed: the reason as the result states it. Still not finished after the twelve calls: one line that the studio has not finished yet, with the job id and that `/mos:image <job id>` fetches it later.

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
  "ideas": [
    { "angle": "proof", "headline": "Every completed job keeps its proof.", "basis": "Photos, timestamps and signatures stay connected to every work order", "scene": "a technician's hands holding a phone that shows the finished work order, beside the valve just replaced" },
    { "angle": "tension", "headline": "A status update is all the customer ever sees.", "basis": "a completed job needs more than a status update", "scene": "one line on a customer's screen at a reception desk, the plant room far behind it" },
    { "angle": "moment", "headline": "The signature is taken at the valve.", "basis": "signatures stay connected to every work order", "scene": "a hand signing on a tablet held against a pipe in the plant room" }
  ],
  "chosen": 0,
  "brief": {
    "request": "A post about work orders: a completed job needs more than a status update. Photos, timestamps and signatures stay connected to every work order.",
    "facts": ["a completed job needs more than a status update", "photos, timestamps and signatures stay connected to every work order"]
  },
  "scene": {
    "genre": "product_proof",
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
